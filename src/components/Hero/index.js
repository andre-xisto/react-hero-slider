import React, { useEffect, useState, useRef } from 'react';
import { Button } from '../Button';
import {
  HeroSection,
  HeroWrapper,
  HeroSlide,
  HeroSlider,
  HeroImage,
  HeroContent,
  Arrow,
  SliderButtons,
  PrevArrow,
  NextArrow
} from './HeroElements';

const Hero = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const length = slides.length;
  const timeout = useRef(null);

  useEffect(() => {
    const nextSlide = () => {
      setCurrentSlide(currentSlide => (currentSlide === length - 1 ? 0 : currentSlide + 1));
    };

    timeout.current = setTimeout(nextSlide, 3000);

    return function () {
      if (timeout.currentSlide) {
        clearTimeout(timeout.currentSlide);
      }
    };
  });

  const nextSlide = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    setCurrentSlide(currentSlide === length - 1 ? 0 : currentSlide + 1);
  };

  const prevSlide = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    setCurrentSlide(currentSlide === 0 ? length - 1 : currentSlide - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <HeroSection>
      <HeroWrapper>
        {slides.map((slide, index) => {
          return (
            <HeroSlide key={index}>
              {index === currentSlide && (
                <HeroSlider>
                  <HeroImage src={slide.image} alt={slide.alt} />
                  <HeroContent>
                    <h1>{slide.title}</h1>
                    <p>{slide.price}</p>
                    <Button
                      to={slide.path}
                      primary="true"
                      css={`
                        max-width: 160px;
                      `}
                    >
                      {slide.label} <Arrow />
                    </Button>
                  </HeroContent>
                </HeroSlider>
              )}
            </HeroSlide>
          );
        })}
        <SliderButtons>
          <PrevArrow onClick={prevSlide} />
          <NextArrow onClick={nextSlide} />
        </SliderButtons>
      </HeroWrapper>
    </HeroSection>
  );
};

export default Hero;
