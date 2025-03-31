/*
import {
  Button,
  DeleteButton,
  useNotify,
  useRecordContext,
  useDataProvider,
} from "react-admin";
import { FC } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRedirect } from "react-admin";

interface CustomDeleteButtonProps {
  record?: { id: number }; // Ensure record is typed properly
}

const CustomDeleteButtonOld: FC<CustomDeleteButtonProps> = () => {
  const record = useRecordContext(); // ✅ Use React-Admin’s built-in hook

  const notify = useNotify();

  if (!record || !record.id) return null; // Ensure record exists before rendering

  return (
    <DeleteButton
      record={record}
      mutationOptions={{
        onSuccess: () =>
          notify("User deleted successfully", { type: "success" }),
        onError: (error: unknown) => {
          if (error instanceof Error) {
            notify(`Error: ${error.message}`, { type: "error" });
          } else {
            notify("An unexpected error occurred", { type: "error" });
          }
        },
      }}
    />
  );
};

interface CustomDeleteButtonProps {
  resource: string; // Define the type for resource
}

const CustomDeleteButton: FC<CustomDeleteButtonProps> = ({ resource }) => {
  const notify = useNotify();
  const dataProvider = useDataProvider();
  const record = useRecordContext();

  const redirect = useRedirect();

  const handleDelete = async () => {
    const id = record?.id;
    console.log("🚀 Manually Triggering DELETE:", { resource, id });

    try {
      await dataProvider.deleteOne(resource, { id });
      notify("User deleted successfully", { type: "success" });
      redirect("list", "/users"); // Redirect after deletion
    } catch (error) {
      console.error("❌ DELETE failed:", error);
      notify("Delete failed", { type: "error" });
    }
  };

  return (
    <Button
      variant="contained"
      color="error"
      startIcon={<DeleteIcon />}
      onClick={handleDelete}
    />
  );
};

*/

import {
  Button,
  useNotify,
  useRedirect,
  useDataProvider,
  useRecordContext,
  useRefresh,
  useListContext,
} from "react-admin";
import DeleteIcon from "@mui/icons-material/Delete";

const CustomDeleteButton = () => {
  const record = useRecordContext();
  const notify = useNotify();
  const dataProvider = useDataProvider(); // Direct API call
  const { refetch } = useListContext(); // Only refresh the list, not the whole page

  if (!record) return null;

  const handleDelete = async () => {
    try {
      await dataProvider.delete("users", { id: record.id }); // Call API directly
      notify("Event deleted successfully", { type: "success" });
      refetch(); // Refresh the list instead of redirecting
    } catch (error: any) {
      notify(`Error: ${error.message}`, { type: "error" });
    }
  };

  return (
    <Button label="Delete" onClick={handleDelete}>
      <DeleteIcon />
    </Button>
  );
};

export default CustomDeleteButton;
