import Link from "next/link";
import React from "react";


const NotFound = () => {
  return (
    <div className="bg-blue-500 flex flex-col items-center justify-center min-h-svh">
      <h1 className="text-white text-9xl font-extrabold font-stretch-expanded">
        404
      </h1>
      <p className="text-white font-extrabold text-4xl">Resource Not Found!</p>
      <Link href="/" className="text-blue-500 text-xl mt-4 bg-white p-4">
        Go Back
      </Link>
    </div>
  );
};

export default NotFound;
