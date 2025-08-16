"use client";

import { useState } from "react";
import RestoreAllConfirmModal from "../restore-all-confirm";

const EmptyTrashButton = ({ disabled }: { disabled: boolean }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleOpen = () => setShowModal(true);

  return (
    <>
      <button disabled={disabled} onClick={handleOpen} className="bg-green-500 disabled:bg-green-400 disabled:cursor-not-allowed">
        Restore All
      </button>

      <RestoreAllConfirmModal showModal={showModal} handleClose={handleClose} />
    </>
  );
};

export default EmptyTrashButton;
