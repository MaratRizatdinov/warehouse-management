// src/components/AddSupplierForm.tsx
import React, { useState } from 'react';
import { useAddSupplierMutation } from '../../services/api';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from '@mui/material';

const AddSupplierForm: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [newSupplier, setNewSupplier] = useState({ name: '', contact: '', phone: '' });
  const [addSupplier] = useAddSupplierMutation();

  const handleAddSupplier = async () => {
    await addSupplier(newSupplier);
    setNewSupplier({ name: '', contact: '', phone: '' }); // Сброс формы
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Добавление нового поставщика</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Название"
          value={newSupplier.name}
          onChange={(e) => setNewSupplier({ ...newSupplier, name: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Контактное лицо"
          value={newSupplier.contact}
          onChange={(e) => setNewSupplier({ ...newSupplier, contact: e.target.value })}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Телефон"
          value={newSupplier.phone}
          onChange={(e) => setNewSupplier({ ...newSupplier, phone: e.target.value })}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Отмена
        </Button>
        <Button onClick={handleAddSupplier} color="secondary">
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddSupplierForm;
