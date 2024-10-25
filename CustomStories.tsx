import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

import tech3 from "../../assets/images/techlk3.png";
import tech7 from "../../assets/images/techlk7.png";
import tech10 from "../../assets/images/techlk10.png";
import tech12 from "../../assets/images/techlk12.png";
import techlk1 from "../../assets/images/lk-1.png";
import techlk2 from "../../assets/images/lk-2.png";
import techlk3 from "../../assets/images/lk-3.png";
import techlk4 from "../../assets/images/lk-4.png";
import techlk5 from "../../assets/images/lk-5.png";
import techlk6 from "../../assets/images/lk-6.png";
import { Box, Flex, Text } from "@chakra-ui/react";
import { ArrowLeftIconWhiteBold } from "../../assets/Icons/ArrowIcons";
import { useNavigate, useParams } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #000;
  color: white;
`;

const TitleWrap = styled(Flex)`
  gap: 16px;
  position: absolute;
  top: 20px;
  left: 15px;
  right: 10px;
  display: flex;
  gap: 10px;
  z-index: 10;
  text-shadow: 4px 4px 2px rgba(0, 0, 0, 0.6);
`;

const CarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 50%;
  height: 100%;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    width: 80%;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
  }
`;

const StoryContainer = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const StoryDiv = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavigationOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
`;

const NavigationHalf = styled.div`
  flex: 1;
  cursor: pointer;
  padding-inline-end: 0px;
`;

const ProgressBar = styled.div`
  position: absolute;
  top: 70px;
  left: 10px;
  right: 10px;
  display: flex;
  gap: 5px;
  z-index: 10;
`;

const ProgressIndicator = styled.div<{ active: boolean; progress: number }>`
  flex-grow: 1;
  height: 3px;
  background-color: rgba(255, 255, 255, 0.5);
  position: relative;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: ${({ active, progress }) => (active ? `${progress}%` : "0")};
    background-color: white;
    transition: width 0.1s linear;
  }
`;

interface Story {
  id: string;
  image: string;
  title?: string;
  duration?: number;
}

interface StoryCarouselProps {
  stories: Story[];
  defaultDuration?: number;
}

export const StoryCarousel: React.FC<StoryCarouselProps> = ({
  stories,
  defaultDuration = 5000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const startProgress = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setProgress(0);
    const duration = stories[currentIndex].duration || defaultDuration;
    intervalRef.current = window.setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          goToNext();
          return 0;
        }
        return prev + (100 / duration) * 100;
      });
    }, 100);
  };

  useEffect(() => {
    startProgress();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line
  }, [currentIndex]);

  const handleDrag = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    if (Math.abs(info.velocity.x) > 200) {
      if (info.velocity.x < 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? stories.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === stories.length - 1 ? 0 : prevIndex + 1
    );
  };
  if (stories.length === 0) {
    return <div>No stories available</div>;
  }

  return (
    <Container>
      <CarouselWrapper>
        <TitleWrap>
          <Box onClick={() => navigate(-1)} cursor="pointer">
            <ArrowLeftIconWhiteBold />
          </Box>
          <Text>{id}</Text>
        </TitleWrap>
        <ProgressBar>
          {stories.map((story, index) => (
            <ProgressIndicator
              key={story.id}
              active={index === currentIndex}
              progress={
                index === currentIndex
                  ? progress
                  : index < currentIndex
                  ? 100
                  : 0
              }
            />
          ))}
        </ProgressBar>
        <AnimatePresence initial={false}>
          <StoryContainer
            key={stories[currentIndex].id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <StoryDiv
              drag="x"
              dragElastic={1}
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDrag}
            >
              <img
                src={stories[currentIndex].image}
                alt={`Story ${currentIndex + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                }}
              />
            </StoryDiv>
          </StoryContainer>
        </AnimatePresence>
        <NavigationOverlay>
          <NavigationHalf onClick={goToPrevious} />
          <NavigationHalf onClick={goToNext} />
        </NavigationOverlay>
      </CarouselWrapper>
    </Container>
  );
};

export const stories: Story[] = [
  {
    image: tech3,
    title: "RealAJ",
    id: "tech-003",
    duration: 7000,
  },
  {
    image: tech7,
    title: "RealAJ",
    id: "tech-007",
    duration: 7000,
  },
  {
    image: tech10,
    title: "RealAJ",
    id: "tech-010",
    duration: 7000,
  },
  {
    image: tech12,
    title: "RealAJ",
    id: "tech-012",
    duration: 7000,
  },
  {
    image: techlk1,
    title: "Nosa.Styles",
    id: "stor-001",
    duration: 3000,
  },
  {
    image: techlk2,
    title: "Nosa.Styles",
    id: "stor-002",
  },
  {
    image: techlk3,
    title: "Nosa.Styles",
    id: "stor-003",
    duration: 7000,
  },
  {
    image: techlk4,
    title: "Nosa.Styles",
    id: "stor-004",
    duration: 3000,
  },
  {
    image: techlk5,
    title: "Nosa.Styles",
    id: "stor-005",
  },
  {
    image: techlk6,
    title: "Nosa.Styles",
    id: "stor-006",
    duration: 3700,
  },
];

const Stories = () => {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div style={{ width: "100%", height: "100vh" }}>
        <StoryCarousel stories={stories} defaultDuration={5000} />
      </div>
    </div>
  );
};

export default Stories;
