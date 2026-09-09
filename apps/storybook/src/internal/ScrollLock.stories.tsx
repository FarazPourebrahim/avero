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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@avero/react";
import type { Meta, StoryObj } from "@storybook/react-vite";

// Used by tests/scroll-lock.spec.ts: a page taller than the viewport, so there is a scrollbar for
// the overlays to hide, and two bars whose edges show any sideways shift. Every overlay here locks
// scrolling through react-remove-scroll, which is what D-22 compensates for.
function ScrollLockPage() {
  return (
    <div className="flex flex-col gap-4">
      {/* In flow: moves if the page itself is narrowed or offset while the scrollbar is hidden. */}
      <div data-testid="scroll-lock-bar" className="bg-primary h-10 w-full rounded-xl" />
      <div className="flex flex-wrap items-start gap-3">
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
        <div className="w-44">
          <Select>
            <SelectTrigger data-testid="select-trigger" aria-label="Category">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ui">Interface design</SelectItem>
              <SelectItem value="data">Data analysis</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button data-testid="menu-trigger" variant="outline">
              Menu
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="h-[300vh]" />
      {/* Fixed: sized to the viewport, so it widens the moment the scrollbar's space is given up. */}
      <div data-testid="scroll-lock-fixed" className="bg-secondary fixed inset-x-0 bottom-0 h-3" />
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
