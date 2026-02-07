'use client';

import { useCallback, useEffect, useRef, useState } from 'react'
import { EmblaCarouselType, EmblaEventListType, EmblaEventModelType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { NextButton, PrevButton, usePrevNextButtons } from '../../../components/Carousel/EmblaCarouselArrowButtons'
import { DotButton, useDotButton } from '../../../components/Carousel/EmblaCarouselDotButton'
import './embla.css'
import Autoplay from 'embla-carousel-autoplay';
import { useAutoplay } from '@/app/components/Carousel/EmblaCarouselAutoplay';
import { useAutoplayProgress } from '@/app/components/Carousel/EmblaCarouselAutoplayProgress';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const OPTIONS: EmblaOptionsType = { dragFree: true, loop: true }
const SLIDE_COUNT = 7
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())


const LatestNewsCarousel = () => { 
    return <EmblaCarousel slides={SLIDES} options={OPTIONS} />
}
  
export default LatestNewsCarousel;

const TWEEN_FACTOR_BASE = 0.52

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max)

type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

export const EmblaCarousel = (props: PropType) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const tweenFactor = useRef(0)
  const tweenNodes = useRef<HTMLElement[]>([])
  const [activeSlides, setActiveSlides] = useState<Set<number>>(new Set())

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi)

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi)

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector('.embla__slide__number') as HTMLElement
    })
  }, [])

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.snapList().length
  }, [])

  const tweenScale = useCallback(
    <EventType extends keyof EmblaEventListType>(
      emblaApi: EmblaCarouselType,
      event?: EmblaEventModelType<EventType>
    ) => {
      const engine = emblaApi.internalEngine()
      const scrollProgress = emblaApi.scrollProgress()
      const slidesInView = emblaApi.slidesInView()
      const isScrollEvent = event?.type === 'scroll'
      const newActiveSlides = new Set<number>()

      emblaApi.snapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress
        const slidesInSnap = engine.scrollSnapList.slidesBySnap[snapIndex]

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target()

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target)

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress)
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress)
                }
              }
            })
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current)
          const scaleValue = numberWithinRange(tweenValue, 0, 1)
          const scale = scaleValue.toString()
          const tweenNode = tweenNodes.current[slideIndex]
          tweenNode.style.transform = `scale(${scale})`
          
          // Track slides with scale > 0.98
          if (scaleValue > 0.98) {
            newActiveSlides.add(slideIndex)
          }
        })
      })
      
      setActiveSlides(newActiveSlides)
    },
    []
  )

  useEffect(() => {
    if (!emblaApi) return

    setTweenNodes(emblaApi)
    setTweenFactor(emblaApi)
    tweenScale(emblaApi)

    emblaApi
      .on('reinit', setTweenNodes)
      .on('reinit', setTweenFactor)
      .on('reinit', tweenScale)
      .on('scroll', tweenScale)
      .on('slidefocus', tweenScale)
  }, [emblaApi, tweenScale])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">
                <div className='embla__slide__img'>
                    <Image className="" src={`https://picsum.photos/600/350?v=${index}`} alt="Your alt text" width={600} height={350} />
                </div>
                <div className={`embla__content ${activeSlides.has(index) ? 'embla__content__active' : 'embla__content__inactive'}`}>
                    <span className="text-[8rem] font-gilroy font-light tracking-tighter leading-36">FRONT WING {index + 1}</span>
                    <p className="font-harmony font-normal text-4xl">The front wing becomes narrower, reducing its overall aerodynamic influence on the airflow directed toward following cars. However, the outer sections remain open for development, ensuring teams can still extract performance gains. Despite its reduced size, the front wing continues to play a decisive role in overall car balance.</p>  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__controls__left">
          <div className="embla__buttons">
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          </div>  
          <div className="w-fit border-2 border-black font-harmony font-medium text-2xl  px-4 py-2 ml-4">
            <Link href="/news" className="flex justify-center items-center gap-1">
                More News <MoveRight size={16}></MoveRight>
            </Link>
          </div>   
        </div>
        <div className="embla__controls__right">
          <div className="embla__dots">
            {scrollSnaps.map((_, index) => (
                <DotButton
                key={index}
                onClick={() => onDotButtonClick(index)}
                className={'embla__dot'.concat(
                    index === selectedIndex ? ' embla__dot--selected' : ''
                )}
                />
            ))}
          </div>
        </div>
        
      </div>
      
    </div>
  )
}