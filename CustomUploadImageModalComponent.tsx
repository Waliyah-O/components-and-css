import React, { useState } from "react";
import styled from "styled-components";
import PuggButtons from "../../Components/PuggButtons";
import { UploadIcon } from "../../assets/Icons/UploadIcon";
import { useNavigate } from "react-router-dom";
import { Box } from "@chakra-ui/react";

const ImageUploadContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: center;
  justify-content: center;
  padding-bottom: 24px;
`;

const ImagePreviewContainer = styled(Box)`
  width: 100%;
  height: 100%;
  background: #f7f7f7;
  display: flex;
  overflow: hidden;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;

  @media screen and (min-width: 768px) {
    width: 390px;
    height: 321px;
  }

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
  width: 100%;
  height: 100%;
  display: flex;

  img {
    width: 100%;
    height: 100%;
    object-position: top;
    object-fit: cover;
  }

  button {
    position: absolute;
    top: 5px;
    right: 5px;
    background: rgba(0, 0, 0, 0.47);
    color: white;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    padding: 4px;
    cursor: pointer;
  }
`;

const UploadButton = styled.label<{ isDisabled: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #919191;
  font-family: Geist, sans-serif;
  font-size: 13px;
  font-weight: 500;
  line-height: 16.12px;
  text-align: center;
  padding: 12px;
  gap: 12px;
  opacity: ${(props) => (props.isDisabled ? 0.5 : 1)};
  cursor: ${(props) => (props.isDisabled ? "not-allowed" : "pointer")};
  /* grid-column: span 2; */
  /* grid-column: 1 / -1; */
  width: 100%;
  height: 100%;
`;

const ButtonContainer = styled.div`
  width: 362px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;

  @media screen and (max-width: 368px) {
    flex-direction: column;
  }
`;

// const Button = styled.button<{ variant: "outline" | "primary" }>`
//   padding: 12px 24px;
//   font-family: Geist, sans-serif;
//   font-size: 13px;
//   font-weight: 500;
//   border-radius: 4px;
//   cursor: pointer;

//   ${(props) =>
//     props.variant === "outline" &&
//     `
//     border: 1px solid #e6e6e6;
//     background: transparent;
//     color: #333;
//   `}

//   ${(props) =>
//     props.variant === "primary" &&
//     `
//     background: #0066FF;
//     color: white;
//     border: none;
//   `}
// `;

interface ImageUploadProps {
  onImagesChange: (images: File[]) => void;
  maxImages?: number;
  noBtns?: boolean;
  style?: Object;
  uploadText?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImagesChange,
  maxImages = 1,
  noBtns,
  style,
  uploadText,
}) => {
  const [images, setImages] = useState<File[]>([]);
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      const updatedImages = [...images, ...newImages].slice(0, maxImages);
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
      <ImagePreviewContainer style={style}>
        {images.length > 0 ? (
          images.map((image, index) => (
            <ImagePreview key={index}>
              <img
                src={URL.createObjectURL(image)}
                alt={`preview ${index + 1}`}
              />
              <button onClick={() => handleRemoveImage(index)}>-</button>
            </ImagePreview>
          ))
        ) : (
          <UploadButton
            htmlFor="image-upload"
            isDisabled={images.length >= maxImages}
          >
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              style={{ display: "none" }}
              disabled={images.length >= maxImages}
            />
            <UploadIcon />
            {images.length >= maxImages
              ? `Maximum ${maxImages} Image${maxImages > 1 ? "s" : ""}`
              : uploadText || "Upload Image"}
          </UploadButton>
        )}
      </ImagePreviewContainer>
      {!noBtns && (
        <ButtonContainer>
          <PuggButtons
            btnVariant="outline"
            text="No, Skip"
            action={() => navigate("/app/outfits/new-post")}
          />
          <PuggButtons btnVariant="primary" text="Proceed" />
        </ButtonContainer>
      )}
    </ImageUploadContainer>
  );
};

export default ImageUpload;
