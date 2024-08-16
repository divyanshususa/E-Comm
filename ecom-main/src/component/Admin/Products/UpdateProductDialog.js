import React, { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const UpdateProductDialog = ({
  open,
  handleClose,
  updateField,
  fieldToUpdate,
  label,
}) => {
  const [value, setValue] = useState("");

  const handleUpdate = () => {
    updateField(value);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{`Update ${label}`}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label={label}
          variant="outlined"
          type={fieldToUpdate === "quantity" ? "number" : "text"}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary" disabled={value === ""}>
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateProductDialog;
