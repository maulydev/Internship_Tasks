"use client";

import { useState } from "react";
import EmptyTrashConfirmModal from "../empty-trash-confirm";

const EmptyTrashButton = ({ disabled }: { disabled: boolean }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleOpen = () => setShowModal(true);

  return (
    <>
      <button
        disabled={disabled}
        onClick={handleOpen}
        className="bg-red-500 disabled:bg-red-400 disabled:cursor-not-allowed"
      >
        Empty Trash
      </button>

      <EmptyTrashConfirmModal showModal={showModal} handleClose={handleClose} />
    </>
  );
};

export default EmptyTrashButton;
