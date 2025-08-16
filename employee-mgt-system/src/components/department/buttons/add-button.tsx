"use client";

import React, { useState } from "react";
import { BiUserPlus } from "react-icons/bi";
import AddForm from "../add-form";

const AddButton = () => {
  const [showForm, setShowForm] = useState(false);

  const handleClose = () => setShowForm(false);
  const handleOpen = () => setShowForm(true);

  return (
    <>
      <button
        onClick={handleOpen}
        className="bg-blue-500 hover:bg-blue-400 flex items-center gap-x-2"
      >
        <BiUserPlus className="text-xl" />
        <span>Add</span>
      </button>

      <AddForm showForm={showForm} handleClose={handleClose} />
    </>
  );
};

export default AddButton;
