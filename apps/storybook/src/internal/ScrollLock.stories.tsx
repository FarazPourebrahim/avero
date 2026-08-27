import {
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@avero/react";
import type { Meta, StoryObj } from "@storybook/react-vite";

// Used by tests/scroll-lock.spec.ts: a page taller than the viewport, so there is a scrollbar for
// the overlays to hide, and a full-width bar whose edges show any sideways shift.
function ScrollLockPage() {
  return (
    <div className="flex flex-col gap-4">
      <div data-testid="scroll-lock-bar" className="bg-primary h-10 w-full rounded-xl" />
      <div className="flex gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button data-testid="dialog-trigger">Dialog</Button>
          </DialogTrigger>
          <DialogContent aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>Dialog</DialogTitle>
            </DialogHeader>
            <DialogBody>Content</DialogBody>
          </DialogContent>
        </Dialog>
        <Drawer>
          <DrawerTrigger asChild>
            <Button data-testid="drawer-trigger" variant="outline">
              Drawer
            </Button>
          </DrawerTrigger>
          <DrawerContent aria-describedby={undefined}>
            <DrawerHeader>
              <DrawerTitle>Drawer</DrawerTitle>
            </DrawerHeader>
            <DrawerBody>Content</DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
      <div className="h-[300vh]" />
    </div>
  );
}

const meta = {
  title: "Internal/Scroll Lock",
  component: ScrollLockPage,
  tags: ["!autodocs"],
} satisfies Meta<typeof ScrollLockPage>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
