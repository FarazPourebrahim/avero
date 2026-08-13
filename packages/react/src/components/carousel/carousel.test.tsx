import { act, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { renderToString } from "react-dom/server";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { AveroProvider } from "../../i18n/AveroProvider.js";
import { formatMessage } from "../../i18n/dictionaries.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import {
  Carousel,
  CarouselDots,
  CarouselNext,
  CarouselPrevious,
  CarouselSlide,
  CarouselViewport,
} from "./Carousel.js";

// Embla measures layout, which jsdom lacks, so its API is mocked with controllable state.
type Listener = () => void;
const embla = vi.hoisted(() => {
  const listeners = new Map<string, Set<() => void>>();
  const state = { selected: 0, snaps: 3, canPrev: false, canNext: true };
  const api = {
    selectedScrollSnap: () => state.selected,
    scrollSnapList: () => Array.from({ length: state.snaps }, (_, index) => index / 2),
    canScrollPrev: () => state.canPrev,
    canScrollNext: () => state.canNext,
    scrollPrev: vi.fn(),
    scrollNext: vi.fn(),
    scrollTo: vi.fn(),
    on: (event: string, listener: () => void) => {
      if (!listeners.has(event)) listeners.set(event, new Set());
      listeners.get(event)!.add(listener);
    },
    off: (event: string, listener: () => void) => listeners.get(event)?.delete(listener),
  };
  const options = { current: {} as Record<string, unknown> };
  return { api, state, listeners, options };
});

vi.mock("embla-carousel-react", () => ({
  default: (opts: Record<string, unknown>) => {
    embla.options.current = opts;
    return [() => {}, embla.api];
  },
}));

function emit(event: string) {
  act(() => {
    for (const listener of embla.listeners.get(event) ?? []) (listener as Listener)();
  });
}

function RelatedCourses({ setApi }: { setApi?: (api: unknown) => void }) {
  return (
    <Carousel aria-label="دوره‌های مرتبط" setApi={setApi}>
      <CarouselPrevious />
      <CarouselNext />
      <CarouselViewport>
        <CarouselSlide aria-label="1 از 3">مبانی طراحی رابط کاربری</CarouselSlide>
        <CarouselSlide aria-label="2 از 3">TypeScript برای توسعه‌دهندگان React</CarouselSlide>
        <CarouselSlide aria-label="3 از 3">تحلیل داده با Python</CarouselSlide>
      </CarouselViewport>
      <CarouselDots />
    </Carousel>
  );
}

