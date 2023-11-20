import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import HeaderBar from "../Components/HeaderBar";

function SuccessPage() {
  const location = useLocation();
  const message = location.state?.message || "Default success message";
  localStorage.setItem('token', null);
  localStorage.setItem('username', null)

  return (
    <Container>
      <HeaderBar />

      <Container maxWidth="sm" style={{ marginTop: "20px" }}>
        <Typography variant="h5">Success!</Typography>
        <Typography variant="body1">{message}</Typography>

        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          style={{ marginTop: "20px" }}
        >
          Login
        </Button>
      </Container>
    </Container>
  );
}

export default SuccessPage;
