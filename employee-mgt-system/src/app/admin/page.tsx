import EmployeeTable from "@/components/employees/employee-table";

const AdminDashboard = () => {
  return (
    <div className="bg-gray-100 relative">
      <header className="bg-blue-500 sticky top-0">
        <div className="container mx-auto p-8 flex items-center justify-between">
          <h1 className="text-2xl font-extrabold text-white text-center">
            Employee Management System
          </h1>

          <div className="text-white flex items-center gap-x-3">
            <div className="size-12 bg-black/50 rounded-full border-2" />
            <span>
              <p className="font-extrabold leading-3">Trapcy Beat</p>
              <small>Administrator</small>
            </span>
          </div>
        </div>
      </header>

      <main className="p-8">
        <EmployeeTable />
      </main>

      <footer className="text-center p-8 bg-white">
        <p>© {new Date().getFullYear()} Employee Management System</p>
      </footer>
    </div>
  );
};

export default AdminDashboard;
