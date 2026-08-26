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
      <div className="flex justify-center items-center py-20 px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md bg-white p-8 shadow-md rounded-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 outline-none focus:border-[#B88E2F]"
              {...register("username")}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full border rounded-md px-3 py-2 outline-none focus:border-[#B88E2F]"
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
            className="w-full bg-[#B88E2F] text-white py-2 rounded-md hover:bg-[#A07B28] transition disabled:opacity-50"
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
