'use client';

import { useCallback, useEffect, useRef, useState } from 'react'
import { EmblaCarouselType, EmblaEventListType, EmblaEventModelType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { NextButton, PrevButton, usePrevNextButtons } from '../../../components/Carousel/EmblaCarouselArrowButtons'
import { DotButton, useDotButton } from '../../../components/Carousel/EmblaCarouselDotButton'
import './embla.css'
import { MoveRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { News } from '@/app/news/api/types';  
import { getFirstArticleSection } from "@/app/news/components/newsSection";
import { convertUtcTimeToMonthDateYear, truncateContent} from "@/app/components/shared/helper"


type LatestNewsCarouselProps = {
  newsArticles: News[];
}

const LatestNewsCarousel = (props: LatestNewsCarouselProps) => { 
  const { newsArticles } = props;

  const OPTIONS: EmblaOptionsType = { align: 'start',  containScroll: 'trimSnaps', dragFree: false, loop: true };

  return <EmblaCarousel slides={newsArticles} options={OPTIONS} />
}
  
export default LatestNewsCarousel;

const TWEEN_FACTOR_BASE = 0.1

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max)

type PropType = {
  slides: News[]
  options?: EmblaOptionsType
}

export const EmblaCarousel = (props: PropType) => {
  const { slides, options } = props
  const [emblaRef, emblaApi] = useEmblaCarousel(options)
  const tweenFactor = useRef(0)
  const tweenNodes = useRef<HTMLElement[]>([])

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
        })
      })
      
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
          {slides.map((news, index) => (
            <div className="embla__slide" key={index}>
              <Link href={`/news/${news.id}`} className="embla__slide__number">
                <div className={`embla__content ${index === selectedIndex ? 'embla__content__active' : 'embla__content__inactive'}`}>
                    <span className="text-4xl font-harmony hover:text-[#fb542b] font-bold mb-2">{news.title}</span>
                    <span className='font-harmony font-normal text-2xl text-gray-500 mb-2'>
                      {new Date(news.updated_on).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric"})}
                    </span>
                    <p className="font-harmony font-normal text-2xl mb-2" dangerouslySetInnerHTML={{ __html: truncateContent(getFirstArticleSection(news).body, 400) }} />   
                    <span className='text-2xl font-bold font-harmony underline mb-2'>Read More</span>                   
                </div>
                <div className='embla__slide__img'>
                    <Image className="" src={news.hook} alt="Your alt text" width={640} height={360} />
                </div>                
              </Link>
            </div>
          ))}
          <div className="embla__slide">
              <Link href="/news/" className="embla__slide__number">
                <div className={`embla__content embla__content__active`}> 
                    <span className='flex justify-center items-center gap-1 text-4xl font-bold font-harmony text-nowrap'>
                      More News <MoveRight size={16}></MoveRight>
                    </span>                   
                </div>                               
              </Link>
            </div>
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