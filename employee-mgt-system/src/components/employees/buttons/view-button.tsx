"use client";

import React, { useState } from "react";
import EmployeeDetail from "../employee-detail";

const ViewButton = ({ selectedEmpId }: { selectedEmpId: string }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleOpen = () => setShowModal(true);

  return (
    <>
      <button
        onClick={handleOpen}
        className="text-sm p-2 text-blue-500 font-medium px-4 cursor-pointer hover:underline"
      >
        View
      </button>

      <EmployeeDetail showModal={showModal} handleClose={handleClose} selectedEmpId={selectedEmpId} />
    </>
  );
};

export default ViewButton;
