import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SideImage from '../static/images/groceteria-side-image.png'
import Copyright from './Copyright';
import { login } from '../services/LoginService';
import { useAuthContext, useMessageContext, useNavigation, useTokenContext } from '../AppContext';

const defaultTheme = createTheme();

export default function SignInSide() {
    const { setMessage } = useMessageContext();
    const { setIsAuthenticated } = useAuthContext();
    const { setToken } = useTokenContext();
    const navigate = useNavigation();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const email = formData.get('username');
        const username = email.substring(0, email.indexOf('@'));
        const loginDetails = Object.fromEntries(formData.entries());

        try {
            const { message, status, data } = await login(loginDetails);

            setMessage(message); // Update message context
            if (status === 'ACCEPTED') {
                setIsAuthenticated(true); // Update authentication context
                setToken(data); // Update token context
                navigate(`/users/${username}`); // Navigate to user-specific route
            } else {
                setIsAuthenticated(false); // Ensure authentication is false if login fails
                setToken(''); // Clear token context if login fails
            }

            console.log({
                email: formData.get('username'),
                password: formData.get('password'),
                message: message,
                status: status
            });

        } catch (error) {
            console.error('Login failed:', error);
            setMessage('Login failed. Please try again.'); // Update message context on error
            setIsAuthenticated(false); // Ensure authentication is false on error
            setToken(''); // Clear token context on error
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        // backgroundImage: 'linear-gradient(rgba(0,0,0,0.6), rgba(255,255, 255, 0.9))',
                        backgroundImage: `url(${SideImage})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main', ":hover": { backgroundColor: 'purple' } }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Email Address"
                                type="email"
                                name="username"
                                autoComplete="email"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, bgcolor: 'secondary.main', ":hover": { backgroundColor: 'purple' } }}
                            >
                                Sign In
                            </Button>
                            <Grid container>
                                <Grid item xs>
                                    <Link href="#" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        {"Don't have an account? Sign Up"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}