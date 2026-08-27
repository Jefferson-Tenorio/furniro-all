import { ProductGridCardSkeleton } from "./ProductGridCardSkeleton";

type ProductGridSkeletonProps = {
  count?: number;
  title?: string;
};

export const ProductGridSkeleton = ({
  count = 8,
  title,
}: ProductGridSkeletonProps) => {
  return (
    <section className="flex w-full flex-col items-center px-4 pb-17.25">
      {title && (
        <h2 className="mb-8 font-poppins text-[40px] leading-12 font-bold text-primary-text-200">
          {title}
        </h2>
      )}

      <div className="mb-8 grid w-full max-w-309 grid-cols-1 justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: count }).map((_, index) => (
          <ProductGridCardSkeleton key={index} />
        ))}
      </div>

      {title && (
        <div className="h-12 w-51.75 animate-pulse border border-gray-300" />
      )}
    </section>
  );
};
