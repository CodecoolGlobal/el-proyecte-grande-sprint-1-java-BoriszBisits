import React, {useState} from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import {useParams, Link} from 'react-router-dom';
import Container from '@mui/material/Container';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate(); // Initialize navigate from react-router-dom

    const handleLogin = (e) => {
        e.preventDefault();

        const data = {
            name: username, password: password
        };

        fetch(`/api/v1/auth/authenticate`, {
            method: 'POST', headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify(data),
        })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error('Failed to fetch data');
                }
            })
            .then((data) => {
                localStorage.setItem('token', data.token);
                localStorage.setItem('username', username)
                setToken(data.token);
                setIsLoggedIn(true);

                // Use navigate to navigate to "/project-list" on successful login
                navigate('/project-list');
            })
            .catch((error) => {
                alert('Authentication failed. Please check your credentials.');
                console.error(error);
            });
    };

    return (
        <Container style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh'
    }}>
        <Typography variant="h4" style={{marginBottom: '15px'}}>Login</Typography>
        <Typography variant="subtitle1" style={{marginBottom: '30px'}}>Don't have an account? <Link
            to={`/registration`}>Register</Link></Typography>
        {!isLoggedIn ? (<form onSubmit={handleLogin}
                              style={{width: '300px', display: 'flex', flexDirection: 'column', gap: '16px'}}>
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
                style={{marginTop: '16px'}}
            >
                Login
            </Button>
        </form>) : null}
    </Container>);
}

export default Login;
