"use client";

import React, { ChangeEvent, useState } from "react";
import { BiCloudUpload, BiSave } from "react-icons/bi";
import { BsFiletypeXlsx } from "react-icons/bs";
import { CgClose } from "react-icons/cg";
import CSVPreview from "../csv-preview";
import Papa from "papaparse";
import { FormData as FormDataType } from "@/types";
import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

const ImportTrigger = ({ disabled }: { disabled: boolean }) => {
  const [showForm, setShowForm] = useState(false);

  const queryClient = useQueryClient();

  const [file, setFile] = useState<File | null>(null);
  const [previewData, setPreviewData] = useState<FormDataType[]>([]);

  const handleClose = () => setShowForm(false);
  const handleOpen = () => setShowForm(true);

  const handleSave = async () => {
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axiosInstance.post(
        "/api/employees/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        toast.success(response?.data.message);

        queryClient.invalidateQueries({ queryKey: ["employees"] });
      } else {
        toast.error("Something went wrong while uploading.");
      }
    } catch (error: any) {
      console.error("Upload failed:", error);
      if (error.response?.status === 422) {
        toast.warn(error.response?.data.message);
      }
      toast.error("Upload failed. Please try again.");
    } finally {
      setFile(null);
      setPreviewData([]);
      setShowForm(false);
    }
  };

  const handleFilePicker = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] ?? null;
    setFile(selectedFile);

    if (!selectedFile) return;

    Papa.parse(selectedFile, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const parsedData = results.data as FormDataType[];
        setPreviewData(parsedData);
      },
    });
  };

  return (
    <>
      <button
        disabled={disabled}
        onClick={handleOpen}
        className="bg-green-500 hover:bg-green-400 flex items-center gap-x-2 disabled:cursor-not-allowed"
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

          {file ? (
            <CSVPreview previewData={previewData} />
          ) : (
            <label htmlFor="filePicker" className="cursor-pointer">
              <div className="w-full bg-gray-100 text-9xl py-28 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-200">
                <BiCloudUpload />
                <p className="text-base">
                  Tap to Upload an Excel or a CSV file
                </p>
              </div>
            </label>
          )}

          <input
            accept=".csv"
            id="filePicker"
            type="file"
            name="empCSV"
            className="py-4 outline-none w-full bg-gray-100 px-4 cursor-pointer file:hidden"
            onChange={handleFilePicker}
          />

          <button
            disabled={!file}
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
