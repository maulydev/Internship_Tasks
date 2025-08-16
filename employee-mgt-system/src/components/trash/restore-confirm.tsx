"use client";

import { useRestoreEmployee } from "@/hooks/trash";
import React from "react";
import { CgClose, CgSpinner } from "react-icons/cg";
import { MdRestore } from "react-icons/md";
import { toast } from "react-toastify";

type RestoreConfirmModalProps = {
  showModal: boolean;
  handleClose: () => void;
  selectedEmpId: string;
};

const RestoreConfirmModal = ({
  showModal,
  handleClose,
  selectedEmpId,
}: RestoreConfirmModalProps) => {
  const {
    mutate: restoreEmployee,
    isPending: isRestoring,
  } = useRestoreEmployee(selectedEmpId);

  const handleRestore = () => {
    restoreEmployee(undefined, {
      onSuccess: () => {
        toast.success("Employee restored successfully");
        handleClose();
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.error || "Restore failed");
        console.error(err);
      },
    });
  };

  return (
    <div
      className={`${
        showModal ? "visible" : "invisible"
      } bg-black/50 fixed inset-0 text-gray-800 z-50`}
    >
      <div
        className={`${
          showModal ? "translate-y-0" : "-translate-y-[110%]"
        } duration-700 bg-white shadow-xl p-6 container mx-auto my-4 grid grid-cols-1 gap-4 max-w-md relative font-medium`}
      >
        <button
          disabled={isRestoring}
          type="button"
          onClick={handleClose}
          className="absolute right-5 top-5 text-xl cursor-pointer"
          title={
            isRestoring ? "Cannot close while restoring" : "Close modal"
          }
        >
          <CgClose />
        </button>

        <div className="mb-4">
          <h1 className="text-xl font-bold text-green-600 flex items-center gap-2">
            <MdRestore className="text-2xl" />
            Confirm Restore
          </h1>
          <p className="text-gray-500 font-normal">
            Are you sure you want to restore this employee from trash?
          </p>
        </div>

        <div className="flex justify-end gap-4">
          <button
            disabled={isRestoring}
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 cursor-pointer"
          >
            Cancel
          </button>
          <button
            disabled={isRestoring}
            onClick={handleRestore}
            className="px-4 py-2 bg-green-600 text-white hover:bg-green-500 flex items-center gap-2 cursor-pointer"
          >
            {isRestoring ? (
              <CgSpinner className="animate-spin text-lg" />
            ) : (
              <>
                <MdRestore className="text-lg" />
                <span>Restore</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RestoreConfirmModal;
