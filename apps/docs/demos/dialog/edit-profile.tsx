"use client";

import {
  Button,
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldControl,
  FieldLabel,
  Input,
} from "@averoui/react";

export default function DialogEditProfileDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>ویرایش پروفایل</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>ویرایش پروفایل</DialogTitle>
          <DialogDescription>نام نمایشی شما در صفحه عمومی دیده می‌شود.</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <Field>
            <FieldLabel>نام نمایشی</FieldLabel>
            <FieldControl>
              <Input defaultValue="سارا محمدی" />
            </FieldControl>
          </Field>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">انصراف</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>ذخیره</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
