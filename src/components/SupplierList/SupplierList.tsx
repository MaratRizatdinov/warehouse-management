// src/components/SuppliersList.tsx
import React, { useState } from "react";
import { useGetSuppliersQuery } from "../../services/api";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  //   Box,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Supplier } from "../../types/supplierTypes";
import FilterHeader from "../FilterHeader/FilterHeader";

interface SuppliersListProps {
  onEdit: (supplier: Supplier) => void;
  onDelete: (id: number) => void;
}

const SuppliersList: React.FC<SuppliersListProps> = ({ onEdit, onDelete }) => {
  const [filters, setFilters] = useState({ field: "", value: "" });
    
  const {
    data: suppliers = [],
    error,
    isLoading,
  } = useGetSuppliersQuery(filters);

  const handleFilterChange = (field: string, value: string) => {
    setFilters({ field, value });
  };

  if (isLoading) return <Typography>Загрузка...</Typography>;
  if (error) return <Typography>Ошибка при загрузке данных</Typography>;

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <FilterHeader
              label="Название"
              onFilter={(value) => handleFilterChange("name", value)}
            />
            <FilterHeader
              label="Контактное лицо"
              onFilter={(value) => handleFilterChange("contact", value)}
            />
            <FilterHeader
              label="Телефон"
              onFilter={(value) => handleFilterChange("phone", value)}
            />
            <TableCell align="center">Действия</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {suppliers.length > 0 ? (
            suppliers.map((supplier: Supplier) => (
              <TableRow key={supplier.id}>
                <TableCell>{supplier.id}</TableCell>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.contact}</TableCell>
                <TableCell>{supplier.phone}</TableCell>
                <TableCell align="center">
                  <IconButton color="primary" onClick={() => onEdit(supplier)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => onDelete(supplier.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                Нет данных для отображения
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SuppliersList;
