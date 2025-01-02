import React, { useState } from "react";

import { Typography, Box, Button } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import SuppliersList from "../../components/SupplierList/SupplierList";
import { Supplier } from "../../types/supplierTypes";
import {
  useDeleteSupplierMutation,
  useUpdateSupplierMutation,
} from "../../services/api";
import AddSupplierForm from "../../components/AddSupplierForm/AddSupplierForm";

const SuppliersPage: React.FC = () => {
  const [isEditOpen, setEditOpen] = useState(false);
  const [currentSupplier, setCurrentSupplier] = useState<Supplier | null>(null);
  const [isDeleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isAddOpen, setAddOpen] = useState(false); // Состояние для модального окна добавления

  const [deleteSupplier] = useDeleteSupplierMutation();
  const [updateSupplier] = useUpdateSupplierMutation();

  const handleDelete = (id: number) => {
    setDeleteId(id);
    setDeleteOpen(true);
  };

  const confirmDelete = () => {
    if (deleteId !== null) {
      deleteSupplier(deleteId);
      setDeleteOpen(false);
      setDeleteId(null);
    }
  };

  const cancelDelete = () => {
    setDeleteOpen(false);
    setDeleteId(null);
  };

  const handleEdit = (supplier: Supplier) => {
    if (supplier) {
      setCurrentSupplier(supplier);
      setEditOpen(true);
    }
  };

  const handleSave = () => {
    if (currentSupplier) {
      updateSupplier(currentSupplier);
      setEditOpen(false);
    }
  };
  const handleAddOpen = () => {
    setAddOpen(true);
  };

  const handleAddClose = () => {
    setAddOpen(false);
  };

  return (
    <>
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Поставщики
        </Typography>
        <SuppliersList onEdit={handleEdit} onDelete={handleDelete} />
        <Box sx={{ marginTop: 3 }}>
          <Button variant="contained" color="primary" onClick={handleAddOpen}>
            Добавить поставщика
          </Button>
        </Box>
      </Box>
      <AddSupplierForm open={isAddOpen} onClose={handleAddClose} />
      <Dialog open={isEditOpen} onClose={() => setEditOpen(false)}>
        <DialogTitle>Редактирование поставщика</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Название"
            value={currentSupplier?.name || ""}
            onChange={(e) =>
              setCurrentSupplier({ ...currentSupplier!, name: e.target.value })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Контактное лицо"
            value={currentSupplier?.contact || ""}
            onChange={(e) =>
              setCurrentSupplier({
                ...currentSupplier!,
                contact: e.target.value,
              })
            }
            margin="normal"
          />
          <TextField
            fullWidth
            label="Телефон"
            value={currentSupplier?.phone || ""}
            onChange={(e) =>
              setCurrentSupplier({ ...currentSupplier!, phone: e.target.value })
            }
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)} color="secondary">
            Отмена
          </Button>
          <Button onClick={handleSave} color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={isDeleteOpen} onClose={cancelDelete}>
        <DialogTitle>Подтверждение удаления</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите удалить поставщика? Это действие нельзя
            отменить.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Отмена
          </Button>
          <Button onClick={confirmDelete} color="secondary">
            Удалить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SuppliersPage;
