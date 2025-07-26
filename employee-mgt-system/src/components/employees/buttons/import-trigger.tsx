"use client";

import React, { useState } from "react";
import { BiCloudUpload, BiSave } from "react-icons/bi";
import { BsFiletypeXlsx } from "react-icons/bs";
import { CgClose } from "react-icons/cg";

const ImportTrigger = () => {
  const [showForm, setShowForm] = useState(false);

  const handleClose = () => setShowForm(false);
  const handleOpen = () => setShowForm(true);

  const handleSave = () => {};
  const handleFilePicker = () => {};

  return (
    <>
      <button
        onClick={handleOpen}
        className="bg-green-500 hover:bg-green-400 flex items-center gap-x-2"
      >
        <BsFiletypeXlsx className="text-xl" />
        <span>Import</span>
      </button>

      <div
        className={`${
          showForm ? "visible" : "invisible"
        } bg-black/50 fixed inset-0 text-gray-800`}
      >
        <form
          onSubmit={(e) => e.preventDefault()}
          className={`${
            showForm ? "translate-y-0" : "-translate-y-[110%]"
          } duration-700 bg-white shadow-xl p-6 container mx-auto my-4 gap-4 max-w-4xl relative`}
        >
          <button
            onClick={handleClose}
            className="absolute right-5 top-5 text-xl cursor-pointer"
          >
            <CgClose />
          </button>
          <div className="col-span-full mb-4">
            <h1 className="text-xl">Import Employees</h1>
            <p className="text-gray-500 font-normal">
              Select the employees data file to be upload.
            </p>
          </div>

          <label htmlFor="filePicker" className="cursor-pointer">
            <div
              onClick={handleFilePicker}
              className="w-full bg-gray-100 text-9xl py-28 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-200"
            >
              <BiCloudUpload />
              <p className="text-base">Tap to Upload an Excel or a CSV file</p>
            </div>
          </label>

          <input
            id="filePicker"
            hidden
            type="file"
            name="empData"
            className="py-4 outline-none w-full bg-gray-100 px-4 cursor-pointer"
          />

          <button
            disabled
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-400 flex items-center justify-center text-white gap-x-2 w-full p-4 cursor-pointer mt-4 disabled:bg-blue-300 disabled:cursor-not-allowed"
          >
            <BiSave className="text-xl" />
            <span>Upload</span>
          </button>
        </form>
      </div>
    </>
  );
};

export default ImportTrigger;
