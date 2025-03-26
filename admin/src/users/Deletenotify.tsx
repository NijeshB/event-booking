import { DeleteButton, useNotify, useRecordContext } from "react-admin";
import { FC } from "react";

interface CustomDeleteButtonProps {
  record?: { id: number }; // Ensure record is typed properly
}

const CustomDeleteButton: FC<CustomDeleteButtonProps> = () => {
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

export default CustomDeleteButton;
