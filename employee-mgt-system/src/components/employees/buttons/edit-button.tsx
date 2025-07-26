"use client";

import React, { useState } from "react";
import EditEmployeeForm from "../edit-form";

const EditButton = ({ selectedEmpId }: { selectedEmpId: string }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleOpen = () => setShowModal(true);

  return (
    <>
      <button
        onClick={handleOpen}
        className="text-sm p-2 text-amber-500 font-medium px-4 cursor-pointer hover:underline"
      >
        Edit
      </button>

      <EditEmployeeForm
        showForm={showModal}
        handleClose={handleClose}
        selectedEmpId={selectedEmpId}
      />
    </>
  );
};

export default EditButton;
