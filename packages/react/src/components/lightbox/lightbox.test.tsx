import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef, useState } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { AveroProvider } from "../../i18n/AveroProvider.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Lightbox, type LightboxImage, type LightboxProps } from "./Lightbox.js";

const IMAGES: LightboxImage[] = [
  { src: "/one.png", alt: "صفحه اصلی اپلیکیشن", caption: "طراحی صفحه اصلی" },
  { src: "/two.png", alt: "صفحه پروفایل" },
  { src: "/three.png", alt: "صفحه تنظیمات", caption: "نسخه نهایی" },
];

function Gallery(props: Partial<LightboxProps>) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIndex(1);
          setOpen(true);
        }}
      >
        نمایش صفحه پروفایل
      </button>
      <Lightbox
        images={IMAGES}
        open={open}
        onOpenChange={setOpen}
        index={index}
        onIndexChange={setIndex}
        {...props}
      />
    </>
  );
}

function shownImage() {
  return screen.getByRole("img");
}

describe("Lightbox", () => {
  it("opens on the chosen image as a named dialog over a dark scrim", async () => {
    render(<Gallery />);

    await userEvent.click(screen.getByRole("button", { name: "نمایش صفحه پروفایل" }));

    const dialog = screen.getByRole("dialog", { name: "گالری تصاویر" });
    expect(dialog).toHaveClass("z-(--z-modal-content)");
    expect(document.querySelector('[data-slot="lightbox-overlay"]')).toHaveClass(
      "bg-black/90",
      "z-(--z-modal)",
    );
    expect(shownImage()).toHaveAccessibleName("صفحه پروفایل");
    expect(shownImage()).toHaveClass("shadow-lightbox", "cursor-zoom-in");
    expect(screen.getByText("۲ از ۳")).toHaveAttribute("aria-live", "polite");
  });

  it("pages with the previous and next buttons and disables them at the ends", async () => {
    const onIndexChange = vi.fn();
    render(<Lightbox images={IMAGES} defaultOpen onIndexChange={onIndexChange} />);
    const previous = screen.getByRole("button", { name: "قبلی" });
    const next = screen.getByRole("button", { name: "بعدی" });

    expect(previous).toBeDisabled();

    await userEvent.click(next);
    await userEvent.click(next);

    expect(shownImage()).toHaveAccessibleName("صفحه تنظیمات");
    expect(screen.getByText("نسخه نهایی")).toHaveAttribute("data-slot", "lightbox-caption");
    expect(next).toBeDisabled();
    expect(onIndexChange).toHaveBeenLastCalledWith(2);

    await userEvent.click(previous);

    expect(shownImage()).toHaveAccessibleName("صفحه پروفایل");
  });

  it("moves along the reading direction with arrow keys right to left", async () => {
    render(<Lightbox images={IMAGES} defaultOpen />);

    await userEvent.keyboard("{ArrowLeft}");
    expect(shownImage()).toHaveAccessibleName("صفحه پروفایل");

    await userEvent.keyboard("{ArrowRight}");
    expect(shownImage()).toHaveAccessibleName("صفحه اصلی اپلیکیشن");

    await userEvent.keyboard("{End}");
    expect(shownImage()).toHaveAccessibleName("صفحه تنظیمات");

    await userEvent.keyboard("{Home}");
    expect(shownImage()).toHaveAccessibleName("صفحه اصلی اپلیکیشن");
  });

  it("moves with ArrowRight left to right and uses the English dictionary", async () => {
    render(
      <AveroProvider locale="en-US">
        <Lightbox images={IMAGES} defaultOpen />
      </AveroProvider>,
    );

    await userEvent.keyboard("{ArrowRight}");

    expect(shownImage()).toHaveAccessibleName("صفحه پروفایل");
    expect(screen.getByRole("dialog", { name: "Image gallery" })).toHaveAttribute("dir", "ltr");
    expect(screen.getByText("2 of 3")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("toggles zoom from the button or the image and resets it on paging", async () => {
    render(<Lightbox images={IMAGES} defaultOpen />);
    const zoom = screen.getByRole("button", { name: "نمایش بزرگ‌تر" });

    await userEvent.click(zoom);

    expect(zoom).toHaveAttribute("aria-pressed", "true");
    expect(shownImage()).toHaveClass("scale-175", "cursor-zoom-out");

    await userEvent.click(shownImage());
    expect(zoom).toHaveAttribute("aria-pressed", "false");

    await userEvent.click(shownImage());
    await userEvent.click(screen.getByRole("button", { name: "بعدی" }));

    expect(zoom).toHaveAttribute("aria-pressed", "false");
    expect(shownImage()).toHaveClass("cursor-zoom-in");
  });

  it("closes on Escape and returns focus to the element that opened it", async () => {
    render(<Gallery />);
    const trigger = screen.getByRole("button", { name: "نمایش صفحه پروفایل" });

    await userEvent.click(trigger);
    expect(screen.getByRole("button", { name: "نمایش بزرگ‌تر" })).toHaveFocus();

    await userEvent.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).toBeNull();
    expect(trigger).toHaveFocus();
  });

  it("closes from the close button", async () => {
    const onOpenChange = vi.fn();
    render(<Lightbox images={IMAGES} defaultOpen onOpenChange={onOpenChange} />);

    await userEvent.click(screen.getByRole("button", { name: "بستن" }));

    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("hides paging for a single image and clamps an out-of-range index", () => {
    const { unmount } = render(<Lightbox images={IMAGES.slice(0, 1)} defaultOpen />);

    expect(screen.queryByRole("button", { name: "بعدی" })).toBeNull();
    expect(document.querySelector('[data-slot="lightbox-counter"]')).toBeEmptyDOMElement();
    unmount();

    render(<Lightbox images={IMAGES} defaultOpen index={9} />);

    expect(shownImage()).toHaveAccessibleName("صفحه تنظیمات");
  });

  it("renders an empty dialog without images", () => {
    render(<Lightbox images={[]} defaultOpen />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.queryByRole("img")).toBeNull();
    expect(screen.queryByRole("button", { name: "نمایش بزرگ‌تر" })).toBeNull();
  });

  it("merges classes, uses a custom label and forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<Lightbox ref={ref} images={IMAGES} defaultOpen label="نمونه کارها" className="p-2" />);

    expect(ref.current).toHaveAttribute("data-slot", "lightbox");
    expect(ref.current).toHaveClass("p-2");
    expect(ref.current).not.toHaveClass("p-4");
    expect(screen.getByRole("dialog", { name: "نمونه کارها" })).toBe(ref.current);
  });

  it("renders nothing on the server while closed", () => {
    expect(renderToString(<Lightbox images={IMAGES} />)).toBe("");
  });

  it("has no accessibility violations while open", async () => {
    render(<Lightbox images={IMAGES} defaultOpen defaultIndex={1} />);

    await expectNoAxeViolations(screen.getByRole("dialog"));
  });
});
