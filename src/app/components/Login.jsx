'use client'

import { useState } from 'react'
import { Button, TextField, Card, CardContent, Typography, Box } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2', // Color azul similar al de la imagen
        },
    },
})

export default function LoginForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const router = useRouter()
    const { login } = useAuth()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('/api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        if (response.ok) {
            const data = await response.json()
            console.log(data)
            localStorage.setItem('token', data.token)
            login()
            router.push('/')
        } else {
            console.error('Error al iniciar sesión')
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    display: 'flex',
                    minHeight: '100vh',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'grey.100',
                    p: 2,
                }}
            >
                <Card sx={{ maxWidth: 400, width: '100%' }}>
                    <CardContent sx={{ p: 3 }}>
                        <Typography variant="h5" component="h1" align="center" gutterBottom>
                            Login
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                id="email"
                                label="Email address"
                                variant="outlined"
                                margin="normal"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <TextField
                                fullWidth
                                id="password"
                                label="Password"
                                variant="outlined"
                                margin="normal"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                sx={{ mt: 2 }}
                            >
                                Login
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </ThemeProvider>
    )
}

