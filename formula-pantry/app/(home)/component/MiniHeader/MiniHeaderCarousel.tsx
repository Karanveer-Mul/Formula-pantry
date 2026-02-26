"use client";

import { useCallback, useEffect } from "react";
import { EmblaOptionsType, EmblaCarouselType } from "embla-carousel";
import {
  DotButton,
  useDotButton,
} from "../../../components/Carousel/EmblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons,
} from "../../../components/Carousel/EmblaCarouselArrowButtons";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { LatestNewsTitle } from "../../api/types";
import Link from "next/link";
import Image from "next/image";
import "./emblaMiniHeader.css";

type MiniHeaderCarouselProps = {
  latestNewsTitles: LatestNewsTitle[];
};

const MiniHeaderCarousel = (props: MiniHeaderCarouselProps) => {
  const { latestNewsTitles } = props;

  const OPTIONS: EmblaOptionsType = { loop: true };

  return <EmblaCarousel slides={latestNewsTitles} options={OPTIONS} />;
};

type PropType = {
  slides: LatestNewsTitle[];
  options?: EmblaOptionsType;
};

const EmblaCarousel = (props: PropType) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay()]);

  const onNavButtonClick = useCallback((emblaApi: EmblaCarouselType) => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    autoplay.stop();
  }, []);

  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    onNavButtonClick,
  );

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi, onNavButtonClick);

  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    autoplay.play();
  }, [emblaApi]);

  return (
    <div className="mini_header_embla">
      <div className="mini_header_embla__viewport" ref={emblaRef}>
        <div className="mini_header_embla__container">
          {slides.map((news, index) => (
            <div className="mini_header_embla__slide" key={index}>
              <div className="mini_header_embla__slide__number">
                <div className="mini_header_embla__slide__img hover:cursor-pointer">
                  <Link target="_blank" href={`/news/${news.id}`}>
                    <Image
                      className="rounded-2xl h-72"
                      loading="lazy"
                      src={`${news.hook}`}
                      alt={`${news.title}`}
                      width={320}
                      height={140}
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
      <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />

      <div className="mini_header_embla__dots">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={"mini_header_embla__dot".concat(
              index === selectedIndex ? " embla__dot--selected" : "",
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default MiniHeaderCarousel;
