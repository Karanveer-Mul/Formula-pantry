"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  EmblaCarouselType,
  EmblaEventListType,
  EmblaEventModelType,
  EmblaOptionsType,
} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "../../components/Carousel/EmblaCarouselArrowButtons";
import {
  DotButton,
  useDotButton,
} from "../../components/Carousel/EmblaCarouselDotButton";
import "./driverEmbla.css";
import Link from "next/link";
import Image from "next/image";
import { Driver } from "../api/types";
import DriverCard from "./DriverCard";

type DriverCarouselProps = {
  drivers: Driver[];
  year?: number;
};

export default function DriverCarousel(props: DriverCarouselProps) {
  let { drivers, year } = props;
  year = year ?? new Date().getFullYear();

  const OPTIONS: EmblaOptionsType = {
    align: "center",
    containScroll: "trimSnaps",
    dragFree: false,
    loop: true,
  };

  return <EmblaCarousel slides={drivers} options={OPTIONS} year={year} />;
}

const TWEEN_FACTOR_BASE = 0.1;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

type PropType = {
  slides: Driver[];
  options?: EmblaOptionsType;
  year?: number;
};

export const EmblaCarousel = (props: PropType) => {
  const { slides, options, year } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".embla__slide__number") as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.snapList().length;
  }, []);

  const tweenScale = useCallback(
    <EventType extends keyof EmblaEventListType>(
      emblaApi: EmblaCarouselType,
      event?: EmblaEventModelType<EventType>,
    ) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = event?.type === "scroll";

      emblaApi.snapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.scrollSnapList.slidesBySnap[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
          const scaleValue = numberWithinRange(tweenValue, 0, 1);
          const scale = scaleValue.toString();
          const tweenNode = tweenNodes.current[slideIndex];
          tweenNode.style.transform = `scale(${scale})`;
        });
      });
    },
    [],
  );

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenScale(emblaApi);

    emblaApi
      .on("reinit", setTweenNodes)
      .on("reinit", setTweenFactor)
      .on("reinit", tweenScale)
      .on("scroll", tweenScale)
      .on("slidefocus", tweenScale);
  }, [emblaApi, tweenScale]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((driver, index) => (
            <div className="embla__slide" key={index}>
              <Link
                href={`/driver/${driver.id}`}
                className="embla__slide__number"
              >
                <div
                  className={`embla__content ${index === selectedIndex ? "embla__content__active" : "embla__content__inactive"}`}
                >
                  <DriverCard driver={driver} />
                </div>
                <div className="embla__slide__img driver-face-card-md" style={{
                      background: `#${driver.team_color}`,
                      borderColor: `#${driver.team_color}`,
                    }}>
                  <Image
                    className=""
                    src={`/teams/${year}/${driver.constructor_id}/${driver.first_name}${driver.last_name}_small.webp`}
                    alt="Your alt text"
                    width={40}
                    height={40}
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__controls__left">
          <div className="embla__buttons">
            <PrevButton
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}
            />
            <NextButton
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}
            />
          </div>
        </div>
        <div className="embla__controls__right">
          <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
              <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={"embla__dot".concat(
                  index === selectedIndex ? " embla__dot--selected" : "",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
