import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { BiSave } from "react-icons/bi";
import { CgClose, CgSpinner } from "react-icons/cg";
import { toast } from "react-toastify";
import z from "zod";

import { useUpdateEmployee, useFetchEmployeeDetail } from "@/hooks/employees";
import { useFetchPositions, useFetchDepartments } from "@/hooks/meta";

type EditFormProps = {
  showForm: boolean;
  handleClose: () => void;
  selectedEmpId: string;
};

const employeeFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().min(1, "Phone is required"),
  email: z.string().email("Invalid email address"),
  salary: z.string().min(1, "Salary is required"),
  joinedDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  position: z.string().min(1, "Position is required"),
  department: z.string().optional(),
});

const formFields = [
  { label: "First Name", name: "firstName" },
  { label: "Last Name", name: "lastName" },
  { label: "Email", name: "email", type: "email" },
  { label: "Phone Number", name: "phone", type: "tel" },
  { label: "Salary", name: "salary", type: "number" },
  { label: "Date Joined", name: "joinedDate", type: "date" },
];

const EditEmployeeForm = ({
  showForm,
  handleClose,
  selectedEmpId,
}: EditFormProps) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    salary: "",
    status: "",
    joinedDate: "",
    position: "",
    department: "",
  });

  const { data: employeeDetail, isLoading: isLoadingDetail } = useFetchEmployeeDetail(selectedEmpId);
  const { data: positions = [], isLoading: loadingPositions } = useFetchPositions();
  const { data: departments = [], isLoading: loadingDepartments } = useFetchDepartments();
  const { mutate: updateEmployee, isPending: isSubmitting } = useUpdateEmployee(selectedEmpId);

  useEffect(() => {
    if (employeeDetail) {
      setFormData({
        firstName: employeeDetail.firstName || "",
        lastName: employeeDetail.lastName || "",
        phone: employeeDetail.phone || "",
        email: employeeDetail.email || "",
        salary: employeeDetail.salary || "",
        status: employeeDetail.status || "",
        joinedDate: employeeDetail.joinedDate?.split("T")[0] || "",
        position: employeeDetail.position?.id?.toString() || "",
        department: employeeDetail.department?.id?.toString() || "",
      });
    }
  }, [employeeDetail]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsed = employeeFormSchema.safeParse(formData);

    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      Object.entries(errors).forEach(([field, msgs]) => {
        if (msgs?.length) toast.error(`${field}: ${msgs[0]}`);
      });
      return;
    }

    updateEmployee(formData, {
      onSuccess: () => {
        toast.success("Employee updated successfully");
        handleClose();
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.error || "Update failed");
        console.error(err);
      },
    });
  };

  return (
    <div
      className={`${
        showForm ? "visible" : "invisible"
      } bg-black/50 fixed inset-0 text-gray-800`}
    >
      <form
        onSubmit={handleSubmit}
        className={`${
          showForm ? "translate-y-0" : "-translate-y-[110%]"
        } duration-700 bg-white shadow-xl p-6 container mx-auto my-4 grid grid-cols-2 gap-4 max-w-4xl relative font-medium`}
      >
        <button
          disabled={isSubmitting}
          type="button"
          onClick={handleClose}
          className="absolute right-5 top-5 text-xl cursor-pointer"
          title={isSubmitting ? "Cannot close while submitting" : "Close form"}
        >
          <CgClose />
        </button>

        <div className="col-span-full mb-4">
          <h1 className="text-xl font-bold">Edit Employee</h1>
          <p className="text-gray-500 font-normal">
            Update the employee's details and click save.
          </p>
        </div>

        {formFields.map(({ label, name, type = "text" }) => (
          <div className="flex flex-col gap-y-2" key={name}>
            <label htmlFor={name}>{label}</label>
            <input
              id={name}
              name={name}
              type={type}
              placeholder={label}
              className="py-4 outline-none min-w-xs bg-gray-100 px-4"
              value={(formData as any)[name]}
              onChange={handleInputChange}
            />
          </div>
        ))}

        <div className="flex flex-col gap-y-2">
          <label htmlFor="position">Position</label>
          <select
            id="position"
            name="position"
            className="py-4 outline-none min-w-xs bg-gray-100 px-4"
            onChange={handleInputChange}
            value={formData.position}
            disabled={loadingPositions}
          >
            <option value="">-- Select Position --</option>
            {positions.map(({ id, name }: { id: string; name: string }) => (
              <option key={`pos-${id}`} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="department">Department</label>
          <select
            id="department"
            name="department"
            className="py-4 outline-none min-w-xs bg-gray-100 px-4"
            onChange={handleInputChange}
            value={formData.department}
            disabled={loadingDepartments}
          >
            <option value="">-- Select Department --</option>
            {departments.map(({ id, name }: { id: string; name: string }) => (
              <option key={`dep-${id}`} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex flex-col gap-y-2">
          <label htmlFor="department">Status</label>
          <select
            id="status"
            name="status"
            className="py-4 outline-none min-w-xs bg-gray-100 px-4"
            onChange={handleInputChange}
            value={formData.status}
            disabled={loadingDepartments}
          >
            <option value="">-- Select Status --</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>

        <button
          disabled={isSubmitting}
          className="bg-blue-600 hover:bg-blue-500 flex items-center justify-center text-white gap-x-2 col-span-full p-4 cursor-pointer"
        >
          {isSubmitting ? (
            <CgSpinner className="animate-spin" />
          ) : (
            <>
              <BiSave className="text-xl" />
              <span>Update</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default EditEmployeeForm;
