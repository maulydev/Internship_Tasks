"use client";

import { useDeletePosition } from "@/hooks/meta";
import { Meta } from "@/types";
import React from "react";
import { CgClose, CgSpinner } from "react-icons/cg";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

type DeleteConfirmModalProps = {
  showModal: boolean;
  handleClose: () => void;
  selectedPosition: Meta;
};

const DeleteConfirmModal = ({
  showModal,
  handleClose,
  selectedPosition,
}: DeleteConfirmModalProps) => {
  const { mutate: deletePosition, isPending: isDeleting } = useDeletePosition(selectedPosition);

  const handleDelete = () => {
    deletePosition(undefined, {
      onSuccess: () => {
        toast.success(`"${selectedPosition.name}" position permanently deleted`);
        handleClose();
      },
      onError: (err: any) => {
        toast.error(err?.response?.data?.error || "Action failed");
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
          disabled={isDeleting}
          type="button"
          onClick={handleClose}
          className="absolute right-5 top-5 text-xl cursor-pointer"
          title={isDeleting ? "Cannot close while deleting" : "Close modal"}
        >
          <CgClose />
        </button>

        <div className="mb-4">
          <h1 className="text-xl font-bold text-red-600 flex items-center gap-2">
            <MdDelete className="text-2xl" />
            Confirm Deletion
          </h1>
          <p className="text-gray-500 font-normal">
            Are you sure you want to permanently delete{" "}
            <span className="font-semibold text-red-500">{selectedPosition.name}</span> position? This action cannot be undone.
          </p>
        </div>

        <div className="flex justify-end gap-4">
          <button
            disabled={isDeleting}
            onClick={handleClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 cursor-pointer"
          >
            Cancel
          </button>
          <button
            disabled={isDeleting}
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white hover:bg-red-500 flex items-center gap-2 cursor-pointer"
          >
            {isDeleting ? (
              <CgSpinner className="animate-spin text-lg" />
            ) : (
              <>
                <MdDelete className="text-lg" />
                <span className="line-clamp-1">Yes, Delete {selectedPosition.name}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
