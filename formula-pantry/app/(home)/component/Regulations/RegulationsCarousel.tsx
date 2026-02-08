'use client';

import { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { NextButton, PrevButton, usePrevNextButtons } from '../../../components/Carousel/EmblaCarouselArrowButtons'
import './regulation_embla.css'
import AutoScroll from 'embla-carousel-auto-scroll'
import { useAutoScroll } from '@/app/components/Carousel/EmblaCarouselAutoScroll'
import Image from 'next/image';

const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true }
const SLIDE_COUNT = 7
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())


const LatestNewsCarousel = () => { 
    return <EmblaCarousel slides={SLIDES} options={OPTIONS} />
}
  
export default LatestNewsCarousel;

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

export const EmblaCarousel = (props: PropType) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [AutoScroll()])

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const { autoScrollIsPlaying, toggleAutoScroll, onAutoScrollButtonClick } =
    useAutoScroll(emblaApi)

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">
                <span>{index + 1}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={() => onAutoScrollButtonClick(onPrevButtonClick)} disabled={prevBtnDisabled} />
          <NextButton onClick={() => onAutoScrollButtonClick(onNextButtonClick)} disabled={nextBtnDisabled} />
        </div>  
        
      </div>
      
    </div>
  )
}