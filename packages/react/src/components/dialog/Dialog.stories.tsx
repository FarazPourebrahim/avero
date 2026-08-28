import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button/Button.js";
import { Field, FieldControl, FieldDescription, FieldLabel } from "../field/Field.js";
import { Input } from "../input/Input.js";
import { Textarea } from "../textarea/Textarea.js";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog.js";

function EditProfile({ defaultOpen, size }: { defaultOpen?: boolean; size?: "sm" | "md" | "lg" }) {
  return (
    <Dialog defaultOpen={defaultOpen}>
      <DialogTrigger asChild>
        <Button>ویرایش پروفایل</Button>
      </DialogTrigger>
      <DialogContent size={size}>
        <DialogHeader>
          <DialogTitle>ویرایش پروفایل</DialogTitle>
          <DialogDescription>نام نمایشی و معرفی شما در صفحه عمومی دیده می‌شود.</DialogDescription>
        </DialogHeader>
        <DialogBody className="flex flex-col gap-4">
          <Field>
            <FieldLabel>نام نمایشی</FieldLabel>
            <FieldControl>
              <Input defaultValue="سارا محمدی" />
            </FieldControl>
          </Field>
          <Field>
            <FieldLabel>معرفی کوتاه</FieldLabel>
            <FieldControl>
              <Textarea defaultValue="طراح رابط کاربری و مدرس دوره‌های طراحی." />
            </FieldControl>
            <FieldDescription>حداکثر ۲۰۰ نویسه.</FieldDescription>
          </Field>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">انصراف</Button>
          </DialogClose>
          <Button>ذخیره تغییرات</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const meta = {
  title: "Overlays/Dialog",
  component: EditProfile,
} satisfies Meta<typeof EditProfile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {};

export const Open: Story = { args: { defaultOpen: true } };

export const Small: Story = { args: { defaultOpen: true, size: "sm" } };
