
import { useState, useEffect } from 'react'
import { Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogContent, IconButton } from '@mui/material'
import Icon from 'src/@core/components/icon'
import { updateAgentStatus } from 'src/apis/agents'
import { getAllUsers } from 'src/apis/getAllUsers'
import toast from 'react-hot-toast'

const Agents = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllUsers();
                setUsers(result.data.result);
                console.log("Get All users api result:", result);

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleViewDetails = (user) => {
        setSelectedUser(user);
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
        setSelectedUser(null);
    };

    const handleApproved = async (userId) => {
        const result = await updateAgentStatus(userId, 1);
        if (result.status == 200) {
            const { data } = await getAllUsers();

            setUsers(data.result);
        }
        toast.success("Agent approved successfully");
    };

    const handleDisapproved = async (userId) => {
        const result = await updateAgentStatus(userId, 0);
        if (result.status == 200) {
            const { data } = await getAllUsers();
            setUsers(data.result);
        }
        toast.success("Agent disapproved successfully");
    };

    return (
        <>
            <Typography variant="h1" component="h1" sx={{ mb: 2 }}>Agents</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="agents table">
                    <TableHead>
                        <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Contact</TableCell>
                            <TableCell>Audio</TableCell>
                            <TableCell>Current Status</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users?.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.firstname}</TableCell>
                                <TableCell>{user.lastname}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.contact}</TableCell>
                                <TableCell>
                                    {/* Add a "View" button to open the dialog box */}
                                    <Button onClick={() => handleViewDetails(user)}>
                                        view
                                    </Button>
                                </TableCell>
                                <TableCell>{user.isApproved === 1 ? 'Approved' : 'Not Approved'}</TableCell>
                                <TableCell>
                                    {user.isApproved === 0 ? (
                                        <Button onClick={() => handleApproved(user.id)} variant="contained" color="success">Approve</Button>
                                    ) : (
                                        <Button onClick={() => handleDisapproved(user.id)} variant="contained" color="error">Disapprove</Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                fullWidth
                open={show}
                onClose={handleClose}
            >
                <DialogContent>
                    <IconButton onClick={handleClose}>
                        <Icon icon='tabler:x' fontSize='2.5rem' />
                    </IconButton>
                    <Typography variant='h3'>{selectedUser ? `${selectedUser.firstname}
                     's Audio Details` : ''}</Typography>

                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Language</TableCell>
                                    <TableCell>Audio</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedUser?.language_names_with_audios.map((language, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{language.language_name}</TableCell>
                                        <TableCell>
                                            {language.audio_url ? (
                                                <audio controls src={language.audio_url} className="w-full"></audio>
                                            ) : (
                                                <Button disabled>Not Available</Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
            </Dialog>
        </>
    );
}

export default Agents;
