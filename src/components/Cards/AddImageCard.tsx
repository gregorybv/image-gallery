import { twMerge } from "tailwind-merge";
import ImageIcon from "../Icons/ImageIcon";
import Modal from "../Modal/Modal";
import { useState } from "react";
import CloseIcon from "../Icons/CloseIcon";
import { IImageGallery } from "../../types/global.types";
import { nanoid } from "nanoid";

interface IAddImageCard {
  setGalleryData: React.Dispatch<React.SetStateAction<IImageGallery[]>>;
}

const AddImageCard = ({ setGalleryData }: IAddImageCard) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const imageUrl = event.currentTarget["image-url"].value;

    if (!imageUrl) return;

    setGalleryData((prev) => [
      ...prev,
      {
        id: nanoid(),
        slug: imageUrl,
        isSelected: false,
      },
    ]);

    setIsModalOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className={twMerge(
          "rounded-lg border border-dashed border-gray-300 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition-colors duration-500 aspect-square p-8"
        )}
      >
        <ImageIcon />
        <p className="font-semibold text-xs md:text-base whitespace-nowrap">
          Add Images
        </p>
      </button>
      <Modal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        modalId="addImageModal"
      >
        <form
          className="relative py-12 px-6 bg-neutral-50 rounded w-[680px] max-w-[95vw] max-h-[95vh]"
          onSubmit={handleImageSubmit}
        >
          <CloseIcon
            onClick={() => setIsModalOpen(false)}
            width={31}
            className="absolute top-4 right-4 cursor-pointer text-red-600 hover:text-red-700 transition-all"
          />
          <h2 className="text-2xl font-semibold text-center mb-8">
            Add New Image URL
          </h2>
          <input
            type="url"
            name="image-url"
            className="w-full border border-gray-300 rounded p-4 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent "
            placeholder="https://example.com/image.png"
          />
          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="px-8 py-2.5 bg-emerald-600 text-white rounded hover:bg-emerald-700 transition-colors duration-500"
            >
              Add Image
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddImageCard;
