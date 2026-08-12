import type { Meta, StoryObj } from "@storybook/react-vite";
import { Calendar, Clock, Eye, Globe, Mail, MapPin, Phone, Star, User } from "lucide-react";
import {
  CalendarSolidIcon,
  ClockSolidIcon,
  EyeSolidIcon,
} from "../../icons/publicIcons.js";
import { ContactMethod, KeyValueRow, MetaBar, MetaItem } from "./Meta.js";

const meta: Meta = {
  title: "Data display/Meta",
  component: MetaItem,
};

export default meta;
type Story = StoryObj;

export const ArticleMeta: Story = {
  render: () => (
    <MetaBar className="max-w-2xl">
      <MetaItem icon={<CalendarSolidIcon size={14} className="text-gray-500" />} label="انتشار:">
        ۳ شهریور ۱۴۰۵
      </MetaItem>
      <MetaItem icon={<ClockSolidIcon size={14} className="text-gray-500" />} label="زمان مطالعه:">
        5 دقیقه
      </MetaItem>
      <MetaItem icon={<EyeSolidIcon size={14} className="text-gray-500" />} label="بازدید:">
        15
      </MetaItem>
    </MetaBar>
  ),
};

export const ProjectAndProfileMeta: Story = {
  render: () => (
    <div className="flex flex-col gap-6 rounded-3xl bg-white p-6">
      <MetaBar variant="row">
        <MetaItem variant="compact" icon={<MapPin className="size-6" />}>
          ایران
        </MetaItem>
        <MetaItem variant="compact" icon={<Clock className="size-6" />}>
          3 هفته
        </MetaItem>
        <MetaItem variant="compact" icon={<User className="size-6" />}>
          freelance
        </MetaItem>
        <MetaItem
          variant="compact"
          icon={<Calendar className="size-6" />}
          className="text-orange-400"
        >
          ۱۴۰۵/۷/۱۹
        </MetaItem>
      </MetaBar>
      <MetaBar variant="inline">
        <MetaItem variant="pill" icon={<MapPin className="text-blue-600" />}>
          تهران (ایران)
        </MetaItem>
        <MetaItem
          variant="compact"
          icon={<Calendar className="size-4 text-slate-400" />}
          className="gap-1 text-slate-500"
        >
          تاریخ عضویت: 2 هفته پیش
        </MetaItem>
      </MetaBar>
      <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
        <MetaItem variant="chip" icon={<Eye className="text-sky-500" />}>
          6 بازدید
        </MetaItem>
        <MetaItem variant="chip" icon={<Star className="fill-amber-400 text-amber-400" />}>
          امتیاز: 0.00
        </MetaItem>
      </div>
    </div>
  ),
};

export const Contacts: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-3 rounded-3xl bg-white p-6">
        <ContactMethod
          href="mailto:hello@example.com"
          icon={<Mail className="text-emerald-600" />}
          label="email:"
          value="hello@example.com"
        />
        <ContactMethod
          href="tel:09221257181"
          icon={<Phone className="text-indigo-600" />}
          label="phone:"
          value="۰۹۲۲۱۲۵۷۱۸۱"
        />
        <ContactMethod
          href="https://example.com"
          icon={<Globe className="text-teal-600" />}
          label="website:"
          value="example.com"
          external
        />
      </div>
      <div className="bg-background flex max-w-sm flex-col gap-y-7 p-6">
        <KeyValueRow label="ایمیل :" value="hello@example.com" href="mailto:hello@example.com" />
        <KeyValueRow label="شماره تماس :" value="09373860014" href="tel:09373860014" />
      </div>
    </div>
  ),
};
