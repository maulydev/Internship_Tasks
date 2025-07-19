import GetApi from "@/components/get-api";
import SignOut from "@/components/signout";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex justify-center items-center min-h-svh p-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-center">
          WELCOME TO FUTURE INTERN
        </h1>

        <nav className="text-center flex gap-x-8 mx-auto">
          <Link href="/signin" className="underline text-blue-500">
            Sign In
          </Link>
          <Link href="/signup" className="underline text-blue-500">
            Sign Up
          </Link>
        </nav>

        <div className="flex items-center justify-center mt-8">
          {/* <SignOut /> */}
          <GetApi />
        </div>
      </div>
    </main>
  );
}
