import { ClipboardDocumentIcon } from '@heroicons/react/24/outline';
import { Modal } from '@mui/material';
import { toast } from 'sonner';




type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    videoUrl: string;
    subtitleUrl: string;
  };

const CopyModal:React.FC<Props> = ({ open, setOpen, subtitleUrl,videoUrl }) => {

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard", {
      position: "bottom-center"
    })
  };

  return (
    <Modal
      open={open}
      onClose={() => setOpen(!open)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="border-0"
      disableAutoFocus
    >
      <div className="absolute text-sm font-Poppins top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-8 shadow-md">
        <h1 className=" font-semibold text-gray-800 mb-6 ">
          Copy Video and Subtitle URLs
        </h1>
        <div className="mb-4">
          <input
            type="text"
            value={videoUrl}
            readOnly
            className="border border-gray-300 rounded-md p-2 w-full mb-2"
            placeholder="Video URL"
          />
          <button
            onClick={() => copyToClipboard(videoUrl)}
            className="bg-gray-200 text-gray-800 rounded-md px-2 py-1 !text-[0.8rem] hover:bg-gray-300 focus:outline-none focus:bg-gray-300 transition duration-300 ease-in-out"
          >
            <ClipboardDocumentIcon className="h-5 w-5 mr-1 inline" /> Copy Video URL
          </button>
        </div>
        <div>
          <input
            type="text"
            value={subtitleUrl}
            readOnly
            className="border border-gray-300 rounded-md p-2 w-full mb-2"
            placeholder="Subtitle URL"
          />
          <button
            onClick={() => copyToClipboard(subtitleUrl)}
            className="bg-gray-200 text-gray-800 rounded-md px-2 py-1 !text-[0.8rem] hover:bg-gray-300 focus:outline-none focus:bg-gray-300 transition duration-300 ease-in-out"
          >
            <ClipboardDocumentIcon className="h-5 w-5 mr-1 inline" /> Copy Subtitle URL
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CopyModal;