import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import { ShareBar } from "./ShareBar.js";

describe("ShareBar", () => {
  it("renders the default five icon buttons in order", () => {
    const { container } = render(<ShareBar />);
    const names = [...container.querySelectorAll("button")].map((button) =>
      button.getAttribute("aria-label"),
    );

    expect(names).toEqual(["کپی لینک", "تلگرام", "لینکدین", "ایکس", "واتس‌اپ"]);
    expect(screen.getByText("اشتراک‌گذاری:")).toBeInTheDocument();
  });

  it("names the icon buttons in the same language as their tooltip", () => {
    render(<ShareBar />);
    const telegram = screen.getByRole("button", { name: "تلگرام" });

    expect(telegram).toHaveAttribute("title", "تلگرام");
  });

  it("renders the labelled variant with visible channel names", () => {
    const { container } = render(<ShareBar variant="labelled" label="اشتراک‌گذاری این دوره:" />);

    expect(container.querySelector('[data-slot="share-bar"]')).toHaveClass("justify-between");
    expect(screen.getByRole("button", { name: "تلگرام" })).toHaveTextContent("تلگرام");
    expect(screen.getByText("اشتراک‌گذاری این دوره:")).toBeInTheDocument();
  });

  it("reports which channel was activated", async () => {
    const onShare = vi.fn();
    render(<ShareBar onShare={onShare} />);

    await userEvent.click(screen.getByRole("button", { name: "کپی لینک" }));

    expect(onShare).toHaveBeenCalledWith("copy");
  });

  it("takes its own channel list and labels", () => {
    const { container } = render(
      <ShareBar channels={["telegram", "copy"]} labels={{ copy: "کپی" }} />,
    );

    expect(container.querySelectorAll("button")).toHaveLength(2);
    expect(screen.getByRole("button", { name: "کپی" })).toBeInTheDocument();
  });

  it("forwards refs", () => {
    const ref = createRef<HTMLDivElement>();
    render(<ShareBar ref={ref} />);

    expect(ref.current).toHaveAttribute("data-slot", "share-bar");
  });

  it("renders on the server", () => {
    expect(renderToString(<ShareBar variant="labelled" />)).toContain("لینکدین");
  });

  it("has no accessibility violations", async () => {
    const icons = render(<ShareBar />);
    await expectNoAxeViolations(icons.container);

    const labelled = render(<ShareBar variant="labelled" />);
    await expectNoAxeViolations(labelled.container);
  });
});
