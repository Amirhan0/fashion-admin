import React, { useState } from 'react';
import { Avatar, Button, TextField, Grid, Box, Typography, Container, CssBaseline } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const theme = createTheme();

function AdminLogin() {
  const navigate = useNavigate()
  const [emailAdmin, setEmail] = useState('');
  const [passwordAdmin, setPassword] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post("http://localhost:4000/api/admins", {
        emailAdmin: emailAdmin,
        passwordAdmin: passwordAdmin
      });
      console.log(response.data)
      navigate('/dashboard')
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Вход в админ панель
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Почта"
              name="email"
              autoComplete="email"
              autoFocus
              value={emailAdmin}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
              type="password"
              id="password"
              autoComplete="current-password"
              value={passwordAdmin}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }} 
            >
              Войти
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default AdminLogin;
