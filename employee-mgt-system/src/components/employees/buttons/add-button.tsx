"use client";

import React, { useState } from "react";
import { BiUserPlus } from "react-icons/bi";
import AddForm from "../add-form";

const AddButton = ({ disabled }: { disabled: boolean }) => {
  const [showForm, setShowForm] = useState(false);

  const handleClose = () => setShowForm(false);
  const handleOpen = () => setShowForm(true);

  return (
    <>
      <button
        disabled={disabled}
        onClick={handleOpen}
        className="bg-blue-500 hover:bg-blue-400 flex items-center gap-x-2 disabled:cursor-not-allowed"
      >
        <BiUserPlus className="text-xl" />
        <span>Add</span>
      </button>

      <AddForm showForm={showForm} handleClose={handleClose} />
    </>
  );
};

export default AddButton;
