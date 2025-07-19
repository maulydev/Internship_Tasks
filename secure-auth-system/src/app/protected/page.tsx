

import GetApi from "@/components/get-api";
import SignOut from "@/components/signout";
import React from "react";

const ProtectedPage = () => {
  return (
    <main className="min-h-svh flex flex-col justify-center items-center">
      <div className="text-5xl text-center font-extrabold max-w-sm text-blue-500 mb-8">
        <span className="text-9xl">🎉</span>
        <br />
        <h1 className="mt-8">Welcome to the Protected Page</h1>
      </div>
      <div className="flex items-center">
        <SignOut />
        <GetApi />
      </div>
    </main>
  );
};

export default ProtectedPage;
