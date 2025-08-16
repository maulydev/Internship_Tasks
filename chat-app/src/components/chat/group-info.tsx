import { ChatHeaderInfo } from "@/types";
import { useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { CgClose } from "react-icons/cg";

const ChatHeader = ({
  chatHeaderInfo,
}: {
  chatHeaderInfo?: ChatHeaderInfo;
}) => {
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

  const handleInfoModal = () => {
    setShowInfoModal((prev) => !prev);
  };

  return (
    <div>
      <button
        disabled={chatHeaderInfo?.isGroup === false}
        onClick={handleInfoModal}
        className={`bg-gray-700 p-2 rounded-full cursor-pointer ${chatHeaderInfo?.isGroup === false ? "opacity-0" : ""}`}
      >
        <BiInfoCircle className="text-2xl text-blue-100" />
      </button>

      <div
        className={`${
          showInfoModal ? "visible" : "invisible"
        } bg-black/50 fixed inset-0 text-gray-800 z-50`}
      >
        <div
          className={`${
            showInfoModal ? "translate-y-0" : "-translate-y-[110%]"
          } duration-700 bg-gray-700 shadow-xl p-6 container mx-auto my-4 grid grid-cols-1 gap-4 max-w-xl relative font-medium rounded-lg`}
        >
          <button
            onClick={handleInfoModal}
            type="button"
            className="absolute right-5 top-5 text-xl cursor-pointer text-white"
          >
            <CgClose />
          </button>

          <div>
            <h5 className="text-2xl text-gray-100 font-black">
              {chatHeaderInfo?.name}
            </h5>

            <span className="block text-gray-100 mt-6 font-black">
              Created by
            </span>
            <p className="text-gray-400 text-sm mt-1">
              {chatHeaderInfo?.owner?.name}
            </p>

            <span className="block text-gray-100 mt-6 font-black">
              Description
            </span>
            <p className="text-gray-400 text-sm mt-1">
              {chatHeaderInfo?.description || "No description"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
