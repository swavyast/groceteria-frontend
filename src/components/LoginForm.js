import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { login } from '../services/LoginService';
import { useAuthContext, useMessageContext, useNavigation, useTokenContext } from '../AppContext';

export default function FormDialog({ open, setOpen }) {

    const { setMessage } = useMessageContext();
    const { setIsAuthenticated } = useAuthContext();
    const { setToken } = useTokenContext();
    const navigate = useNavigation();

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
                onSubmit: async (event) => {
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
        }},
            }}
        >
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="username"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="name"
                    name="password"
                    label="Password"
                    type="password"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Login</Button>
            </DialogActions>
        </Dialog>
    );
}