describe("Carousel", () => {
  beforeEach(() => {
    embla.state.selected = 0;
    embla.state.snaps = 3;
    embla.state.canPrev = false;
    embla.state.canNext = true;
    embla.listeners.clear();
    vi.clearAllMocks();
  });

  it("renders a labelled carousel region with labelled slides", () => {
    render(<RelatedCourses />);

    const region = screen.getByRole("region", { name: "دوره‌های مرتبط" });
    expect(region).toHaveAttribute("aria-roledescription", "carousel");
    expect(screen.getAllByRole("group")).toHaveLength(3);
    expect(screen.getByRole("group", { name: "1 از 3" })).toHaveAttribute(
      "aria-roledescription",
      "slide",
    );
  });

  it("passes the reading direction and center alignment to Embla", () => {
    render(<RelatedCourses />);

    expect(embla.options.current).toMatchObject({ direction: "rtl", align: "center" });
  });

  it("uses LTR under an English provider and lets opts override defaults", () => {
    render(
      <AveroProvider locale="en-US">
        <Carousel aria-label="c" opts={{ align: "start", loop: true }}>
          <CarouselViewport />
        </Carousel>
      </AveroProvider>,
    );

    expect(embla.options.current).toMatchObject({ direction: "ltr", align: "start", loop: true });
  });

  it("disables the previous button at the start and scrolls forward", async () => {
    render(<RelatedCourses />);
    const previous = screen.getByRole("button", { name: "قبلی" });
    const next = screen.getByRole("button", { name: "بعدی" });

    expect(previous).toBeDisabled();
    await userEvent.click(next);

    expect(embla.api.scrollNext).toHaveBeenCalledTimes(1);
  });

  it("updates controls and dots when the slide changes", async () => {
    render(<RelatedCourses />);

    embla.state.selected = 2;
    embla.state.canPrev = true;
    embla.state.canNext = false;
    emit("select");

    expect(screen.getByRole("button", { name: "قبلی" })).toBeEnabled();
    expect(screen.getByRole("button", { name: "بعدی" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "اسلاید 3" })).toHaveAttribute(
      "aria-current",
      "true",
    );

    await userEvent.click(screen.getByRole("button", { name: "قبلی" }));
    expect(embla.api.scrollPrev).toHaveBeenCalledTimes(1);
  });

  it("renders one dot per snap and scrolls to the clicked one", async () => {
    render(<RelatedCourses />);
    const dots = [1, 2, 3].map((index) =>
      screen.getByRole("button", { name: formatMessage("اسلاید {index}", { index }) }),
    );

    expect(dots[0]).toHaveClass("bg-indigo-500", "size-2");
    expect(dots[1]).toHaveClass("bg-gray-300");
    await userEvent.click(dots[1]!);

    expect(embla.api.scrollTo).toHaveBeenCalledWith(1);
  });

  it("renders pill pagination", () => {
    render(
      <Carousel aria-label="c">
        <CarouselViewport />
        <CarouselDots variant="pill" />
      </Carousel>,
    );

    expect(screen.getByRole("button", { name: "اسلاید 1" })).toHaveClass("w-7", "bg-indigo-600");
    expect(screen.getByRole("button", { name: "اسلاید 2" })).toHaveClass("w-2", "bg-slate-300");
  });

  it("hides the dots when there is only one position", () => {
    embla.state.snaps = 1;
    render(<RelatedCourses />);

    expect(screen.queryByRole("button", { name: "اسلاید 1" })).not.toBeInTheDocument();
  });

  it("maps arrow keys to reading direction", async () => {
    render(<RelatedCourses />);
    screen.getByRole("button", { name: "بعدی" }).focus();

    await userEvent.keyboard("{ArrowLeft}");
    expect(embla.api.scrollNext).toHaveBeenCalledTimes(1);

    await userEvent.keyboard("{ArrowRight}");
    expect(embla.api.scrollPrev).toHaveBeenCalledTimes(1);
  });

  it("maps arrow keys for LTR", async () => {
    render(
      <AveroProvider locale="en-US">
        <RelatedCourses />
      </AveroProvider>,
    );
    screen.getByRole("button", { name: "Next" }).focus();

    await userEvent.keyboard("{ArrowRight}");
    await userEvent.keyboard("{ArrowLeft}");

    expect(embla.api.scrollNext).toHaveBeenCalledTimes(1);
    expect(embla.api.scrollPrev).toHaveBeenCalledTimes(1);
  });

  it("respects a consumer keydown handler that prevents default", async () => {
    render(
      <Carousel aria-label="c" onKeyDown={(event) => event.preventDefault()}>
        <CarouselNext />
        <CarouselViewport />
      </Carousel>,
    );
    screen.getByRole("button", { name: "بعدی" }).focus();

    await userEvent.keyboard("{ArrowLeft}");

    expect(embla.api.scrollNext).not.toHaveBeenCalled();
  });

  it("hands the Embla API to setApi and unsubscribes on unmount", () => {
    const setApi = vi.fn();
    const { unmount } = render(<RelatedCourses setApi={setApi} />);

    expect(setApi).toHaveBeenCalledWith(embla.api);
    expect(embla.listeners.get("select")?.size).toBe(1);
    unmount();
    expect(embla.listeners.get("select")?.size).toBe(0);
  });

  it("throws a helpful error when parts are used outside Carousel", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<CarouselNext />)).toThrow(
      "<CarouselNext> must be used inside <Carousel>.",
    );
  });

  it("renders on the server", () => {
    expect(renderToString(<RelatedCourses />)).toContain('aria-roledescription="carousel"');
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<RelatedCourses />);

    await expectNoAxeViolations(container);
  });
});
