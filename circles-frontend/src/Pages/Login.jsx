import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';


function Login() {
    // State variables to store the username and password input values
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null)


    const handleLogin = (e) => {
        e.preventDefault();

        const data = {
         name : username,
         password : password
        };
        fetch(`/api/v1/auth/authenticate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then((res) => {
          if (res.ok) {
            res.json().then(data => {
              setToken(data.token)
              console.log("token " + token);
            });
          } else {
            console.error('Failed to fetch data');
          }
        });
    };
  



    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Typography variant="h4" style={{ marginBottom: '32px' }}>Login</Typography>
            <form onSubmit={handleLogin} style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <TextField
                    label="Username"
                    variant="outlined"
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '16px' }}
                >
                    Login
                </Button>
            </form>
        </div>
    );
}

export default Login;


