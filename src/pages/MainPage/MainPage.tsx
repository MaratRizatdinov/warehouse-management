import React, { useState } from "react";
import { Modal, Box, Button } from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MainPage: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Открыть меню
      </Button>
      <Modal open={open} onClose={handleClose}>
        <StyledBox>
          <h2>Главное меню</h2>
          <Button variant="outlined" onClick={handleClose} fullWidth>
            Документы
          </Button>
          <Button variant="outlined" onClick={handleClose} fullWidth>
            Отчеты
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              handleClose(); // Закрываем модальное окно
              navigate("/directories"); // Переходим на страницу "Справочники"
            }}
            fullWidth
          >
            Справочники
          </Button>
        </StyledBox>
      </Modal>
    </div>
  );
};

const StyledBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  padding: 20px;
  background-color: white;
  box-shadow: 24px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export default MainPage;
