import SignInForm from "@/components/signin-form";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;

  if (refreshToken) return redirect("/protected");

  return (
    <main className="bg-blue-500 min-h-svh flex flex-col justify-center items-center p-4">
      <SignInForm />
      <Link href="/" className="text-2xl font-bold text-white mt-8 underline">
        GO HOME
      </Link>
    </main>
  );
};

export default SignInPage;
