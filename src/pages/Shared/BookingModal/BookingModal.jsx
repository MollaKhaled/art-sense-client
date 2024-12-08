import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { IoMdClose } from 'react-icons/io';

const BookingModal = ({ closeModal, isOpen, bookingInfo, refetch }) => {
  const { title, artist, size, stockCode, media, photoUrl, year } = bookingInfo || {};

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
              <DialogPanel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all relative">
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 bg-white text-red-700 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                  onClick={() => {
                    closeModal();
                    refetch && refetch();
                  }}
                >
                  <IoMdClose size={16} />
                </button>


                {/* Content */}
                <div className="mt-6 flex flex-col md:flex-row gap-6">
                  {/* Image */}
                  <div className="w-full md:w-2/3">
                    <img
                      src={photoUrl}
                      alt={title}
                      className="w-full h-auto rounded-md"
                    />
                  </div>

                  {/* Text Content */}
                  <div className="w-full md:w-1/3 flex items-end justify-end">
                    <div>
                      <p className="text-lg font-medium">{artist}</p>
                      <p className="text-lg">{title}</p>
                      <p className="text-lg">{media}</p>
                      <p className="text-lg">{size}</p>
                      <p className="text-lg">
                        {year} <span className="text-red-500">|</span> {stockCode}
                      </p>
                    </div>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

BookingModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  bookingInfo: PropTypes.shape({
    title: PropTypes.string,
    artist: PropTypes.string,
    size: PropTypes.string,
    stockCode: PropTypes.string,
    media: PropTypes.string,
    photoUrl: PropTypes.string,
  }),
  refetch: PropTypes.func,
};

export default BookingModal;
