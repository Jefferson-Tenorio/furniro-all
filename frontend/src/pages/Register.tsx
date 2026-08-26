import { Link, useNavigate } from "react-router";
import { authService } from "@/services/auth.service";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authSchema, type AuthFormValues } from "@/schemas/auth";
import PageBanner from "../components/Shop/PageBanner";
import { getErrorMessage } from "@/utils/error";

export function Register() {
  const navigate = useNavigate();
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

  const onSubmit = async ({ username, password }: AuthFormValues) => {
    try {
      await authService.register(username, password);
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (error: unknown) {
      toast.error(getErrorMessage(error) || "Failed to register");
    }
  };

  return (
    <>
      <PageBanner
        breadcrumbCurrent="Register"
        breadcrumbHome="Home"
        title="Register"
      />
      <div className="flex items-center justify-center px-4 py-20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md rounded-md bg-white p-8 shadow-md"
        >
          <h2 className="mb-6 text-center text-2xl font-bold">
            Create Account
          </h2>

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
            {isSubmitting ? "Loading..." : "Register"}
          </button>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-[#B88E2F] underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
}
