// src/components/Auth.tsx

import React, { useState } from 'react';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Button, TextField, Typography, Box, Alert } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';

const Auth: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [user, loading] = useAuthState(auth);

  const handleAuth = async (action: 'signUp' | 'signIn') => {
    setError(null);
    setSuccess(null);
    
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      if (action === 'signUp') {
        await createUserWithEmailAndPassword(auth, email, password);
        setSuccess('Account created successfully! You can now sign in.');
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        setSuccess('Signed in successfully!');
      }
      setEmail('');
      setPassword('');
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setSuccess('Logged out successfully.');
    } catch (err) {
      console.error("Error during logout:", err);
      setError((err as Error).message);
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (user) {
    return (
      <Box>
        <Typography>Welcome, {user.email}</Typography>
        <Button onClick={logOut} variant="contained" color="secondary">Log Out</Button>
        {success && <Alert severity="success" sx={{ mt: 2 }}>{success}</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Box>
    );
  }

  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Button onClick={() => handleAuth('signUp')} variant="contained" color="primary">Sign Up</Button>
      <Button onClick={() => handleAuth('signIn')} variant="contained" color="secondary">Sign In</Button>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
    </Box>
  );
};

export default Auth;