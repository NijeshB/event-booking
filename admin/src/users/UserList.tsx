import {
  List,
  Datagrid,
  TextField,
  EmailField,
  EditButton,
  DateField,
  DeleteButton,
} from "react-admin";

export const UserList = () => (
  <List>
    <Datagrid>
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="mobile" />
      <EmailField source="email" />
      <TextField source="role" />
      {/* <CustomDeleteButton /> */}
      <DateField label="Created Date" source="createdAt" />
      <EditButton />
      <DeleteButton />
    </Datagrid>
  </List>
);
