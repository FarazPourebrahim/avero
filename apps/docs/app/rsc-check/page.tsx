import {
  Badge,
  Blockquote,
  Button,
  Card,
  CardHeader,
  CardTitle,
  Chip,
  Container,
  Divider,
  EmptyState,
  FeatureCard,
  Heading,
  IconTile,
  InfoRow,
  Input,
  KeyValueRow,
  Link,
  List,
  MiniStat,
  NativeSelect,
  RichContent,
  SectionHeader,
  SkeletonCard,
  StatCard,
  StatTile,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Text,
  Textarea,
  VisuallyHidden,
} from "@averoui/react";

/**
 * Phase 12 SSR/RSC check. This page is a React Server Component — it carries no `"use client"` and
 * uses no hooks — so every component it renders must be safe to import and render on the server.
 * If a server-safe module ever starts depending on client-only React, the docs build fails here
 * rather than in a consumer's application.
 */
export default function Page() {
  return (
    <Container as="main" className="flex flex-col gap-6 py-10">
      <SectionHeader title="Server component rendering" variant="accentBar" />
      <Heading as="h2">Primitives</Heading>
      <div className="flex flex-wrap items-center gap-3">
        <Button>دکمه</Button>
        <Badge tone="success">منتشر شده</Badge>
        <Chip variant="skill">React</Chip>
        <IconTile tone="blue" />
        <Link href="#main">پیوند</Link>
      </div>
      <Divider />

      <Heading as="h2">Text and prose</Heading>
      <Text>متن بدنه</Text>
      <Blockquote>نقل قول</Blockquote>
      <List>
        <li>یک</li>
        <li>دو</li>
      </List>
      <RichContent html="<p>محتوای ذخیره‌شده</p>" />
      <VisuallyHidden>برای صفحه‌خوان</VisuallyHidden>

      <Heading as="h2">Form controls</Heading>
      <Input placeholder="نام" />
      <Textarea placeholder="توضیح" />
      <NativeSelect>
        <option>یک</option>
      </NativeSelect>

      <Heading as="h2">Data display</Heading>
      <div className="grid gap-3 sm:grid-cols-2">
        <StatCard label="دوره‌ها" value="۱۲" />
        <StatTile label="بازدید" value="۳٬۴۰۰" />
        <MiniStat label="امتیاز" value="۴٫۸" />
        <InfoRow label="وضعیت" value="فعال" />
        <KeyValueRow label="ایمیل" value="hello@example.com" />
        <FeatureCard title="ویژگی" description="توضیح کوتاه" />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>کارت</CardTitle>
        </CardHeader>
      </Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>عنوان</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>مقدار</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <EmptyState title="چیزی اینجا نیست">هنوز موردی ثبت نشده است.</EmptyState>

      {/* Skeleton uses no hooks, so it stays server-safe; Spinner and AvatarGroup read the
          dictionary and are client components. */}
      <SkeletonCard footer />
    </Container>
  );
}
