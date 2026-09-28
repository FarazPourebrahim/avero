import { render, screen, waitFor, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { useRef, useState } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { AveroProvider } from "../../i18n/AveroProvider.js";
import { fa } from "../../i18n/dictionaries.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import {
  ToastProvider,
  useToast,
  type ToastOptions,
  type ToastPromiseOptions,
  type ToastProviderProps,
} from "./Toast.js";

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

/** Starts a "sending" toast, then turns it into a result with `update`. */
function Sender({ result }: { result: Partial<ToastOptions> }) {
  const { toast, update } = useToast();
  const [id, setId] = useState<number | null>(null);
  return (
    <>
      <button
        type="button"
        onClick={() => setId(toast({ tone: "loading", title: "در حال ارسال…" }))}
      >
        ارسال
      </button>
      <button type="button" onClick={() => id !== null && update(id, result)}>
        نتیجه
      </button>
      <button type="button" onClick={() => update(999, { title: "ناشناخته" })}>
        شناسه نامعتبر
      </button>
    </>
  );
}

function PromiseSender<T>({
  pending,
  options,
  onSettled,
}: {
  pending: () => Promise<T>;
  options: ToastPromiseOptions<T>;
  onSettled?: (outcome: "resolved" | "rejected") => void;
}) {
  const { promise } = useToast();
  return (
    <button
      type="button"
      onClick={() => {
        promise(pending(), options).then(
          () => onSettled?.("resolved"),
          () => onSettled?.("rejected"),
        );
      }}
    >
      ارسال
    </button>
  );
}

function deferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason: Error) => void;
  const promise = new Promise<T>((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });
  return { promise, resolve, reject };
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

  it("shows a loading toast with a spinner that stays open and is announced politely", async () => {
    render(
      <ToastProvider duration={50}>
        <Sender result={{}} />
      </ToastProvider>,
    );

    await userEvent.click(screen.getByRole("button", { name: "ارسال" }));

    const [toast] = toasts();
    expect(toast).toHaveAttribute("data-tone", "loading");
    const icon = toast!.querySelector('[data-slot="toast-icon"]');
    expect(icon).toHaveClass("text-primary");
    expect(icon?.querySelector('[data-slot="spinner"]')).toHaveAttribute("aria-hidden", "true");
    expect(toast!.querySelector('[data-slot="toast-progress"]')).toBeNull();
    await waitFor(() =>
      expect(
        Array.from(document.querySelectorAll('[aria-live="polite"]')).some((node) =>
          node.textContent?.includes("در حال ارسال…"),
        ),
      ).toBe(true),
    );
    await new Promise((resolve) => setTimeout(resolve, 200));
    expect(toasts()).toHaveLength(1);
  });

  it("updates a loading toast in place into a timed success that closes on its own", async () => {
    render(
      <ToastProvider duration={300}>
        <Sender result={{ tone: "success", title: "ارسال شد" }} />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "ارسال" }));

    await userEvent.click(screen.getByRole("button", { name: "نتیجه" }));

    const [toast] = toasts();
    expect(toasts()).toHaveLength(1);
    expect(toast).toHaveAttribute("data-tone", "success");
    expect(toast).not.toHaveClass("data-[state=open]:animate-slide-up");
    expect(within(toast!).getByText("ارسال شد")).toBeInTheDocument();
    expect(toast!.querySelector('[data-slot="toast-progress"]')).toHaveClass("bg-green-500");
    await waitFor(() =>
      expect(
        Array.from(document.querySelectorAll('[aria-live="polite"]')).some((node) =>
          node.textContent?.includes("ارسال شد"),
        ),
      ).toBe(true),
    );
    await waitFor(() => expect(toasts()).toHaveLength(0));
  });

  it("announces an update to danger assertively", async () => {
    render(
      <ToastProvider>
        <Sender result={{ tone: "danger", title: "ارسال نشد" }} />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "ارسال" }));

    await userEvent.click(screen.getByRole("button", { name: "نتیجه" }));

    await waitFor(() =>
      expect(
        Array.from(document.querySelectorAll('[aria-live="assertive"]')).some((node) =>
          node.textContent?.includes("ارسال نشد"),
        ),
      ).toBe(true),
    );
  });

  it("still closes after an update made while the toast was hovered", async () => {
    render(
      <ToastProvider duration={300}>
        <Sender result={{ tone: "success", title: "ارسال شد" }} />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "ارسال" }));
    await userEvent.hover(toasts()[0]!);

    await userEvent.click(screen.getByRole("button", { name: "نتیجه" }));
    await userEvent.unhover(toasts()[0]!);

    await waitFor(() => expect(toasts()).toHaveLength(0));
  });

  it("ignores an update for a toast that is not open", async () => {
    render(
      <ToastProvider>
        <Sender result={{}} />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "ارسال" }));

    await userEvent.click(screen.getByRole("button", { name: "شناسه نامعتبر" }));

    expect(toasts()).toHaveLength(1);
    expect(screen.queryByText("ناشناخته")).toBeNull();
  });

  it("turns a promise into success with a message computed from its value", async () => {
    const { promise, resolve } = deferred<number>();
    const onSettled = vi.fn();
    render(
      <ToastProvider>
        <PromiseSender
          pending={() => promise}
          onSettled={onSettled}
          options={{
            loading: { title: "در حال ارسال…", description: "چند لحظه صبر کنید." },
            success: (count) => ({ title: `${count} پیام ارسال شد` }),
            error: { title: "ارسال نشد" },
          }}
        />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "ارسال" }));
    expect(toasts()[0]).toHaveAttribute("data-tone", "loading");

    resolve(3);

    await waitFor(() => expect(toasts()[0]).toHaveAttribute("data-tone", "success"));
    expect(within(toasts()[0]!).getByText("3 پیام ارسال شد")).toBeInTheDocument();
    expect(screen.queryByText("چند لحظه صبر کنید.")).toBeNull();
    expect(onSettled).toHaveBeenCalledWith("resolved");
  });

  it("turns a rejected promise into danger and passes the rejection on", async () => {
    const { promise, reject } = deferred<void>();
    const onSettled = vi.fn();
    render(
      <ToastProvider>
        <PromiseSender
          pending={() => promise}
          onSettled={onSettled}
          options={{
            loading: { title: "در حال ارسال…" },
            success: { title: "ارسال شد" },
            error: (error) => ({ title: (error as Error).message }),
          }}
        />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "ارسال" }));

    reject(new Error("اتصال قطع شد"));

    await waitFor(() => expect(toasts()[0]).toHaveAttribute("data-tone", "danger"));
    expect(within(toasts()[0]!).getByText("اتصال قطع شد")).toBeInTheDocument();
    expect(onSettled).toHaveBeenCalledWith("rejected");
  });
});
