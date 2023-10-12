import React, {useState} from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useNavigate} from 'react-router-dom';
import {useParams, Link} from 'react-router-dom';
import Container from '@mui/material/Container';
import {Grid, Paper, Box} from '@mui/material'

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const navigate = useNavigate();

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
                navigate('/project-list');
            })
            .catch((error) => {
                alert('Authentication failed. Please check your credentials.');
                console.error(error);
            });
    };

    return (<Container style={{height: '100vh', backgroundColor: '#f5f5f5', display: 'flex', alignItems: 'center'}}>
        <Grid container style={{height: '100%'}}>
            <Grid item xs={6} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Paper elevation={3} style={{
                    padding: '20px', maxWidth: '400px', width: '100%', background: '#fff', borderRadius: '8px'
                }}>
                    <Typography variant="h4" style={{marginBottom: '15px', color: '#333'}}>
                        Login
                    </Typography>
                    <Typography variant="subtitle1" style={{marginBottom: '30px', color: '#666'}}>
                        Don't have an account? <Link to={`/registration`} style={{
                        color: '#007BFF', textDecoration: 'none'
                    }}>Register</Link>
                    </Typography>
                    {!isLoggedIn ? (<form
                        onSubmit={handleLogin}
                        style={{
                            display: 'flex', flexDirection: 'column', gap: '16px',
                        }}
                    >
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
                        <Button type="submit" variant="contained" color="primary"
                                style={{marginTop: '16px', background: '#007BFF'}}>
                            Login
                        </Button>
                    </form>) : null}
                </Paper>
            </Grid>
            <Grid item xs={6} style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <Paper elevation={3} style={{
                    padding: '20px', maxWidth: '400px', width: '100%', background: '#fff', borderRadius: '8px'
                }}>
                    <Typography variant="h6" style={{color: '#333'}}>
                        WHAT IS CIRCLES?
                    </Typography>

                    <Typography variant="body1" style={{marginBottom: '15px', color: '#666'}}>
                        Circles is your go-to project manager app, specially designed to supercharge your time
                        management, productivity, and efficiency.
                    </Typography>

                    <Typography variant="h6" style={{color: '#333'}}>
                        Advantages:
                    </Typography>

                    <Typography variant="body1" style={{marginBottom: '15px', color: '#666'}}>
                        1. Easy Project Planning
                    </Typography>

                    <Typography variant="body1" style={{marginBottom: '15px', color: '#666'}}>
                        Simplify your project planning with our intuitive interface. Organize tasks, set priorities,
                        and track progress effortlessly.
                    </Typography>

                    <Typography variant="body1" style={{marginBottom: '15px', color: '#666'}}>
                        2. Modern & Minimalistic
                    </Typography>

                    <Typography variant="body1" style={{marginBottom: '15px', color: '#666'}}>
                        Enjoy a clean and minimalist interface that keeps your projects in focus. No more clutter,
                        just clarity.
                    </Typography>

                    <Typography variant="body1" style={{marginBottom: '15px', color: '#666'}}>
                        3. Project Customization
                    </Typography>

                    <Typography variant="body1" style={{marginBottom: '15px', color: '#666'}}>
                        Tailor Circles to your unique needs. Create custom templates, labels, and more for a
                        personalized experience.
                    </Typography>

                    <Typography variant="body1" style={{marginBottom: '15px', color: '#666'}}>
                        Discover a new level of project management with Circles.
                    </Typography>
                    <Typography variant="body1" style={{marginBottom: '15px', color: 'black'}}>
                        Start today and transform the way you work!
                    </Typography>
                </Paper>
            </Grid>
        </Grid>
    </Container>);
}

export default Login;
