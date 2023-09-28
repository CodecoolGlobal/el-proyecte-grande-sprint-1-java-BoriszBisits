import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';


function Registration() {
    // State variables to store the username and password input values
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [token, setToken] = useState(null)



    const navigate = useNavigate();


    const handleRegistration = (e) => {
        e.preventDefault();

        if (password == passwordConfirm) {
            const data = {
                name: username,
                email: email,
                password: password
            };
            fetch(`/api/v1/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        throw new Error('Failed to fetch data');
                    }
                })
                .then((data) => {
                    setToken(data.token); // Set the 'token' here
                    console.log("token " + data.token); // Use data.token here

                    localStorage.setItem('token', data.token);
                    localStorage.setItem('username', username);
                    navigate('/');
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            alert("Passwords do not match. Please make sure the passwords match.")
        }


    };





    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Typography variant="h4" style={{ marginBottom: '32px' }}>Registration</Typography>
            <form onSubmit={handleRegistration} style={{ width: '300px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                    label="Email"
                    variant="outlined"
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                <TextField
                    label="Confirm password"
                    variant="outlined"
                    type="password"
                    id="password"
                    name="password-confirm"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    required
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '16px' }}
                >
                    Register
                </Button>
            </form>
        </div>
    );
}

export default Registration;