import React from "react";
import { BiSave } from "react-icons/bi";
import { CgClose } from "react-icons/cg";

type AddFormProps = {
  showForm: boolean;
  handleClose: () => void;
  handleSave: () => void;
};

const AddForm = ({ showForm, handleClose, handleSave }: AddFormProps) => {
  return (
    <div
      className={`${
        showForm ? "visible" : "invisible"
      } bg-black/50 fixed inset-0 text-gray-800`}
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        className={`${
          showForm ? "translate-y-0" : "-translate-y-[110%]"
        } duration-700 bg-white shadow-xl p-6 container mx-auto my-4 grid grid-cols-2 gap-4 max-w-4xl relative`}
      >
        <button
          onClick={handleClose}
          className="absolute right-5 top-5 text-xl cursor-pointer"
        >
          <CgClose />
        </button>
        <div className="col-span-full mb-4">
          <h1 className="text-xl">Add New Employee</h1>
          <p className="text-gray-500 font-normal">
            Provide the employee detail to add them to the company.
          </p>
        </div>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="py-4 outline-none min-w-xs bg-gray-100 px-4"
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="py-4 outline-none min-w-xs bg-gray-100 px-4"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="py-4 outline-none min-w-xs bg-gray-100 px-4"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className="py-4 outline-none min-w-xs bg-gray-100 px-4"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          className="py-4 outline-none min-w-xs bg-gray-100 px-4"
        />
        <input
          type="number"
          name="slary"
          placeholder="Salary"
          className="py-4 outline-none min-w-xs bg-gray-100 px-4"
        />
        <input
          type="date"
          name="dateJoined"
          className="py-4 outline-none min-w-xs bg-gray-100 px-4"
        />

        <select className="py-4 outline-none min-w-xs bg-gray-100 px-4">
          <option value="ACTIVE">Active</option>
          <option value="Inactive">Inactive</option>
        </select>

        <select className="py-4 outline-none min-w-xs bg-gray-100 px-4">
          <option value="">HR</option>
          <option value="">CTO</option>
          <option value="">CEO</option>
          <option value="">Lead IT Head</option>
          <option value="">Assitant IT Head</option>
        </select>

        <select className="py-4 outline-none min-w-xs bg-gray-100 px-4">
          <option value="">Human Resource</option>
          <option value="">Communication</option>
          <option value="">Marketing</option>
          <option value="">Finance</option>
        </select>

        <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-400 flex items-center justify-center text-white gap-x-2 col-span-full p-4 cursor-pointer"
        >
          <BiSave className="text-xl" />
          <span>Save</span>
        </button>
      </form>
    </div>
  );
};

export default AddForm;
