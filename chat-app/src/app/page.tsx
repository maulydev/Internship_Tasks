import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-2xl mx-auto flex flex-col justify-between bg-gray-900">

        {/* Hero Text */}
        <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-500 mb-6">
            Welcome to Chat Buddy
          </h1>
          <p className="text-lg md:text-xl max-w-lg text-gray-300">
            Connect, chat, and share with friends in real time. Experience seamless messaging like never before.
          </p>
        </div>

        {/* CTA Button */}
        <div className="px-6 md:px-0 pb-12">
          <Link href="/signin">
            <div className="w-full max-w-sm mx-auto bg-blue-500 text-white font-semibold text-center py-4 rounded shadow hover:bg-blue-600 transition cursor-pointer">
              Get Started
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
