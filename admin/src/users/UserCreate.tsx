import {
  Create,
  SimpleForm,
  TextInput,
  SelectInput,
  PasswordInput,
} from "react-admin";

export const UserCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="name" />
      <TextInput source="mobile" />
      <TextInput source="email" />
      <SelectInput
        source="role"
        choices={[
          { id: "admin", name: "Admin" },
          { id: "user", name: "User" },
        ]}
      />
      <PasswordInput source="password" />
    </SimpleForm>
  </Create>
);
