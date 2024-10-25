import React from "react";
import styled from "styled-components";
import { Swiper } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SliderWrapper = styled.div`
  overflow: hidden;
  max-width: 420px;
  width: 405px;
  margin-bottom: 40px;

  @media screen and (max-width: 456px) {
    width: 100%;
  }
  /* @media screen and (max-width: 420px) {
    max-width: 320px;
  } */

  .swiper-pagination-bullet {
    background: #fff;
    height: 8px;
    width: 8px;
    opacity: 0.5;
  }

  .swiper-pagination-bullet-active {
    opacity: 1;
  }
`;

export const CardItem = styled.div`
  width: 100%;
  color: #fff;
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(30px);
  background: rgba(255, 255, 255, 0.2);
`;

export const UserImage = styled.img`
  width: 100%;
  height: 100%;

  @media screen and (max-width: 768px) {
    width: 80%;
  }

  @media screen and (max-width: 362px) {
    width: 350px;
  }
`;

interface CardSliderProps {
  onSlideChange: (swiper: any) => void;
  children: React.ReactNode;
}

const CardSlider: React.FC<CardSliderProps> = ({ onSlideChange, children }) => {
  return (
    <Container>
      <SliderWrapper>
        <Swiper
          modules={[Pagination]}
          loop={true}
          grabCursor={true}
          spaceBetween={30}
          pagination={{ clickable: true, dynamicBullets: true }}
          onSlideChange={onSlideChange}
        >
          {children}
        </Swiper>
      </SliderWrapper>
    </Container>
  );
};

export default CardSlider;
