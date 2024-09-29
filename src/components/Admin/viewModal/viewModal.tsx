import { Box, Modal } from "@mui/material";
import React from "react";

type ViewModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  instructorData: any; 
};

const ViewModal: React.FC<ViewModalProps> = ({
  open,
  setOpen,
  instructorData,
}) => {
  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="border-0"
      disableAutoFocus
    >
      <Box className="absolute text-sm font-Poppins top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 bg-white text-black rounded-lg p-8 shadow-md">
        <h2 className="text-lg font-semibold mb-4">Instructor Details</h2>
        {instructorData ? (
          <div>
            <h3 className="text-md font-semibold mb-2">User Information</h3>
            <p><strong>Name:</strong> {instructorData.user?.name}</p>
            <p><strong>Email:</strong> {instructorData.user?.email}</p>
            <p><strong>Joined At:</strong> {new Date(instructorData.user?.createdAt).toLocaleDateString()}</p>

            <h3 className="text-md font-semibold mb-2 mt-4">Instructor Information</h3>
            <p><strong>Degree:</strong> {instructorData.instructorResponse.instructor?.degree}</p>
            <p><strong>Institution:</strong> {instructorData.instructorResponse.instructor?.institution}</p>
            <p><strong>Subject:</strong> {instructorData.instructorResponse?.instructor?.subject}</p>
            <p><strong>Certificate Date:</strong> {new Date(instructorData.instructorResponse?.instructor?.certificateDate).toLocaleDateString()}</p>
            <p><strong>Certificate Name:</strong> {instructorData.instructorResponse?.instructor?.certificateName}</p>
            <p><strong>Field Name:</strong> {instructorData.instructorResponse?.instructor?.fieldName}</p>
            <p><strong>Certificate URL:</strong> <a href={instructorData.instructorResponse?.instructor?.certificate} target="_blank" rel="noopener noreferrer">View Certificate</a></p>

          </div>
        ) : (
          <p>No data available</p>
        )}
        <div className="flex justify-end mt-4">
          <button
            className="px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300 transition duration-300 ease-in-out"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default ViewModal;
