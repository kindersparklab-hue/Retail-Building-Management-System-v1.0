import { Card, CardContent, Typography, Grid, AppBar, Toolbar, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import Sidebar from './Sidebar';

function Dashboard() {
    const [authorized, setAuthorized] = useState(false);
    const [data, setData] = useState({ totalShops: 25, occupiedShops: 20, rentCollected: 15000 }); // Mock data

    useEffect(() => {
        const password = window.prompt('Enter password to access RBMS:');
        if (password === 'rbms123') { // Hardcoded password
            setAuthorized(true);
        } else {
            alert('Incorrect password. Access denied.');
        }
    }, []);

    if (!authorized) return <div>Access Denied</div>;

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <div style={{ flexGrow: 1 }}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>RBMS Dashboard</Typography>
                    </Toolbar>
                </AppBar>
                <div style={{ padding: 20 }}>
                    <Typography variant="h4" gutterBottom>Building Overview</Typography>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card sx={{ boxShadow: 2 }}>
                                <CardContent>
                                    <Typography variant="h5" color="primary">Total Shops</Typography>
                                    <Typography variant="h3">{data.totalShops}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                        {/* Add more cards with mock data */}
                    </Grid>
                </div>
            </div>
        </div>
    );
}
export default Dashboard;
