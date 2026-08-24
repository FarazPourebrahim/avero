import { fireEvent, render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { createRef, useState, type ReactNode } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { AveroProvider } from "../../i18n/AveroProvider.js";
import { expectNoAxeViolations } from "../../test/axe.js";
import { Field, FieldControl, FieldLabel } from "../field/Field.js";
import { FileInput } from "./FileInput.js";

const MB = 1024 * 1024;

function makeFile(name: string, type: string, size = 1024): File {
  const file = new File(["x"], name, { type });
  Object.defineProperty(file, "size", { value: size });
  return file;
}

function inEnglish(children: ReactNode) {
  return <AveroProvider locale="en-US">{children}</AveroProvider>;
}

function control(): HTMLInputElement {
  return document.querySelector("[data-slot='file-input-control']") as HTMLInputElement;
}

function dropzone(): HTMLElement {
  return document.querySelector("[data-slot='file-input-dropzone']") as HTMLElement;
}

function listedNames(): string[] {
  return [...document.querySelectorAll("[data-slot='file-input-item']")].map(
    (item) => item.querySelector("span[dir='auto']")?.textContent ?? "",
  );
}

describe("FileInput", () => {
  it("renders a drop area whose title names the hidden file input", () => {
    render(inEnglish(<FileInput maxSize={2 * MB} accept=".pdf" />));
    const input = control();

    expect(input).toHaveAttribute("type", "file");
    expect(input).toHaveAttribute("accept", ".pdf");
    expect(input).toHaveClass("sr-only");
    expect(input).toHaveAccessibleName("Drop a file here or click to browse");
    expect(input).toHaveAccessibleDescription("Up to 2 MB per file");
    expect(screen.queryByRole("list")).toBeNull();
  });

  it("opens the file picker when the drop area is clicked", async () => {
    render(<FileInput />);
    const click = vi.spyOn(control(), "click");

    await userEvent.click(dropzone());

    expect(click).toHaveBeenCalledTimes(1);
  });

  it("lists a chosen file with its size and reports it", async () => {
    const onValueChange = vi.fn();
    const report = makeFile("report.pdf", "application/pdf", 2 * MB);
    render(inEnglish(<FileInput onValueChange={onValueChange} />));

    await userEvent.upload(control(), report);

    expect(onValueChange).toHaveBeenCalledWith([report]);
    expect(listedNames()).toEqual(["report.pdf"]);
    expect(screen.getByRole("listitem")).toHaveTextContent("2 MB");
  });

  it("replaces the file when only one is allowed", async () => {
    render(<FileInput />);

    await userEvent.upload(control(), makeFile("a.pdf", "application/pdf"));
    await userEvent.upload(control(), makeFile("b.pdf", "application/pdf"));

    expect(listedNames()).toEqual(["b.pdf"]);
  });

  it("appends files when multiple and rejects those past the limit", async () => {
    const onReject = vi.fn();
    const extra = makeFile("c.png", "image/png");
    render(inEnglish(<FileInput multiple maxFiles={2} onReject={onReject} />));

    await userEvent.upload(control(), [makeFile("a.png", "image/png")]);
    await userEvent.upload(control(), [makeFile("b.png", "image/png"), extra]);

    expect(listedNames()).toEqual(["a.png", "b.png"]);
    expect(onReject).toHaveBeenCalledWith([{ file: extra, reason: "count" }]);
    expect(screen.getByRole("alert")).toHaveTextContent("You can choose up to 2 files.");
  });

  it("rejects files of the wrong type and keeps the valid ones", async () => {
    const user = userEvent.setup({ applyAccept: false });
    const onReject = vi.fn();
    const script = makeFile("run.exe", "application/x-msdownload");
    render(inEnglish(<FileInput multiple accept="image/*,.pdf" onReject={onReject} />));

    await user.upload(control(), [
      makeFile("photo.JPG", "image/jpeg"),
      script,
      makeFile("notes.pdf", ""),
    ]);

    expect(listedNames()).toEqual(["photo.JPG", "notes.pdf"]);
    expect(onReject).toHaveBeenCalledWith([{ file: script, reason: "type" }]);
    expect(screen.getByRole("alert")).toHaveTextContent("“run.exe” isn't an accepted file type.");
    expect(control()).toHaveAttribute("aria-invalid", "true");
    expect(control()).toHaveAccessibleDescription("“run.exe” isn't an accepted file type.");
    expect(dropzone()).toHaveAttribute("data-invalid");
  });

  it("matches exact MIME types", async () => {
    const user = userEvent.setup({ applyAccept: false });
    render(<FileInput accept="application/pdf" />);

    await user.upload(control(), makeFile("image.png", "image/png"));
    expect(listedNames()).toEqual([]);

    await user.upload(control(), makeFile("doc.pdf", "application/pdf"));
    expect(listedNames()).toEqual(["doc.pdf"]);
    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("rejects files over the size limit", async () => {
    const onReject = vi.fn();
    const video = makeFile("video.mp4", "video/mp4", 3 * MB);
    render(inEnglish(<FileInput maxSize={MB} onReject={onReject} />));

    await userEvent.upload(control(), video);

    expect(listedNames()).toEqual([]);
    expect(onReject).toHaveBeenCalledWith([{ file: video, reason: "size" }]);
    expect(screen.getByRole("alert")).toHaveTextContent("“video.mp4” is larger than 1 MB.");
  });

  it("removes a file and returns focus to the input", async () => {
    const onValueChange = vi.fn();
    const a = makeFile("a.png", "image/png");
    const b = makeFile("b.png", "image/png");
    render(inEnglish(<FileInput multiple defaultValue={[a, b]} onValueChange={onValueChange} />));

    await userEvent.click(screen.getByRole("button", { name: "Remove a.png" }));

    expect(onValueChange).toHaveBeenCalledWith([b]);
    expect(listedNames()).toEqual(["b.png"]);
    expect(control()).toHaveFocus();
  });

  it("clears the error when a file is removed", async () => {
    render(
      inEnglish(
        <FileInput multiple maxFiles={1} defaultValue={[makeFile("a.png", "image/png")]} />,
      ),
    );

    await userEvent.upload(control(), [makeFile("b.png", "image/png")]);
    expect(screen.getByRole("alert")).toBeInTheDocument();

    await userEvent.click(screen.getByRole("button", { name: "Remove a.png" }));

    expect(screen.queryByRole("alert")).toBeNull();
  });

  it("accepts dropped files and marks the drop area while dragging", () => {
    const onValueChange = vi.fn();
    const photo = makeFile("photo.png", "image/png");
    render(<FileInput onValueChange={onValueChange} />);
    const zone = dropzone();

    fireEvent.dragOver(zone);
    expect(zone).toHaveAttribute("data-dragging");

    fireEvent.dragLeave(zone, { relatedTarget: document.body });
    expect(zone).not.toHaveAttribute("data-dragging");

    fireEvent.dragOver(zone);
    fireEvent.drop(zone, { dataTransfer: { files: [photo] } });

    expect(zone).not.toHaveAttribute("data-dragging");
    expect(onValueChange).toHaveBeenCalledWith([photo]);
  });

  it("ignores picks and drops while disabled", async () => {
    const onValueChange = vi.fn();
    render(<FileInput disabled onValueChange={onValueChange} />);
    const zone = dropzone();

    await userEvent.upload(control(), makeFile("a.png", "image/png"));
    fireEvent.dragOver(zone);
    fireEvent.drop(zone, { dataTransfer: { files: [makeFile("b.png", "image/png")] } });

    expect(control()).toBeDisabled();
    expect(zone).not.toHaveAttribute("data-dragging");
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("follows the parent when controlled", async () => {
    function Controlled() {
      const [files, setFiles] = useState<File[]>([]);
      return (
        <>
          <FileInput multiple value={files} onValueChange={setFiles} />
          <output>{files.length}</output>
        </>
      );
    }
    render(<Controlled />);

    await userEvent.upload(control(), [
      makeFile("a.png", "image/png"),
      makeFile("b.png", "image/png"),
    ]);

    expect(screen.getByRole("status")).toHaveTextContent("2");
    expect(listedNames()).toEqual(["a.png", "b.png"]);
  });

  it("uses a custom title and hint", () => {
    render(<FileInput title="تصویر پروفایل" hint="PNG یا JPG" />);

    expect(control()).toHaveAccessibleName("تصویر پروفایل");
    expect(control()).toHaveAccessibleDescription("PNG یا JPG");
  });

  it("shows sizes in Persian digits by default", async () => {
    render(<FileInput />);

    await userEvent.upload(control(), makeFile("سند.pdf", "application/pdf", 2 * MB));

    expect(screen.getByRole("listitem").textContent).toMatch(/۲/);
    expect(screen.getByRole("button", { name: "حذف سند.pdf" })).toBeInTheDocument();
  });

  it("is labelled through Field instead of its title", () => {
    render(
      <Field invalid>
        <FieldLabel>مدارک</FieldLabel>
        <FieldControl>
          <FileInput />
        </FieldControl>
      </Field>,
    );

    expect(control()).toHaveAccessibleName("مدارک");
    expect(control()).not.toHaveAttribute("aria-labelledby");
    expect(control()).toHaveAttribute("aria-invalid", "true");
    expect(dropzone()).toHaveAttribute("data-invalid");
  });

  it("forwards refs to the file input and composes onChange", async () => {
    const ref = createRef<HTMLInputElement>();
    const onChange = vi.fn();
    render(<FileInput ref={ref} onChange={onChange} />);

    await userEvent.upload(control(), makeFile("a.png", "image/png"));

    expect(ref.current).toBe(control());
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("renders on the server", () => {
    const html = renderToString(<FileInput maxSize={MB} />);

    expect(html).toContain('data-slot="file-input-dropzone"');
    expect(html).toContain('type="file"');
  });

  it("has no accessibility violations with files and an error", async () => {
    const { container } = render(
      <FileInput
        multiple
        maxFiles={1}
        maxSize={MB}
        defaultValue={[makeFile("a.png", "image/png")]}
      />,
    );

    await userEvent.upload(control(), [makeFile("b.png", "image/png")]);

    await expectNoAxeViolations(container);
  });
});
