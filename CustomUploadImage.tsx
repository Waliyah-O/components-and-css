import React, { useState } from "react";
import { BiUpload } from "react-icons/bi";
import styled from "styled-components";
import PuggButtons from "./PuggButtons";

const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  justify-content: center;
  padding-bottom: 24px;
`;

const ImagePreviewContainer = styled.div`
  width: 362px;
  height: 237px;
  background: #f7f7f7;
  display: grid;
  /* grid-template-columns: auto auto; */
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  top: 190px;
  left: 199px;
  opacity: 0px;

  @media screen and (max-width: 500px) {
    width: 100%;
    height: 221px;
  }
  @media screen and (max-width: 368px) {
    grid-template-columns: auto;
  }
`;

const ImagePreview = styled.div`
  position: relative;
  width: 176px;
  height: 112px;
  display: flex;
  flex: 1;
  @media screen and (max-width: 500px) {
    width: 120px;
    height: 100px;
  }
  @media screen and (max-width: 368px) {
    width: 120px;
    height: 100px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;

    @media screen and (max-width: 500px) {
    }
  }

  button {
    position: absolute;
    top: 5px;
    right: 5px;
    background: rgba(0, 0, 0, 0.47);
    color: white;
    border: none;
    border-radius: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    opacity: 0px;
    padding: 4px;
  }
`;

const UploadBtnContainer = styled.div`
  width: 362px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  @media screen and (max-width: 458px) {
    flex-direction: column;
  }
`;

const UploadButton = styled.button<{ isDisabled: boolean }>`
  display: flex;
  background-color: #ffffff;
  color: #919191;
  border: 1px solid #e6e6e6;
  font-family: Geist;
  font-size: 13px;
  font-weight: 500;
  line-height: 16.12px;
  text-align: left;

  padding: 12px;
  gap: 12px;
  opacity: ${(props) => (props.isDisabled ? 0.5 : 1)};
  cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};

  @media screen and (max-width: 458px) {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 40px;
    margin-right: 40px;
  }

  span {
    width: 16px;
    height: 2px;
    top: 11px;
    left: 4px;
    gap: 0px;
    opacity: 0px;
    color: white;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

interface ImageUploadProps {
  onImagesChange: (images: File[]) => void;
  isOutfits?: boolean;
}

const PluggImageUpload: React.FC<ImageUploadProps> = ({
  onImagesChange,
  isOutfits,
}) => {
  const [images, setImages] = useState<File[]>([]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).slice(0, 4 - images.length);
      const updatedImages = [...images, ...newImages].slice(0, 4);
      setImages(updatedImages);
      onImagesChange(updatedImages);
    }
  };

  const handleRemoveImage = (index: number) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    onImagesChange(updatedImages);
  };

  return (
    <ImageUploadContainer>
      <input
        id="image-upload"
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
      <ImagePreviewContainer>
        {images ? (
          images.map((image, index) => (
            <ImagePreview key={index}>
              <img
                src={URL.createObjectURL(image)}
                alt={`preview ${index + 1}`}
              />
              <button onClick={() => handleRemoveImage(index)}>
                <span>-</span>
              </button>
            </ImagePreview>
          ))
        ) : (
          <>
            <p>upload images</p>
          </>
        )}
      </ImagePreviewContainer>
      {isOutfits ? (
        <UploadBtnContainer>
          <PuggButtons text="No, Skip" btnVariant="outline" />

          <PuggButtons text="Proceed" btnVariant="primary" />
        </UploadBtnContainer>
      ) : (
        <UploadBtnContainer>
          <UploadButton
            as="label"
            htmlFor="image-upload"
            isDisabled={images.length >= 4}
          >
            <BiUpload />{" "}
            {images.length >= 4 ? "Maximum 4 Images" : "Upload Images"}
          </UploadButton>
          <UploadButton
            as="label"
            htmlFor="image-upload"
            isDisabled={images.length >= 4}
          >
            <BiUpload />
            {images.length >= 4 ? "Maximum 4 Files" : "Upload Videos"}
          </UploadButton>
        </UploadBtnContainer>
      )}
    </ImageUploadContainer>
  );
};

export default PluggImageUpload;
