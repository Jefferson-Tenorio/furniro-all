export const ProductGridCardSkeleton = () => {
  return (
    <article className="relative min-w-71.25 animate-pulse overflow-hidden bg-card-product">
      <div className="h-75.25 w-full bg-gray-300" />

      <div className="h-36.25 px-4 pt-4">
        <div className="h-6 w-3/4 rounded bg-gray-300" />

        <div className="mt-2 h-4 w-full rounded bg-gray-200" />
        <div className="mt-1 h-4 w-2/3 rounded bg-gray-200" />

        <div className="mt-3 flex items-center gap-4">
          <div className="h-5 w-16 rounded bg-gray-300" />
          <div className="h-4 w-12 rounded bg-gray-200" />
        </div>
      </div>
    </article>
  );
};
