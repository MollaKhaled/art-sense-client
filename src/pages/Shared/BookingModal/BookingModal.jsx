import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward, IoMdClose } from "react-icons/io";

const BookingModal = ({ closeModal, isOpen, bookingInfo, refetch }) => {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    if (isOpen) {
      // If there are multiple photos to display
      fetch("http://localhost:3000/photo") // Update with your API URL
        .then((res) => res.json())
        .then((data) => {
          // Ensure bookingInfo is the starting photo
          const index = data.findIndex((photo) => photo._id === bookingInfo._id);
          const photosData = index > -1 ? data : [bookingInfo, ...data];
          setPhotos(photosData);
          setCurrentPage(index > -1 ? index : 0); // Set currentPage to match the clicked photo
        });
    }
  }, [isOpen, bookingInfo]);

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < photos.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const currentPhoto = photos[currentPage];

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-2 text-left align-middle shadow-xl transition-all relative">
                <button
                  className="absolute right-1 bg-white text-red-700 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                  onClick={() => {
                    closeModal();
                    refetch && refetch();
                  }}
                >
                  <IoMdClose size={16} />
                </button>

                {currentPhoto && (
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-2/3">
                      <img
                        src={currentPhoto.photoUrl}
                        alt={currentPhoto.title}
                        className="w-full h-auto rounded-md"
                      />
                    </div>

                    <div className="w-full md:w-1/4 flex items-end justify-end mb-6">
                      <div>
                        <p className="text-lg font-bold">{currentPhoto.artist}</p>
                        <p className="text-lg">{currentPhoto.title}</p>
                        <p className="text-lg">{currentPhoto.media}</p>
                        <p className="text-lg">{currentPhoto.size}</p>
                        <p className="text-lg">
                          {currentPhoto.year}{" "}
                          <span className="text-red-500 text-2xl">|</span>{" "}
                          {currentPhoto.stockCode}
                        </p>
                      </div>
                    </div>

                    <div className="items-end flex space-x-2 text-sm">
                      <button
                        className="flex items-center space-x-1 px-2 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition duration-150"
                        onClick={handlePrevPage}
                        disabled={currentPage === 0}
                      >
                        <IoIosArrowBack size={16} />
                        <span>Prev</span>
                      </button>
                      <span className="text-red-500 text-3xl">|</span>
                      <button
                        className="flex items-center space-x-1 px-2 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition duration-150"
                        onClick={handleNextPage}
                        disabled={currentPage === photos.length - 1}
                      >
                        <span>Next</span>
                        <IoIosArrowForward size={16} />
                      </button>
                    </div>
                  </div>
                )}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default BookingModal;
