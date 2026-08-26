import { Link, useNavigate, useLocation } from "react-router";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/stores/auth.store";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema, type AuthFormValues } from "@/schemas/auth";
import PageBanner from "../components/Shop/PageBanner";
import { getErrorMessage } from "@/utils/error";

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const login = useAuthStore((state) => state.login);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const from = location.state?.from?.pathname || "/";

  const onSubmit = async ({ username, password }: AuthFormValues) => {
    try {
      const session = await authService.login(username, password);
      login(session);
      toast.success("Login successful!");
      navigate(from, { replace: true });
    } catch (error: unknown) {
      toast.error(getErrorMessage(error) || "Failed to login");
    }
  };

  return (
    <>
      <PageBanner
        breadcrumbCurrent="Login"
        breadcrumbHome="Home"
        title="Login"
      />
      <div className="flex items-center justify-center px-4 py-20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md rounded-md bg-white p-8 shadow-md"
        >
          <h2 className="mb-6 text-center text-2xl font-bold">Sign In</h2>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium">Username</label>
            <input
              type="text"
              className="w-full rounded-md border px-3 py-2 outline-none focus:border-[#B88E2F]"
              {...register("username")}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full rounded-md border px-3 py-2 outline-none focus:border-[#B88E2F]"
              {...register("password")}
            />
            {errors.password && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-[#B88E2F] py-2 text-white transition hover:bg-[#A07B28] disabled:opacity-50"
          >
            {isSubmitting ? "Loading..." : "Login"}
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#B88E2F] underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
