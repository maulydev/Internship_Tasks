import { useCreateGroup } from "@/hooks/groups";
import { AxiosError } from "axios";
import React, { ChangeEvent, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { VscLoading } from "react-icons/vsc";
import { toast } from "react-toastify";

const CreateGroup = () => {
  const [showForm, setShowForm] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ name: string; desc: string }>({
    name: "",
    desc: "",
  });

  const { mutate: createGroup, isPending } = useCreateGroup();

  const handleShowForm = () => {
    setShowForm((prev) => !prev);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const submitGroup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.name.trim().length === 0 || formData.desc.trim().length === 0)
      return;

    createGroup(formData, {
      onSuccess: () => {
        toast.success("Group created");
        setShowForm(false);
      },

      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error.response?.data?.error || "Failed to create group");
        } else {
          toast.error(error.message || "Failed to create group");
        }
      },
    });
  };

  return (
    <>
      <button
        onClick={handleShowForm}
        className="text-lg bg-blue-500 px-4 py-2 cursor-pointer text-white rounded-lg"
      >
        <BiPlus />
      </button>

      <div
        className={`${
          showForm ? "visible" : "invisible"
        } bg-black/50 fixed inset-0 text-gray-800 z-50`}
      >
        <form
          onSubmit={submitGroup}
          className={`${
            showForm ? "translate-y-0" : "-translate-y-[110%]"
          } duration-700 bg-gray-700 shadow-xl p-6 container mx-auto my-4 grid grid-cols-1 gap-4 max-w-xl relative font-medium rounded-lg`}
        >
          <button
            disabled={isPending}
            onClick={handleShowForm}
            type="button"
            className="absolute right-5 top-5 text-xl cursor-pointer text-white disabled:cursor-not-allowed"
          >
            <CgClose />
          </button>

          <div className="mb-4">
            <h1 className="text-xl font-bold text-gray-100">
              Create New Group
            </h1>
            <p className="text-gray-300 font-normal ">
              Enter the group name to add create a new group.
            </p>
          </div>

          <div className="flex flex-col gap-y-2">
            <label htmlFor="name" className="text-gray-200">
              Group Name
            </label>
            <input
              required
              autoComplete="off"
              onChange={handleInputChange}
              value={formData.name}
              id="name"
              name="name"
              type="text"
              placeholder="Group Name"
              className="py-4 outline-none bg-gray-800 px-4 text-gray-100 rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-y-2">
            <label htmlFor="desc" className="text-gray-200">
              Group Description
            </label>
            <input
              required
              autoComplete="off"
              onChange={handleInputChange}
              value={formData.desc}
              id="desc"
              name="desc"
              type="text"
              placeholder="Group Description"
              className="py-4 outline-none bg-gray-800 px-4 text-gray-100 rounded-lg"
            />
          </div>

          <button
            disabled={isPending}
            className="bg-blue-500 hover:bg-blue-400 flex items-center justify-center text-white gap-x-4 p-4 cursor-pointer rounded-lg disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending && <VscLoading className="animate-spin text-lg" />}
            <span>Create New Group</span>
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateGroup;
