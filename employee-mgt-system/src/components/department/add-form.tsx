"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { BiSave } from "react-icons/bi";
import { CgClose, CgSpinner } from "react-icons/cg";
import { toast } from "react-toastify";
import z from "zod";
import { usePostDepartment } from "@/hooks/meta"; // assume this hook exists

type AddDepartmentFormProps = {
  showForm: boolean;
  handleClose: () => void;
};

const departmentFormSchema = z.object({
  name: z.string().min(1, "Department name is required"),
});

const AddDepartmentForm = ({ showForm, handleClose }: AddDepartmentFormProps) => {
  const [formData, setFormData] = useState({ name: "" });
  const { mutate: postDepartment, isPending: isSubmitting } = usePostDepartment();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ name: e.target.value });
  };

  const handleClearForm = () => setFormData({ name: "" });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsed = departmentFormSchema.safeParse(formData);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      if (errors.name?.[0]) toast.error(errors.name[0]);
      return;
    }

    postDepartment(formData, {
      onSuccess: () => {
        toast.success("Department added successfully");
        handleClearForm();
        handleClose();
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.error || "Failed to add department");
        console.error(err);
      },
    });
  };

  return (
    <div className={`${showForm ? "visible" : "invisible"} bg-black/50 fixed inset-0 text-gray-800`}>
      <form
        onSubmit={handleSubmit}
        className={`${
          showForm ? "translate-y-0" : "-translate-y-[110%]"
        } duration-700 bg-white shadow-xl p-6 container mx-auto my-4 grid grid-cols-1 gap-4 max-w-xl relative font-medium`}
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

        <div className="mb-4">
          <h1 className="text-xl font-bold">Add New Department</h1>
          <p className="text-gray-500 font-normal">Enter the department name to add it to the system.</p>
        </div>

        <div className="flex flex-col gap-y-2">
          <label htmlFor="name">Department Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Department Name"
            className="py-4 outline-none bg-gray-100 px-4"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>

        <button
          disabled={isSubmitting}
          className="bg-blue-500 hover:bg-blue-400 flex items-center justify-center text-white gap-x-2 p-4 cursor-pointer"
        >
          {isSubmitting ? (
            <CgSpinner className="animate-spin" />
          ) : (
            <>
              <BiSave className="text-xl" />
              <span>Save</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default AddDepartmentForm;
