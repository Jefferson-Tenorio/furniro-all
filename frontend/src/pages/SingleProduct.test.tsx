import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { MemoryRouter, Route, Routes } from "react-router";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Product } from "@/types/product";
import { useCartStore } from "@/stores/cart.store";
import { SingleProduct } from "./SingleProduct";

const { useProductMock, useProductsMock } = vi.hoisted(() => ({
  useProductMock: vi.fn(),
  useProductsMock: vi.fn(),
}));

vi.mock("../hooks/useProduct", () => ({
  useProduct: useProductMock,
}));

vi.mock("../hooks/useProducts", () => ({
  useProducts: useProductsMock,
}));

const productFixture: Product = {
  id: "1",
  sku: "SKU-001",
  name: "Syltherine",
  category: "Sofa",
  price: 2500,
  discount: 30,
  description: "A stylish sofa for your living room.",
  fullDescription: "Full description of the product.",
  additionalInfo: "Made with premium fabric and available in multiple colors.",
  image: "syltherine.png",
  additionalImages: ["syltherine-2.png", "syltherine-3.png"],
  colors: ["#000000", "#ffffff"],
  sizes: ["L", "XL"],
  isNew: true,
};

const relatedProductFixture: Product = {
  ...productFixture,
  id: "2",
  sku: "SKU-002",
  name: "Levantine Sofa",
  description: "A cozy sofa for relaxing evenings.",
  price: 2000,
  discount: 0,
};

type ProductStatus = "loading" | "success" | "notfound" | "error";

function renderAt(path: string) {
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/product/slug/:slug" element={<SingleProduct />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("SingleProduct", () => {
  beforeEach(() => {
    localStorage.clear();
    useCartStore.setState({ items: [] });
    useProductMock.mockReset();
    useProductMock.mockReturnValue({
      product: null,
      status: "loading",
      retry: vi.fn(),
    });
    useProductsMock.mockReset();
    useProductsMock.mockReturnValue({ products: [], total: 0, loading: false });
  });

  it("should show the loading state while the product is fetched", () => {
    renderAt("/product/1");

    expect(
      screen.getByRole("main").querySelector(".animate-pulse"),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("heading", { level: 1, name: "Syltherine" }),
    ).not.toBeInTheDocument();
  });

  it("should show the not found message when the product does not exist", () => {
    useProductMock.mockReturnValue({
      product: null,
      status: "notfound",
      retry: vi.fn(),
    });

    renderAt("/product/999");

    expect(screen.getByText("Product not found.")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 1 })).not.toBeInTheDocument();
  });

  it("should show the error state with a retry option", () => {
    useProductMock.mockReturnValue({
      product: null,
      status: "error",
      retry: vi.fn(),
    });

    renderAt("/product/1");

    expect(
      screen.getByText("Something went wrong while loading this product."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Try again" }),
    ).toBeInTheDocument();
  });

  it("should reload the product when clicking Try again", async () => {
    const user = userEvent.setup();
    useProductMock.mockImplementation(function useProductMockImpl() {
      const [status, setStatus] = useState<ProductStatus>("error");
      return {
        product: status === "success" ? productFixture : null,
        status,
        retry: () => setStatus("success"),
      };
    });

    renderAt("/product/1");
    expect(
      screen.getByText("Something went wrong while loading this product."),
    ).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Try again" }));

    expect(
      screen.getByRole("heading", { level: 1, name: "Syltherine" }),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Something went wrong while loading this product."),
    ).not.toBeInTheDocument();
  });

  it("should render the full product details when loaded successfully", () => {
    useProductMock.mockReturnValue({
      product: productFixture,
      status: "success",
      retry: vi.fn(),
    });
    useProductsMock.mockReturnValue({
      products: [relatedProductFixture],
      total: 1,
      loading: false,
    });

    renderAt("/product/1");

    expect(
      screen.getByRole("navigation", { name: "Breadcrumb" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Sofa" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "Syltherine" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A stylish sofa for your living room."),
    ).toBeInTheDocument();
    expect(screen.getByText("Rs. 1,750.00")).toBeInTheDocument();
    expect(screen.getByText("Rs. 2,500.00")).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: "Description" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: "Additional Information" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Full description of the product."),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "L" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "XL" })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add To Cart" }),
    ).toBeInTheDocument();
    expect(screen.getByText("SKU-001")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Related Products" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Levantine Sofa" }),
    ).toBeInTheDocument();
  });

  it("should switch between the description and additional information tabs", async () => {
    const user = userEvent.setup();
    useProductMock.mockReturnValue({
      product: productFixture,
      status: "success",
      retry: vi.fn(),
    });

    renderAt("/product/1");
    expect(
      screen.getByText("Full description of the product."),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("tab", { name: "Additional Information" }),
    );

    expect(
      screen.getByText(
        "Made with premium fabric and available in multiple colors.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Full description of the product."),
    ).not.toBeInTheDocument();
  });

  it("should change the main image when selecting a thumbnail in the gallery", async () => {
    const user = userEvent.setup();
    useProductMock.mockReturnValue({
      product: productFixture,
      status: "success",
      retry: vi.fn(),
    });

    renderAt("/product/1");
    expect(screen.getByAltText("Product")).toHaveAttribute(
      "src",
      expect.stringContaining("syltherine.png"),
    );

    await user.click(screen.getByRole("button", { name: "Product 2" }));

    expect(screen.getByAltText("Product")).toHaveAttribute(
      "src",
      expect.stringContaining("syltherine-2.png"),
    );
  });

  it("should fetch the product by the id from the URL", () => {
    renderAt("/product/42");

    expect(useProductMock).toHaveBeenCalledWith("42", "id");
  });

  it("should fetch the product by the slug from the URL", () => {
    renderAt("/product/slug/chair-1");

    expect(useProductMock).toHaveBeenCalledWith("chair-1", "slug");
  });
});
