"use client";

import { useState } from "react";
import DeleteConfirmModal from "../delete-confirm";
import { Meta } from "@/types";

const DeleteButton = ({ selectedPosition }: { selectedPosition: Meta }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleOpen = () => setShowModal(true);

  return (
    <>
      <button
        onClick={handleOpen}
        className="text-sm p-2 text-red-600 font-medium px-4 cursor-pointer hover:underline"
      >
        Delete
      </button>

      <DeleteConfirmModal
        showModal={showModal}
        handleClose={handleClose}
        selectedPosition={selectedPosition}
      />
    </>
  );
};

export default DeleteButton;
