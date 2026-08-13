import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { Card } from "../../components/card/index.js";
import { cn } from "../../utils/cn.js";

/** Props specific to `ContactMethods`. It also accepts every native `<section>` attribute. */
export type ContactMethodsOwnProps = {
  /** Panel title, e.g. "راه‌های ارتباط با پشتیبانی". */
  title: ReactNode;
  /** Icon before the title. */
  icon?: ReactNode;
  /** Line under the title explaining what the channels are for. */
  description?: ReactNode;
  /** The channels, typically `ContactMethod` chips. */
  children: ReactNode;
  /** Heading level of the title. @defaultValue "h3" */
  titleAs?: "h2" | "h3" | "h4";
};

export type ContactMethodsProps = Omit<HTMLAttributes<HTMLElement>, keyof ContactMethodsOwnProps> &
  ContactMethodsOwnProps;

/**
 * Contact panel: a titled card holding contact channels, which wrap onto as many rows as they
 * need.
 */
export const ContactMethods = forwardRef<HTMLElement, ContactMethodsProps>(function ContactMethods(
  { title, icon, description, children, titleAs: Title = "h3", className, ...props },
  ref,
) {
  return (
    <Card
      asChild
      variant="surface"
      elevation="xs"
      padding="lg"
      className={cn("space-y-4", className)}
    >
      <section ref={ref} data-slot="contact-methods" {...props}>
        <Title className="flex items-center gap-2 text-lg font-black text-slate-900">
          {icon}
          {title}
        </Title>
        {description ? <p className="text-xs text-slate-500">{description}</p> : null}
        <div data-slot="contact-methods-list" className="flex flex-wrap gap-3 pt-2">
          {children}
        </div>
      </section>
    </Card>
  );
});

ContactMethods.displayName = "ContactMethods";
