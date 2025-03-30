import {
  List,
  Datagrid,
  TextField,
  EmailField,
  EditButton,
  DateField,
} from "react-admin";

import CustomDeleteButton from "./Deletenotify";
export const UserList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="role" />
      <DateField label="Created Date" source="createdAt" />
      <EditButton />
      <CustomDeleteButton />
    </Datagrid>
  </List>
);
