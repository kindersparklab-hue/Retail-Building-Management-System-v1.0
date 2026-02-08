import { List, ListItem, ListItemText, Drawer } from '@mui/material';
import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <Drawer variant="permanent" sx={{ width: 240, '& .MuiDrawer-paper': { width: 240 } }}>
            <List>
                <ListItem button component={Link} to="/dashboard"><ListItemText primary="Dashboard" /></ListItem>
                <ListItem button component={Link} to="/shops"><ListItemText primary="Shops & Tenants" /></ListItem>
                {/* Add more links */}
            </List>
        </Drawer>
    );
}
export default Sidebar;
