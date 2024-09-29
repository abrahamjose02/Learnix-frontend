import { Box, Modal } from "@mui/material";
import React from "react";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleFunction: any;
  text: string;
};

const CustomVerifyModal: React.FC<Props> = ({
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
            className="px-4 py-2 text-sm bg-green-500 text-white rounded-md hover:bg-green-700 focus:outline-none focus:bg-green-700 transition duration-300 ease-in-out"
            onClick={handleFunction}
          >
            Verify
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default CustomVerifyModal;