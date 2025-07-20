import SignInForm from "@/components/signin-form";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (refreshToken) return redirect("/admin");

  return (
    <main className="bg-blue-500 min-h-svh flex flex-col justify-center items-center p-4">
      <SignInForm />
    </main>
  );
};

export default SignInPage;
