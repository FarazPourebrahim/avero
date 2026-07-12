import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { AveroProvider } from "../../i18n/AveroProvider.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  type DrawerContentOwnProps,
} from "./Drawer.js";

function Menu(props: DrawerContentOwnProps & { defaultOpen?: boolean }) {
  const { defaultOpen, ...content } = props;
  return (
    <Drawer defaultOpen={defaultOpen}>
      <DrawerTrigger>باز کردن منو</DrawerTrigger>
      <DrawerContent aria-describedby={undefined} {...content}>
        <DrawerHeader>
          <DrawerTitle>منوی داشبورد</DrawerTitle>
        </DrawerHeader>
        <DrawerBody>
          <a href="/dashboard">پیشخوان</a>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

describe("Drawer", () => {
  it("stays closed until the trigger is used", async () => {
    render(<Menu />);

    expect(screen.queryByRole("dialog")).toBeNull();

    await userEvent.click(screen.getByRole("button", { name: "باز کردن منو" }));

    expect(screen.getByRole("dialog", { name: "منوی داشبورد" })).toBeInTheDocument();
  });

  it("renders the dashboard panel size and a scrim", () => {
    render(<Menu defaultOpen />);
    const panel = screen.getByRole("dialog");

    expect(panel).toHaveClass("w-[75%]", "max-w-sm", "sm:w-1/2", "end-0", "fixed");
    expect(document.querySelector('[data-slot="drawer-overlay"]')).toHaveClass("bg-black/40");
  });

  it("renders the wide header menu from the inline start", () => {
    render(<Menu defaultOpen side="start" size="wide" />);

    expect(screen.getByRole("dialog")).toHaveClass("w-2/3", "start-0", "border-e");
  });

  it("closes on Escape", async () => {
    render(<Menu defaultOpen />);

    await userEvent.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("closes with the header's close button", async () => {
    render(<Menu defaultOpen />);

    await userEvent.click(screen.getByRole("button", { name: "بستن منو" }));

    expect(screen.queryByRole("dialog")).toBeNull();
  });

  it("labels the close button from the English dictionary", () => {
    render(
      <AveroProvider locale="en-US">
        <Menu defaultOpen />
      </AveroProvider>,
    );

    expect(screen.getByRole("button", { name: "Close menu" })).toBeInTheDocument();
  });

  it("hides the close button on request", () => {
    render(
      <Drawer defaultOpen>
        <DrawerContent aria-describedby={undefined}>
          <DrawerHeader showClose={false}>
            <DrawerTitle>منو</DrawerTitle>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>,
    );

    expect(screen.queryByRole("button", { name: "بستن منو" })).toBeNull();
  });

  it("forwards refs to the panel", () => {
    const ref = createRef<HTMLDivElement>();
    render(
      <Drawer defaultOpen>
        <DrawerContent ref={ref} aria-describedby={undefined}>
          <DrawerHeader>
            <DrawerTitle>منو</DrawerTitle>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>,
    );

    expect(ref.current).toHaveAttribute("data-slot", "drawer-content");
  });

  it("renders only the trigger on the server", () => {
    const html = renderToString(<Menu />);

    expect(html).toContain("باز کردن منو");
    expect(html).not.toContain("drawer-content");
  });

  it("has no accessibility violations while open", async () => {
    render(<Menu defaultOpen />);

    await expectNoAxeViolations(screen.getByRole("dialog"));
  });
});
