import {
  Button,
  ConfirmDialog,
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
  Lightbox,
  Popover,
  PopoverContent,
  PopoverTrigger,
  ToastProvider,
  Tooltip,
  useToast,
  type LightboxImage,
} from "@avero/react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

// Used by tests/overlays.spec.ts, the Phase 6 exit gate: one page with every overlay, each opened
// in turn, plus a popover inside a drawer and a toast raised from a dialog to check stacking.

const IMAGES: LightboxImage[] = [
  {
    src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 5'><rect width='8' height='5'/></svg>",
    alt: "Sample image one",
  },
  {
    src: "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 5 8'><rect width='5' height='8'/></svg>",
    alt: "Sample image two",
  },
];

function ToastButton({ testId }: { testId: string }) {
  const { toast } = useToast();
  return (
    <Button
      data-testid={testId}
      variant="outline"
      onClick={() => toast({ tone: "success", title: "Saved", duration: Infinity })}
    >
      Toast
    </Button>
  );
}

function FilterPopover({ testId }: { testId: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button data-testid={testId} variant="outline">
          Popover
        </Button>
      </PopoverTrigger>
      <PopoverContent aria-label="Filters">Filter options</PopoverContent>
    </Popover>
  );
}

function OverlayStackPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <ToastProvider>
      <div className="flex flex-wrap gap-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button data-testid="dialog-trigger">Dialog</Button>
          </DialogTrigger>
          <DialogContent aria-describedby={undefined}>
            <DialogHeader>
              <DialogTitle>Dialog</DialogTitle>
            </DialogHeader>
            <DialogBody className="flex gap-3">
              <ToastButton testId="dialog-toast-trigger" />
            </DialogBody>
          </DialogContent>
        </Dialog>
        <ConfirmDialog
          trigger={<Button data-testid="confirm-trigger">Confirm dialog</Button>}
          title="Delete this course?"
          onConfirm={() => {}}
        />
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
            <DrawerBody>
              <FilterPopover testId="drawer-popover-trigger" />
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <FilterPopover testId="popover-trigger" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button data-testid="menu-trigger" variant="outline">
              Menu
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem tone="danger">Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Tooltip content="Copies the link">
          <Button data-testid="tooltip-trigger" variant="ghost">
            Tooltip
          </Button>
        </Tooltip>
        <ToastButton testId="toast-trigger" />
        <Button
          data-testid="lightbox-trigger"
          variant="outline"
          onClick={() => setLightboxOpen(true)}
        >
          Lightbox
        </Button>
        <Lightbox images={IMAGES} open={lightboxOpen} onOpenChange={setLightboxOpen} />
      </div>
    </ToastProvider>
  );
}

const meta = {
  title: "Internal/Overlay Stack",
  component: OverlayStackPage,
  tags: ["!autodocs"],
} satisfies Meta<typeof OverlayStackPage>;

export default meta;

export const Default: StoryObj<typeof meta> = {};
