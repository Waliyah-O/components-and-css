import React, { useState } from "react";

interface ImageObject {
  id: number;
  images: string[];
}

interface Props {
  data: ImageObject[];
}

const ImageGallery: React.FC<Props> = ({ data }) => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleImageClick = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          {expandedId === item.id ? (
            <div>
              {item.images.map((image, index) => (
                <img key={index} src={image} alt={` ${index + 1}`} />
              ))}
            </div>
          ) : (
            <img
              src={item.images[0]}
              alt="First"
              onClick={() => handleImageClick(item.id)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
