import { render, screen, waitFor, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { AveroProvider } from "../../i18n/AveroProvider.js";
import { fa } from "../../i18n/dictionaries.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { ToastProvider, useToast, type ToastOptions, type ToastProviderProps } from "./Toast.js";

// Radix fills `{hotkey}` with the shortcut that focuses the region.
const REGION_NAME = fa.toastRegion.replace("{hotkey}", "F8");

function Trigger({ options }: { options?: Partial<ToastOptions> }) {
  const { toast, dismiss } = useToast();
  const count = useRef(0);
  return (
    <>
      <button
        type="button"
        onClick={() => {
          count.current += 1;
          toast({
            title: `ذخیره شد ${count.current}`,
            description: "تغییرات ذخیره شد.",
            ...options,
          });
        }}
      >
        نمایش
      </button>
      <button type="button" onClick={() => dismiss()}>
        بستن همه
      </button>
    </>
  );
}

function Harness({
  options,
  ...providerProps
}: Partial<ToastProviderProps> & { options?: Partial<ToastOptions> }) {
  return (
    <ToastProvider {...providerProps}>
      <Trigger options={options} />
    </ToastProvider>
  );
}

function toasts() {
  return Array.from(document.querySelectorAll<HTMLElement>('[data-slot="toast"]'));
}

describe("ToastProvider and useToast", () => {
  it("shows a toast with its title and description in a labelled region", async () => {
    render(<Harness options={{ tone: "success" }} />);

    await userEvent.click(screen.getByRole("button", { name: "نمایش" }));

    const region = screen.getByRole("region", { name: REGION_NAME });
    const [toast] = toasts();
    expect(region).toContainElement(toast!);
    expect(toast).toHaveAttribute("data-tone", "success");
    expect(toast).toHaveClass("rounded-2xl", "bg-white", "shadow-elevated");
    expect(within(toast!).getByText("ذخیره شد 1")).toHaveAttribute("data-slot", "toast-title");
    expect(within(toast!).getByText("تغییرات ذخیره شد.")).toBeInTheDocument();
  });

  it.each([
    ["info", "text-blue-600", "bg-blue-500"],
    ["success", "text-green-600", "bg-green-500"],
    ["warning", "text-amber-600", "bg-amber-500"],
    ["danger", "text-red-600", "bg-red-500"],
  ] as const)("colours the %s tone's icon and progress bar", async (tone, icon, bar) => {
    render(<Harness options={{ tone }} />);

    await userEvent.click(screen.getByRole("button", { name: "نمایش" }));

    const [toast] = toasts();
    expect(toast!.querySelector('[data-slot="toast-icon"]')).toHaveClass(icon);
    expect(toast!.querySelector('[data-slot="toast-progress"]')).toHaveClass(bar);
  });

  it("defaults to the info tone", async () => {
    render(<Harness />);

    await userEvent.click(screen.getByRole("button", { name: "نمایش" }));

    expect(toasts()[0]).toHaveAttribute("data-tone", "info");
  });

  it("closes from its close button", async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole("button", { name: "نمایش" }));

    await userEvent.click(screen.getByRole("button", { name: "بستن" }));

    expect(toasts()).toHaveLength(0);
  });

  it("runs the action and closes", async () => {
    const onClick = vi.fn();
    render(
      <Harness
        options={{
          action: { label: "بازگردانی", altText: "از صفحه سطل زباله بازگردانید", onClick },
        }}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "نمایش" }));

    await userEvent.click(screen.getByRole("button", { name: "بازگردانی" }));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(toasts()).toHaveLength(0);
  });

  it("closes on its own after the duration", async () => {
    // Long enough that an awaited click cannot outlast it on a loaded machine, which would close
    // the toast before the "it is showing" assertion below and fail for the wrong reason.
    render(<Harness duration={300} />);

    await userEvent.click(screen.getByRole("button", { name: "نمایش" }));

    expect(toasts()).toHaveLength(1);
    await waitFor(() => expect(toasts()).toHaveLength(0));
  });

  it("stays open with an infinite duration and shows no progress bar", async () => {
    render(<Harness options={{ duration: Infinity }} />);

    await userEvent.click(screen.getByRole("button", { name: "نمایش" }));

    expect(toasts()[0]!.querySelector('[data-slot="toast-progress"]')).toBeNull();
  });

  it("pauses while hovered and resumes when the pointer leaves", async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole("button", { name: "نمایش" }));
    const [toast] = toasts();

    await userEvent.hover(toast!);
    expect(toast).toHaveAttribute("data-paused", "true");

    await userEvent.unhover(toast!);
    expect(toast).toHaveAttribute("data-paused", "false");
  });

  it("stacks toasts and keeps only the newest up to the limit", async () => {
    render(<Harness limit={2} />);
    const show = screen.getByRole("button", { name: "نمایش" });

    await userEvent.click(show);
    await userEvent.click(show);
    await userEvent.click(show);

    expect(
      toasts().map((toast) => toast.querySelector('[data-slot="toast-title"]')?.textContent),
    ).toEqual(["ذخیره شد 2", "ذخیره شد 3"]);
  });

  it("dismisses one toast by id or all of them", async () => {
    function Ids() {
      const { toast, dismiss } = useToast();
      return (
        <>
          <button
            type="button"
            onClick={() => {
              const first = toast({ title: "اول" });
              toast({ title: "دوم" });
              dismiss(first);
            }}
          >
            دو اعلان
          </button>
          <button type="button" onClick={() => dismiss()}>
            همه
          </button>
        </>
      );
    }
    render(
      <ToastProvider>
        <Ids />
      </ToastProvider>,
    );

    await userEvent.click(screen.getByRole("button", { name: "دو اعلان" }));
    expect(toasts().map((toast) => toast.textContent)).toEqual([expect.stringContaining("دوم")]);

    await userEvent.click(screen.getByRole("button", { name: "همه" }));
    expect(toasts()).toHaveLength(0);
  });

  it("places the region by direction and labels it from the dictionary", async () => {
    const { unmount } = render(<Harness />);
    expect(document.querySelector('[data-slot="toast-viewport"]')).toHaveAttribute("dir", "rtl");
    unmount();

    render(
      <AveroProvider locale="en-US">
        <Harness viewportClassName="pb-8" />
      </AveroProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "نمایش" }));

    const viewport = document.querySelector('[data-slot="toast-viewport"]');
    expect(viewport).toHaveAttribute("dir", "ltr");
    expect(viewport).toHaveClass("z-(--z-toast)", "min-[30rem]:w-96", "pb-8");
    expect(screen.getByRole("region", { name: /Notifications/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("throws a clear error outside a provider", () => {
    const consoleError = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(() => render(<Trigger />)).toThrow("useToast must be used inside a ToastProvider.");

    consoleError.mockRestore();
  });

  it("renders its children on the server", () => {
    const html = renderToString(<Harness />);

    expect(html).toContain("نمایش");
    expect(html).not.toContain('data-slot="toast"');
  });

  it("has no accessibility violations with toasts open", async () => {
    render(
      <Harness
        options={{
          tone: "danger",
          action: { label: "تلاش دوباره", altText: "تلاش دوباره", onClick: () => {} },
        }}
      />,
    );
    await userEvent.click(screen.getByRole("button", { name: "نمایش" }));

    await expectNoAxeViolations(screen.getByRole("region", { name: REGION_NAME }));
  });
});
