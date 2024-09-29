import { Box, Modal } from "@mui/material";
import React from "react";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleFunction: any;
  text: string;
};

const CustomDeleteModal: React.FC<Props> = ({
  open,
  setOpen,
  handleFunction,
  text,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(!open)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="border-0"
      disableAutoFocus
    >
      <Box className="absolute text-sm font-Poppins top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-8 shadow-md">
        <h1 className="text-md font-medium text-gray-800 mb-6 ">{text}</h1>
        <div className="flex justify-end">
          <button
            className="mr-4 px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300 transition duration-300 ease-in-out"
            onClick={() => setOpen(!open)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 text-sm bg-red-400 text-white rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600 transition duration-300 ease-in-out"
            onClick={handleFunction}
          >
            Delete
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default CustomDeleteModal;
