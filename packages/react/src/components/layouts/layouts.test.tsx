import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { expectNoAxeViolations } from "../../test/axe.js";
import {
  ArticleLayout,
  DetailLayout,
  ListingLayout,
  ProfileLayout,
  SplitDetailLayout,
} from "./Layouts.js";

describe("ArticleLayout", () => {
  it("renders an 8/4 grid with a sticky aside", () => {
    const { container } = render(
      <ArticleLayout aside={<nav aria-label="فهرست">فهرست</nav>} asideLabel="ستون کناری">
        <article>مقاله</article>
      </ArticleLayout>,
    );

    expect(screen.getByRole("main")).toHaveAttribute("data-slot", "article-layout");
    expect(screen.getByRole("main").firstElementChild).toHaveClass("lg:grid-cols-12", "max-w-7xl");
    expect(container.querySelector('[data-slot="article-layout-aside"]')).toHaveClass(
      "lg:col-span-4",
      "lg:sticky",
      "lg:top-28",
    );
    expect(screen.getByRole("complementary", { name: "ستون کناری" })).toBeInTheDocument();
  });

  it("omits the aside when it is not given", () => {
    const { container } = render(<ArticleLayout>مقاله</ArticleLayout>);

    expect(container.querySelector('[data-slot="article-layout-aside"]')).toBeNull();
  });
});

describe("DetailLayout", () => {
  it("renders an 8/4 grid with the aside sticky at top-24", () => {
    const { container } = render(
      <DetailLayout aside={<div>قیمت</div>} asideLabel="اطلاعات">
        <div>توضیحات</div>
      </DetailLayout>,
    );

    expect(container.querySelector('[data-slot="detail-layout-aside"]')).toHaveClass(
      "lg:top-24",
      "lg:col-span-4",
    );
  });
});

describe("ListingLayout", () => {
  it("renders sticky filters beside the results", () => {
    const { container } = render(
      <ListingLayout
        header={<h1>همه دوره‌ها</h1>}
        aside={<form>فیلترها</form>}
        asideLabel="فیلترها"
      >
        <ul>
          <li>نتیجه</li>
        </ul>
      </ListingLayout>,
    );

    expect(screen.getByRole("heading", { name: "همه دوره‌ها" })).toBeInTheDocument();
    expect(container.querySelector('[data-slot="listing-layout-aside"]')).toHaveClass(
      "md:col-span-3",
      "md:sticky",
      "md:top-10",
    );
    expect(container.querySelector("section")).toHaveClass("md:col-span-9");
  });

  it("gives the results the full width without filters", () => {
    const { container } = render(<ListingLayout>نتایج</ListingLayout>);

    expect(container.querySelector("section")).toHaveClass("md:col-span-12");
  });
});

describe("SplitDetailLayout", () => {
  it("swaps the order so the content leads on phones", () => {
    const { container } = render(
      <SplitDetailLayout aside={<div>بنر</div>} asideLabel="کناری">
        <div>کارگاه</div>
      </SplitDetailLayout>,
    );

    expect(container.querySelector('[data-slot="split-detail-layout-aside"]')).toHaveClass(
      "order-2",
      "lg:order-1",
    );
    expect(screen.getByText("کارگاه").parentElement).toHaveClass("order-1", "lg:order-2");
  });
});

describe("ProfileLayout", () => {
  it("stacks full-width sections in a 12-column grid", () => {
    render(
      <ProfileLayout>
        <section>هدر پروفایل</section>
      </ProfileLayout>,
    );

    expect(screen.getByRole("main")).toHaveClass("py-6", "md:py-10");
    expect(screen.getByRole("main").firstElementChild).toHaveClass("grid-cols-12");
  });
});

describe("layout templates", () => {
  it("forward refs to the main landmark", () => {
    const ref = createRef<HTMLElement>();
    render(<ArticleLayout ref={ref}>x</ArticleLayout>);

    expect(ref.current?.tagName).toBe("MAIN");
  });

  it("render on the server", () => {
    expect(renderToString(<DetailLayout aside={<span>a</span>}>b</DetailLayout>)).toContain(
      "<main",
    );
  });

  it("have no accessibility violations", async () => {
    const { container } = render(
      <ArticleLayout aside={<nav aria-label="فهرست">فهرست</nav>}>
        <h1>عنوان</h1>
      </ArticleLayout>,
    );

    await expectNoAxeViolations(container);
  });
});
