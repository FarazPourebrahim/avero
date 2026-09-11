import { List, ListItem } from "@avero/react";

export default function ListNestedDemo() {
  return (
    <div className="max-w-xl text-base leading-8 text-gray-700">
      <List ordered>
        <ListItem>
          پیش از شروع
          <List>
            <ListItem>نصب ابزارها</ListItem>
            <ListItem>ساختن حساب کاربری</ListItem>
          </List>
        </ListItem>
        <ListItem>
          هفته اول
          <List>
            <ListItem>تماشای سه جلسه نخست</ListItem>
            <ListItem>تحویل تمرین ۱</ListItem>
          </List>
        </ListItem>
      </List>
    </div>
  );
}
