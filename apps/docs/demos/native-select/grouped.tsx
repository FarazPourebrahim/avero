import { NativeSelect } from "@averoui/react";

export default function NativeSelectGroupedDemo() {
  return (
    <NativeSelect aria-label="دسته‌بندی" defaultValue="ui">
      <optgroup label="طراحی">
        <option value="ui">طراحی رابط کاربری</option>
        <option value="motion">موشن گرافیک</option>
      </optgroup>
      <optgroup label="برنامه‌نویسی">
        <option value="web">برنامه‌نویسی وب</option>
        <option value="python">پایتون مقدماتی</option>
      </optgroup>
    </NativeSelect>
  );
}
