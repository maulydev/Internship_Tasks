"use client";

import { useState } from "react";
import RestoreConfirmModal from "../restore-confirm";

const RestoreButton = ({ selectedEmpId }: { selectedEmpId: string }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleOpen = () => setShowModal(true);

  return (
    <>
      <button
        onClick={handleOpen}
        className="text-sm p-2 text-green-600 font-medium px-4 cursor-pointer hover:underline"
      >
        Restore
      </button>

      <RestoreConfirmModal
        showModal={showModal}
        handleClose={handleClose}
        selectedEmpId={selectedEmpId}
      />
    </>
  );
};

export default RestoreButton;
