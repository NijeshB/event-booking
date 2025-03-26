import { List, Datagrid, TextField, EmailField, EditButton } from "react-admin";

import CustomDeleteButton from "./Deletenotify";
export const UserList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <EmailField source="email" />
      <TextField source="role" />
      <EditButton />
      <CustomDeleteButton />
    </Datagrid>
  </List>
);
