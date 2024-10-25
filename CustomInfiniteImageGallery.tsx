import React, { useState, useRef, useEffect } from "react";
import { Box, Flex, Image, IconButton } from "@chakra-ui/react";
import {
  ArrowLeftIconWhite,
  ArrowRightIconWhite,
} from "../../assets/Icons/ArrowIcons";

interface ImageObject {
  id: string | number;
  image: string;
  title: string;
  subText?: string;
  count?: number;
  rating?: number;
}

interface InfiniteImageCarouselProps {
  images: ImageObject[];
  itemWidth?: number;
  itemHeight?: number;
  gap?: number;
  scrollAmount?: number;
  isIcon?: boolean;
  isText?: boolean;
}

const InfiniteImageCarousel: React.FC<InfiniteImageCarouselProps> = ({
  images,
  itemWidth = 180,
  itemHeight = 270,
  gap = 10,
  scrollAmount = 200,
  isIcon,
  isText,
}) => {
  // eslint-disable-next-line
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (direction: "left" | "right") => {
    const container = containerRef.current;
    if (container) {
      const scrollLeft = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;

      let newPosition =
        direction === "left"
          ? scrollLeft - scrollAmount
          : scrollLeft + scrollAmount;

      if (newPosition < 0) {
        newPosition = maxScroll;
      } else if (newPosition > maxScroll) {
        newPosition = 0;
      }

      container.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });

      setScrollPosition(newPosition);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const handleScrollEvent = () => {
        setScrollPosition(container.scrollLeft);
      };
      container.addEventListener("scroll", handleScrollEvent);
      return () => {
        container.removeEventListener("scroll", handleScrollEvent);
      };
    }
  }, []);

  const extendedImages = [...images, ...images];

  return (
    <Flex position="relative" alignItems="center">
      {isIcon && (
        <IconButton
          icon={<ArrowLeftIconWhite />}
          aria-label="Scroll left"
          onClick={() => handleScroll("left")}
          position="absolute"
          left="0"
          zIndex="1"
          bg=" #0000005E"
          borderRadius="0px"
        />
      )}

      <Box
        ref={containerRef}
        overflowX="auto"
        css={{
          "&::-webkit-scrollbar": { display: "none" },
          "-ms-overflow-style": "none",
          scrollbarWidth: "none",
        }}
        width="100%"
      >
        <Flex gap="6px" minWidth="min-content">
          {extendedImages.map((item, index) => (
            <Flex
              direction="column"
              key={`${item.id}-${index}`}
              //   flexShrink={0}
              minWidth={`${itemWidth}px`}
              gap={`${gap}px`}
            >
              <Image
                src={item.image}
                alt={item.subText}
                height={`${itemHeight}px`}
                width={`${itemWidth}px`}
                objectFit="cover"
              />
              {isText && (
                <Flex direction="column" gap="5px">
                  <Box as="h4" className="title">
                    {item.title}
                  </Box>
                  <Box as="p" className="subText">
                    {item.subText}
                  </Box>
                </Flex>
              )}
            </Flex>
          ))}
        </Flex>
      </Box>

      {isIcon && (
        <IconButton
          icon={<ArrowRightIconWhite />}
          aria-label="Scroll right"
          onClick={() => handleScroll("right")}
          position="absolute"
          right="0"
          zIndex="1"
          bg=" #0000005E"
          borderRadius="0px"
        />
      )}
    </Flex>
  );
};

export default InfiniteImageCarousel;
