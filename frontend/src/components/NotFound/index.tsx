import { Link } from "react-router";

export function NotFound() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <h1 className="mb-4 text-4xl font-bold">404</h1>
      <p className="mb-6 text-lg">
        Ops! A página que você está procurando não existe.
      </p>

      <Link
        to="/"
        className="rounded-md border-2 border-[#B88E2F] bg-[#B88E2F] px-4 py-2 text-white transition hover:bg-white hover:text-[#B88E2F]"
      >
        Voltar para a Home
      </Link>
    </div>
  );
}
