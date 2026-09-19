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
import { useCopy } from "../copy";

export default function DialogEditProfileDemo() {
  const t = useCopy({
    fa: {
      edit: "ویرایش پروفایل",
      description: "نام نمایشی شما در صفحه عمومی دیده می‌شود.",
      displayName: "نام نمایشی",
      name: "سارا محمدی",
      cancel: "انصراف",
      save: "ذخیره",
    },
    en: {
      edit: "Edit profile",
      description: "Your display name appears on your public page.",
      displayName: "Display name",
      name: "Sara Mohammadi",
      cancel: "Cancel",
      save: "Save",
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>{t.edit}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t.edit}</DialogTitle>
          <DialogDescription>{t.description}</DialogDescription>
        </DialogHeader>
        <DialogBody>
          <Field>
            <FieldLabel>{t.displayName}</FieldLabel>
            <FieldControl>
              <Input key={t.name} defaultValue={t.name} />
            </FieldControl>
          </Field>
        </DialogBody>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">{t.cancel}</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button>{t.save}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
