import Views from "@/components/employees/views";
import SignOut from "@/components/signout";
import { getSession } from "@/utils/session";
import { BiUser } from "react-icons/bi";

const AdminDashboard = async () => {
  const session = await getSession();

  return (
    <div className="bg-gray-100 relative">
      <header className="bg-blue-500 sticky top-0">
        <div className="container mx-auto p-8 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-white text-center">
            Employee Management System
          </h1>

          <details className="relative">
            <summary className="text-white flex items-center gap-x-3 cursor-pointer">
              <div className="size-12 bg-black/50 rounded-full border-2 flex items-center justify-center text-2xl">
                <BiUser />
              </div>
              <span>
                <p className="font-extrabold leading-3">
                  {session?.session?.name}
                </p>
                <small>
                  {session?.session?.role === "ADMIN" ? "Administrator" : ""}
                </small>
              </span>
            </summary>
            <div className="bg-white p-4 absolute right-0 mt-5 shadow-xl">
              {/* <ul className="space-y-1 mb-2">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Profile
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Settings
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  Notifications
                </li>
              </ul> */}
              <SignOut />
            </div>
          </details>
        </div>
      </header>

      <main className="p-8">
        <Views />
      </main>

      <footer className="text-center p-8 bg-white">
        <p>© {new Date().getFullYear()} Employee Management System</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;
