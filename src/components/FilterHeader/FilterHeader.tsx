import {
    TableCell,
    // TableSortLabel,
    Menu,
    MenuItem,
    TextField,
    IconButton,
  } from "@mui/material";
  import FilterListIcon from "@mui/icons-material/FilterList";
import { useState } from "react";
  
  const FilterHeader: React.FC<{
    label: string;
    onFilter: (filter: string) => void;
  }> = ({ label, onFilter }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [search, setSearch] = useState("");
  
    const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      onFilter(e.target.value); // Обновляем фильтр
    };
  
    return (
      <TableCell>
        <IconButton onClick={handleOpen}>
          <FilterListIcon />
        </IconButton>
        {label}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem>
            <TextField
              value={search}
              onChange={handleSearchChange}
              placeholder="Поиск"
              fullWidth
            />
          </MenuItem>
        </Menu>
      </TableCell>
    );
  };
   export default FilterHeader