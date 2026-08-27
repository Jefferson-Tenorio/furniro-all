import { Link } from "react-router";

type CategoryCardProps = {
  image: string;
  alt: string;
  title: string;
  to: string;
};

export default function CategoryCard({
  image,
  alt,
  title,
  to,
}: CategoryCardProps) {
  return (
    <Link to={to}>
      <div className="max-w-95.25 text-center transition hover:-translate-y-3">
        <img
          className="h-100 rounded-lg object-cover sm:h-120"
          src={image}
          alt={alt}
        />
        <h2 className="mt-7.5 text-xl font-semibold text-primary-text sm:text-2xl">
          {title}
        </h2>
      </div>
    </Link>
  );
}
