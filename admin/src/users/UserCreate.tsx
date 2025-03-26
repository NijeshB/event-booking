import { Create, SimpleForm, TextInput, SelectInput } from "react-admin";

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
      <SelectInput
        source="role"
        choices={[
          { id: "admin", name: "Admin" },
          { id: "user", name: "User" },
        ]}
      />
    </SimpleForm>
  </Create>
);
