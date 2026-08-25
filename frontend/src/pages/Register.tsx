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
      <PageBanner breadcrumbCurrent="Register" breadcrumbHome="Home" title="Register" />
      <div className="flex justify-center items-center py-20 px-4">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-8 shadow-md rounded-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Username</label>
            <input 
              type="text" 
              className="w-full border rounded-md px-3 py-2 outline-none focus:border-[#B88E2F]"
              {...register("username")}
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-600">{errors.username.message}</p>
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
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full bg-[#B88E2F] text-white py-2 rounded-md hover:bg-[#A07B28] transition disabled:opacity-50"
          >
            {isSubmitting ? "Loading..." : "Register"}
          </button>
          
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account? <Link to="/login" className="text-[#B88E2F] underline">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
}