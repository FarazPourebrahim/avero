"use client";

import { cva, type VariantProps } from "class-variance-authority";
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
} from "react";
import { formatMessage } from "../../i18n/dictionaries.js";
import { useAvero } from "../../i18n/AveroProvider.js";
import { ChevronLeftIcon, ChevronRightIcon } from "../../icons/internalIcons.js";
import { cn } from "../../utils/cn.js";
import { IconButton } from "../icon-button/IconButton.js";

export type CarouselApi = UseEmblaCarouselType[1];
export type CarouselOptions = Parameters<typeof useEmblaCarousel>[0];

type CarouselState = {
  selectedIndex: number;
  snapCount: number;
  canScrollPrev: boolean;
  canScrollNext: boolean;
};

type CarouselContextValue = CarouselState & {
  viewportRef: UseEmblaCarouselType[0];
  api: CarouselApi;
  scrollPrev: () => void;
  scrollNext: () => void;
  scrollTo: (index: number) => void;
};

const CarouselContext = createContext<CarouselContextValue | null>(null);

function useCarousel(part: string): CarouselContextValue {
  const context = useContext(CarouselContext);
  if (!context) {
    throw new Error(`<${part}> must be used inside <Carousel>.`);
  }
  return context;
}

/** Props specific to `Carousel`. It also accepts every native `<section>` attribute. */
export type CarouselOwnProps = {
  /** Accessible name of the carousel region, e.g. "پروژه‌های مرتبط". */
  "aria-label": string;
  /** Embla options. Direction follows `AveroProvider`; slides snap to the center by default. */
  opts?: CarouselOptions;
  /** Receives the Embla API once it is ready, for custom controls. */
  setApi?: (api: CarouselApi) => void;
};

export type CarouselProps = Omit<HTMLAttributes<HTMLElement>, keyof CarouselOwnProps> &
  CarouselOwnProps;

const INITIAL_STATE: CarouselState = {
  selectedIndex: 0,
  snapCount: 0,
  canScrollPrev: false,
  canScrollNext: false,
};

/**
 * A swipeable carousel (N-09) built on Embla: the related-projects slider (R-07) with circular
 * previous/next buttons and dot pagination, plus the home page's pill pagination.
 */
export const Carousel = forwardRef<HTMLElement, CarouselProps>(function Carousel(
  { opts, setApi, className, children, onKeyDown, ...props },
  ref,
) {
  const { dir } = useAvero();
  const [viewportRef, api] = useEmblaCarousel({
    direction: dir,
    align: "center",
    containScroll: "trimSnaps",
    ...opts,
  });
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    if (!api) return;
    setApi?.(api);
    const update = () =>
      setState({
        selectedIndex: api.selectedScrollSnap(),
        snapCount: api.scrollSnapList().length,
        canScrollPrev: api.canScrollPrev(),
        canScrollNext: api.canScrollNext(),
      });
    update();
    api.on("select", update);
    api.on("reInit", update);
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api, setApi]);

  const scrollPrev = useCallback(() => api?.scrollPrev(), [api]);
  const scrollNext = useCallback(() => api?.scrollNext(), [api]);
  const scrollTo = useCallback((index: number) => api?.scrollTo(index), [api]);

  // Arrow keys follow reading direction: in RTL the left arrow moves forward.
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    const forward = dir === "rtl" ? "ArrowLeft" : "ArrowRight";
    const backward = dir === "rtl" ? "ArrowRight" : "ArrowLeft";
    if (event.key === forward) {
      event.preventDefault();
      scrollNext();
    } else if (event.key === backward) {
      event.preventDefault();
      scrollPrev();
    }
  };

  return (
    <CarouselContext.Provider
      value={{ viewportRef, api, ...state, scrollPrev, scrollNext, scrollTo }}
    >
      <section
        ref={ref}
        aria-roledescription="carousel"
        data-slot="carousel"
        className={cn("relative", className)}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </section>
    </CarouselContext.Provider>
  );
});

Carousel.displayName = "Carousel";

export type CarouselViewportProps = HTMLAttributes<HTMLDivElement>;

/** The clipping viewport and slide track. Slides are its direct children. */
export const CarouselViewport = forwardRef<HTMLDivElement, CarouselViewportProps>(
  function CarouselViewport({ className, children, ...props }, ref) {
    const { viewportRef } = useCarousel("CarouselViewport");
    return (
      <div ref={viewportRef} data-slot="carousel-viewport" className="overflow-hidden">
        <div ref={ref} className={cn("flex gap-4 pb-4", className)} {...props}>
          {children}
        </div>
      </div>
    );
  },
);

CarouselViewport.displayName = "CarouselViewport";

export type CarouselSlideProps = HTMLAttributes<HTMLDivElement>;

