"use client";

import React, { useState } from "react";
import EditDepartmentForm from "../edit-form";

const EditDepartmentButton = ({ selectedDept }: { selectedDept: { id: number, name: string } }) => {
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

      <EditDepartmentForm
        showForm={showModal}
        handleClose={handleClose}
        selectedDept={selectedDept}
      />
    </>
  );
};

export default EditDepartmentButton;
