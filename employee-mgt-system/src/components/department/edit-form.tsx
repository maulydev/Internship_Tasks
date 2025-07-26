"use client";

import { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { BiSave } from "react-icons/bi";
import { CgClose, CgSpinner } from "react-icons/cg";
import { toast } from "react-toastify";
import z from "zod";
import { useEditDepartment } from "@/hooks/meta"; // assume this hook exists

type EditDepartmentFormProps = {
  selectedDept: { id: number; name: string };
  showForm: boolean;
  handleClose: () => void;
};

const departmentFormSchema = z.object({
  name: z.string().min(1, "Department name is required"),
});

const EditDepartmentForm = ({
  showForm,
  handleClose,
  selectedDept,
}: EditDepartmentFormProps) => {
  const [formData, setFormData] = useState({ name: "" });
  const { mutate: editDepartment, isPending: isSubmitting } = useEditDepartment(
    String(selectedDept.id)
  );

  useEffect(() => {
    if (selectedDept) {
      setFormData({ name: selectedDept.name });
    }
  }, [selectedDept]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ name: e.target.value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const parsed = departmentFormSchema.safeParse(formData);
    if (!parsed.success) {
      const errors = parsed.error.flatten().fieldErrors;
      if (errors.name?.[0]) toast.error(errors.name[0]);
      return;
    }

    editDepartment(
      { name: formData.name },
      {
        onSuccess: () => {
          toast.success("Department updated successfully");
          handleClose();
        },
        onError: (err: any) => {
          toast.error(
            err?.response?.data?.error || "Failed to update department"
          );
          console.error(err);
        },
      }
    );
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
          <h1 className="text-xl font-bold">Edit Department</h1>
          <p className="text-gray-500 font-normal">
            Update the department name below.
          </p>
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
          disabled={isSubmitting || formData.name === selectedDept.name}
          className="bg-blue-500 hover:bg-blue-400 flex items-center justify-center text-white gap-x-2 p-4 cursor-pointer disabled:cursor-not-allowed disabled:bg-blue-400"
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

export default EditDepartmentForm;
