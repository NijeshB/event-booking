import {
  Edit,
  SimpleForm,
  TextInput,
  SelectInput,
  Toolbar,
  SaveButton,
} from "react-admin";

import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRedirect } from "react-admin";

const CustomToolbar = () => {
  const redirect = useRedirect();

  return (
    <Toolbar>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => redirect("list", "users")}
        sx={{ marginRight: 2 }}
      >
        Back
      </Button>
      <SaveButton />
    </Toolbar>
  );
};

export const UserEdit = () => (
  <Edit>
    <SimpleForm toolbar={<CustomToolbar />}>
      <TextInput source="id" disabled />
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
  </Edit>
);