/**
 * One slide. Defaults to the reference's width: 85% of the track on mobile and half of it
 * (minus the gap) from `md`. Give each slide an `aria-label` such as "1 از 3".
 */
export const CarouselSlide = forwardRef<HTMLDivElement, CarouselSlideProps>(function CarouselSlide(
  { className, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      role="group"
      aria-roledescription="slide"
      data-slot="carousel-slide"
      className={cn("min-w-0 flex-none basis-[85%] md:basis-[calc(50%-8px)]", className)}
      {...props}
    />
  );
});

CarouselSlide.displayName = "CarouselSlide";

export type CarouselControlProps = Omit<
  HTMLAttributes<HTMLButtonElement>,
  "children" | "onClick"
> & {
  /** Accessible label. @defaultValue the dictionary's `previous` / `next` string */
  label?: string;
};

/** Circular button that scrolls back; it points to the inline start and is disabled at the start. */
export const CarouselPrevious = forwardRef<HTMLButtonElement, CarouselControlProps>(
  function CarouselPrevious({ label, ...props }, ref) {
    const { dictionary } = useAvero();
    const { canScrollPrev, scrollPrev } = useCarousel("CarouselPrevious");
    return (
      <IconButton
        ref={ref}
        variant="circle"
        label={label ?? dictionary.previous}
        disabled={!canScrollPrev}
        onClick={scrollPrev}
        data-slot="carousel-previous"
        {...props}
      >
        <ChevronRightIcon size={24} className="ltr:-scale-x-100" />
      </IconButton>
    );
  },
);

CarouselPrevious.displayName = "CarouselPrevious";

/** Circular button that scrolls forward; it points to the inline end and is disabled at the end. */
export const CarouselNext = forwardRef<HTMLButtonElement, CarouselControlProps>(
  function CarouselNext({ label, ...props }, ref) {
    const { dictionary } = useAvero();
    const { canScrollNext, scrollNext } = useCarousel("CarouselNext");
    return (
      <IconButton
        ref={ref}
        variant="circle"
        label={label ?? dictionary.next}
        disabled={!canScrollNext}
        onClick={scrollNext}
        data-slot="carousel-next"
        {...props}
      >
        <ChevronLeftIcon size={24} className="ltr:-scale-x-100" />
      </IconButton>
    );
  },
);

CarouselNext.displayName = "CarouselNext";

export const carouselDotVariants = cva("cursor-pointer rounded-full transition", {
  variants: {
    variant: {
      /** Related-projects dots (R-07). */
      dot: "size-2",
      /** Home page swiper bullets: the active one stretches to 28px (CSS-only in the reference). */
      pill: "h-2 transition-all duration-[400ms] ease-in-out",
    },
    active: { true: "", false: "" },
  },
  compoundVariants: [
    { variant: "dot", active: true, class: "bg-indigo-500" },
    { variant: "dot", active: false, class: "bg-gray-300" },
    { variant: "pill", active: true, class: "w-7 bg-indigo-600" },
    { variant: "pill", active: false, class: "w-2 bg-slate-300" },
  ],
  defaultVariants: { variant: "dot", active: false },
});

/** Props specific to `CarouselDots`. It also accepts every native `<div>` attribute. */
export type CarouselDotsOwnProps = {
  /** Pagination style. @defaultValue "dot" */
  variant?: VariantProps<typeof carouselDotVariants>["variant"];
};

export type CarouselDotsProps = Omit<HTMLAttributes<HTMLDivElement>, keyof CarouselDotsOwnProps> &
  CarouselDotsOwnProps;

/** One button per snap position; the current one is highlighted. */
export const CarouselDots = forwardRef<HTMLDivElement, CarouselDotsProps>(function CarouselDots(
  { variant, className, ...props },
  ref,
) {
  const { dictionary } = useAvero();
  const { snapCount, selectedIndex, scrollTo } = useCarousel("CarouselDots");
  if (snapCount < 2) return null;

  return (
    <div
      ref={ref}
      data-slot="carousel-dots"
      className={cn(
        "mt-4 flex justify-center",
        variant === "pill" ? "gap-1.5" : "gap-2",
        className,
      )}
      {...props}
    >
      {Array.from({ length: snapCount }, (_, index) => {
        const active = index === selectedIndex;
        return (
          <button
            key={index}
            type="button"
            aria-label={formatMessage(dictionary.goToSlide, { index: index + 1 })}
            aria-current={active ? "true" : undefined}
            onClick={() => scrollTo(index)}
            className={cn(
              carouselDotVariants({ variant, active }),
              "focus-visible:ring-primary/40 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
            )}
          />
        );
      })}
    </div>
  );
});

CarouselDots.displayName = "CarouselDots";
