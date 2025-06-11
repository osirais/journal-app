"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import { steps } from "@/constants/steps";
import { useArrowKeyNavigation } from "@/hooks/useArrowKeyNavigation";
import { NavigationAdapter, NextStep, useNextStep } from "nextstepjs";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ShadcnCustomCard from "../tour/tour-card";

export default function DashboardCarousel({ children }: { children: React.ReactNode }) {
  const carouselRef = useRef<CarouselApi>(null);
  const lastScroll = useRef(0);

  const { currentTour } = useNextStep();

  // block default scroll behavior
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  const handleWheel = useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      if (!carouselRef.current || currentTour) return;

      // prevent excessive scrolling
      const now = Date.now();
      if (now - lastScroll.current < 100) return;

      if (e.deltaY > 0) {
        carouselRef.current.scrollNext();
      } else if (e.deltaY < 0) {
        carouselRef.current.scrollPrev();
      }

      lastScroll.current = now;
    },
    [currentTour]
  );

  useArrowKeyNavigation({
    onDown: () => carouselRef.current?.scrollNext(),
    onUp: () => carouselRef.current?.scrollPrev(),
    enabled: !currentTour
  });

  function useCarouselNavAdapter(): NavigationAdapter {
    const [path, setPath] = useState(1);

    const push = useCallback(
      (to: string) => {
        const toPath = Number(to);

        if (toPath > path) {
          carouselRef.current?.scrollNext();
        } else if (toPath < path) {
          carouselRef.current?.scrollPrev();
        }

        setTimeout(() => {
          setPath(toPath);
        }, 750); // fixed delay should ideally be replaced with a way to detect when scroll finishes
      },
      [path]
    );

    return { push, getCurrentPath: () => path.toString() };
  }

  return (
    <div className="flex items-center justify-center" onWheel={handleWheel}>
      <Carousel
        className="relative w-full max-w-3xl"
        orientation="vertical"
        opts={{ watchDrag: false }}
        setApi={(api) => {
          carouselRef.current = api;
        }}
      >
        <NextStep
          steps={steps}
          cardComponent={ShadcnCustomCard as any}
          cardTransition={{
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
          navigationAdapter={useCarouselNavAdapter}
        >
          <CarouselContent className="mx-8 h-screen pt-6">
            {React.Children.map(children, (child, idx) => (
              <CarouselItem key={idx}>{child}</CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute right-0 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-2">
            <CarouselPrevious className="cursor-pointer" />
            <CarouselNext className="cursor-pointer" />
          </div>
        </NextStep>
      </Carousel>
    </div>
  );
}
