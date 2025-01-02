import React from "react";
import { useNavigate } from "react-router-dom";
import { List, ListItem, ListItemText, Typography, Box, Button } from "@mui/material";

const DirectoriesPage: React.FC = () => {
  const navigate = useNavigate();

  const directories = [
    { name: "Поставщики", path: "/directories/suppliers" },
    { name: "Покупатели", path: "/directories/customers" },
    { name: "Склады", path: "/directories/warehouses" },
    { name: "Товары", path: "/directories/products" },
  ];

  const handleDirectoryClick = (path: string) => {
    navigate(path);
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Справочники
      </Typography>
      <List>
        {directories.map((directory) => (
          <ListItem
            component="button" // Указываем, что это кнопка
            key={directory.name}
            onClick={() => handleDirectoryClick(directory.path)}
            sx={{
              textAlign: "left",
              padding: 2,
              border: "1px solid #ddd",
              borderRadius: "8px",
              marginBottom: "8px",
              backgroundColor: "#fff",
              cursor: "pointer",
              transition: "background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "#f0f0f0",
              },
            }}
          >
            <ListItemText primary={directory.name} />
          </ListItem>
        ))}
      </List>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/")}
        sx={{ marginTop: "auto", alignSelf: "center" }}
      >
        На главную
      </Button>
    </Box>
  );
};

export default DirectoriesPage;
