import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Toaster } from "react-hot-toast";
import { MemoryRouter, Route, Routes } from "react-router";
import { beforeEach, beforeAll, describe, expect, it, vi } from "vitest";
import { useCartStore, type CartItem } from "@/stores/cart.store";
import { Cart } from "./Cart";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
});

const itemWithDiscount: CartItem = {
  id: "1",
  sku: "SKU-001",
  name: "Syltherine",
  price: 2500,
  discount: 30,
  image: "syltherine.png",
  quantity: 1,
};

const itemWithoutDiscount: CartItem = {
  id: "2",
  sku: "SKU-002",
  name: "Levantine Sofa",
  price: 2000,
  discount: 0,
  image: "levantine-sofa.png",
  quantity: 2,
};

function renderCart() {
  return render(
    <MemoryRouter initialEntries={["/cart"]}>
      <Routes>
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<div>checkout page</div>} />
      </Routes>
      <Toaster />
    </MemoryRouter>,
  );
}

describe("Cart", () => {
  beforeEach(() => {
    localStorage.clear();
    useCartStore.setState({ items: [] });
  });

  it("should show the empty cart with zeroed totals", () => {
    renderCart();

    expect(
      screen.getByRole("heading", { level: 1, name: "Cart" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByText("Product")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Quantity")).toBeInTheDocument();
    expect(screen.getByText("Subtotal")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "Card Totals" }),
    ).toBeInTheDocument();
    expect(screen.getAllByText("Rs. 0.00")).toHaveLength(2);
    expect(
      screen.getByRole("button", { name: "Checkout" }),
    ).toBeInTheDocument();
  });

  it("should list cart items with price, subtotal and totals", () => {
    useCartStore.setState({ items: [itemWithDiscount, itemWithoutDiscount] });
    renderCart();

    expect(screen.getByText("Syltherine")).toBeInTheDocument();
    expect(screen.getByText("Levantine Sofa")).toBeInTheDocument();
    expect(screen.getAllByRole("spinbutton")).toHaveLength(2);
    expect(screen.getAllByText("Rs. 2,500.00")).toHaveLength(2);
    expect(screen.getByText("Rs. 2,000.00")).toBeInTheDocument();
    expect(screen.getByText("Rs. 4,000.00")).toBeInTheDocument();
    expect(screen.getByText("Rs. 6,500.00")).toBeInTheDocument();
    expect(screen.getByText("Rs. 5,750.00")).toBeInTheDocument();
  });

  it("should increase an item quantity when clicking +", async () => {
    const user = userEvent.setup();
    useCartStore.setState({ items: [itemWithDiscount] });
    renderCart();

    expect(screen.getByRole("spinbutton")).toHaveValue(1);

    await user.click(screen.getByRole("button", { name: "+" }));

    expect(screen.getByRole("spinbutton")).toHaveValue(2);
    expect(screen.getAllByText("Rs. 5,000.00")).toHaveLength(2);
    expect(screen.getByText("Rs. 3,500.00")).toBeInTheDocument();
  });

  it("should decrease an item quantity when clicking -", async () => {
    const user = userEvent.setup();
    useCartStore.setState({ items: [{ ...itemWithDiscount, quantity: 2 }] });
    renderCart();

    expect(screen.getByRole("spinbutton")).toHaveValue(2);

    await user.click(screen.getByRole("button", { name: "-" }));

    expect(screen.getByRole("spinbutton")).toHaveValue(1);
    expect(screen.getByText("Rs. 1,750.00")).toBeInTheDocument();
  });

  it("should disable the minus button when the quantity reaches one", async () => {
    const user = userEvent.setup();
    useCartStore.setState({ items: [itemWithDiscount] });
    renderCart();

    const decreaseButton = screen.getByRole("button", { name: "-" });
    expect(decreaseButton).toBeDisabled();

    await user.click(decreaseButton);

    expect(screen.getByText("Syltherine")).toBeInTheDocument();
    expect(screen.getByRole("spinbutton")).toHaveValue(1);
  });

  it("should remove an item when clicking the trash icon", async () => {
    const user = userEvent.setup();
    useCartStore.setState({ items: [itemWithDiscount, itemWithoutDiscount] });
    renderCart();

    expect(screen.getByText("Syltherine")).toBeInTheDocument();
    expect(screen.getByText("Levantine Sofa")).toBeInTheDocument();

    await user.click(screen.getAllByRole("button", { name: "" })[0]);

    expect(screen.queryByText("Syltherine")).not.toBeInTheDocument();
    expect(screen.getByText("Levantine Sofa")).toBeInTheDocument();
    expect(screen.getAllByRole("spinbutton")).toHaveLength(1);
  });

  it("should calculate a discounted total lower than the subtotal", () => {
    useCartStore.setState({
      items: [itemWithDiscount, { ...itemWithoutDiscount, quantity: 1 }],
    });
    renderCart();

    expect(screen.getByText("Rs. 4,500.00")).toBeInTheDocument();
    expect(screen.getByText("Rs. 3,750.00")).toBeInTheDocument();
  });

  it("should block checkout with an error toast when the cart is empty", async () => {
    const user = userEvent.setup();
    renderCart();

    await user.click(screen.getByRole("button", { name: "Checkout" }));

    expect(screen.getByText("Your cart is empty!")).toBeInTheDocument();
    expect(screen.queryByText("checkout page")).not.toBeInTheDocument();
  });

  it("should navigate to checkout when the cart has items", async () => {
    const user = userEvent.setup();
    useCartStore.setState({ items: [itemWithDiscount] });
    renderCart();

    await user.click(screen.getByRole("button", { name: "Checkout" }));

    expect(screen.getByText("checkout page")).toBeInTheDocument();
  });
});
