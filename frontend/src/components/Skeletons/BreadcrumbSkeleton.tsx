import clsx from "clsx";

type BreadcrumbSkeletonProps = {
  className?: string;
};

export const BreadcrumbSkeleton = ({ className }: BreadcrumbSkeletonProps) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={clsx(
        "flex h-25 w-full items-center px-4 font-poppins sm:px-8 lg:px-25",
        className,
      )}
    >
      <ol className="flex animate-pulse flex-wrap items-center gap-6">
        <li className="h-4 w-12 rounded bg-gray-300" />

        <li className="h-3 w-3 rounded bg-gray-300" />

        <li className="h-4 w-20 rounded bg-gray-300" />

        <li className="h-3 w-3 rounded bg-gray-300" />

        <li className="h-9.25 w-0.5 bg-primary-text-100/40" />

        <li className="h-4 w-32 rounded bg-gray-300" />
      </ol>
    </nav>
  );
};
