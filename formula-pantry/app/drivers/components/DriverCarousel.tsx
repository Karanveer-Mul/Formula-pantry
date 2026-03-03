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
      return slideNode.querySelector(".driver_embla__slide__number") as HTMLElement;
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
    <div className="driver_embla">
      <div className="driver_embla__viewport" ref={emblaRef}>
        <div className="driver_embla__container">
          {slides.map((driver, index) => (
            <div className="driver_embla__slide" key={index}>
              <div className="driver_embla__slide__number">
                <div
                  className={`driver_embla__content ${index === selectedIndex ? "embla__content__active" : "embla__content__inactive"}`}
                >
                  <div className="absolute top-10 left-0 lg:-left-50 flex flex-col items-start justify-center">
                    <div className="flex items-center justify-start">
                      <span
                        className={`driver-face-card-small`}
                        style={{
                          background: `#${driver.team_color}`,
                        }}
                      >
                        <Image
                          className=""
                          loading="lazy"
                          src={`/teams/${year}/${driver.constructor_id}/logo.webp`}
                          width={30}
                          height={30}
                          alt={`${driver.team_name} logo`}
                        />
                      </span>
                      <span className="text-6xl font-novecento font-bold text-nowrap">{`[  ${driver.last_name}  ]`}</span>
                    </div>
                    <div className="hidden md:flex items-center justify-start mt-8  ">
                      <span className="text-2xl text-gray-500 font-normal mr-2">
                        Team
                      </span>
                      <span className="text-2xl text-black font-bold">
                        {driver.team_name}
                      </span>
                    </div>
                    <div className="hidden md:flex items-center justify-start mt-8 ">
                      <span className="text-2xl text-gray-500 font-normal mr-2">
                        Nationality
                      </span>
                      <span className="text-2xl text-black font-bold">
                        {driver.nationality}
                      </span>
                    </div>
                    <div className="hidden md:flex items-center justify-start mt-8 ">
                      <span className="text-2xl text-gray-500 font-normal mr-2">
                        Code
                      </span>
                      <span className="text-2xl text-black font-bold">
                        {driver.code}
                      </span>
                    </div>
                    <div className="hidden md:flex items-center justify-start mt-8 ">
                      <span className="text-2xl text-gray-500 font-normal mr-2">
                        Season Position
                      </span>
                      <span className="text-2xl text-black font-bold">
                        {driver.season_position}
                      </span>
                    </div>
                    <div className="hidden md:flex items-center justify-start mt-8 ">
                      <span className="text-2xl text-gray-500 font-normal mr-2">
                        Season Points
                      </span>
                      <span className="text-2xl text-black font-bold">
                        {driver.season_points}
                      </span>
                    </div>
                    <div className="hidden md:flex items-center justify-start mt-8 ">
                      <span className="text-2xl text-gray-500 font-normal mr-2">
                        Season Winds
                      </span>
                      <span className="text-2xl text-black font-bold">
                        {driver.season_grand_prix_wins}
                      </span>
                    </div>
                    <div className="hidden md:flex items-center justify-start mt-8 ">
                      <span className="text-2xl text-gray-500 font-normal mr-2">
                        Season Podiums
                      </span>
                      <span className="text-2xl text-black font-bold">
                        {driver.season_grand_prix_podiums}
                      </span>
                    </div>
                    <div className="hidden md:flex items-center justify-start mt-8 ">
                      <span className="text-2xl text-gray-500 font-normal mr-2">
                        Season Poles
                      </span>
                      <span className="text-2xl text-black font-bold">
                        {driver.season_grand_prix_poles}
                      </span>
                    </div>
                  </div>
                  <Link href={`/driver/${driver.id}`}>
                    <DriverCard driver={driver} />
                  </Link>
                </div>
                <div
                  className="driver_embla__slide__img driver-face-card-md"
                  style={{
                    background: `#${driver.team_color}`,
                    borderColor: `#${driver.team_color}`,
                  }}
                >
                  <Image
                    className=""
                    src={`/teams/${year}/${driver.constructor_id}/${driver.first_name}${driver.last_name}_small.webp`}
                    alt="Your alt text"
                    width={40}
                    height={40}
                  />
                </div>
              </div>
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
