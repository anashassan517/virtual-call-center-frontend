// import { useState, useEffect } from 'react'
// import Typography from '@mui/material/Typography'
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, FormControl, InputLabel, Button, ButtonGroup, Menu, MenuItem } from '@mui/material'
// import toast from 'react-hot-toast'
// import { fetchCases, updateCaseStatus } from 'src/apis/cases'
// import { format } from 'date-fns'
// import Icon from 'src/@core/components/icon'

// const Agent_Cases = () => {
//     const [cases, setCases] = useState([]);
//     const [selectedStatus, setSelectedStatus] = useState({});
//     const [anchorEl, setAnchorEl] = useState(null)
//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const casesData = await fetchCases();
//                 setCases(casesData.data.data);
//             } catch (error) {
//                 console.error('Error fetching data:', error);
//             }
//         };
//         fetchData();
//     }, []);

//     const handleStatusChange = async (status, caseId) => {
//         try {
//             setSelectedStatus(prevState => ({
//                 ...prevState,
//                 [caseId]: status
//             }));
//             console.log("caseid and status:", caseId, status)
//             await updateCaseStatus(caseId, status);
//             toast.success(`Case status updated to ${status}`);
//             setAnchorEl(false)
//         } catch (error) {
//             console.error('Error updating case status:', error);
//             toast.error('Error updating case status');
//         }
//     };


//     const handleClick = event => {
//         setAnchorEl(event.currentTarget)
//     }

//     const handleClose = () => {
//         setAnchorEl(null)
//     }

//     return (
//         <>
//             <Typography variant="h1" component="h1" sx={{ mb: 2 }}>Cases</Typography>
//             <TableContainer component={Paper}>
//                 <Table sx={{ minWidth: 650 }} aria-label="cases table">
//                     <TableHead>
//                         <TableRow>
//                             <TableCell>Name</TableCell>
//                             <TableCell>City</TableCell>
//                             <TableCell>Engineering Field</TableCell>
//                             <TableCell>PEC Number</TableCell>
//                             <TableCell>Question</TableCell>
//                             <TableCell>Created At</TableCell>
//                             <TableCell>Status</TableCell>
//                             <TableCell>Change Status</TableCell>
//                         </TableRow>
//                     </TableHead>
//                     <TableBody>
//                         {cases.map((caseItem) => {
//                             const handleStatusChangeForCase = (status) => {
//                                 handleStatusChange(status, caseItem.id);
//                             };

//                             return (
//                                 <TableRow key={caseItem.id}>
//                                     <TableCell>{caseItem.name}</TableCell>
//                                     <TableCell>{caseItem.city}</TableCell>
//                                     <TableCell>{caseItem.engineering_field}</TableCell>
//                                     <TableCell>{caseItem.pec_registration_number}</TableCell>
//                                     <TableCell>{caseItem.question}</TableCell>
//                                     <TableCell>{format(new Date(caseItem.created_at), 'MMMM dd, yyyy')}</TableCell>
//                                     <TableCell>{caseItem.status}</TableCell>
//                                     <TableCell>
//                                         <Button variant='outlined' aria-controls='basic-menu' aria-haspopup='true' onClick={handleClick}>
//                                             <Icon icon='tabler:dots-vertical' />
//                                         </Button>
//                                         <Menu keepMounted id='basic-menu' anchorEl={anchorEl} onClose={handleClose} open={Boolean(anchorEl)}>
//                                             <MenuItem onClick={() => handleStatusChange('Pending', caseItem.id)}>
//                                                 <Icon icon='tabler:clock-hour-4' />
//                                                 Pending</MenuItem>
//                                             <MenuItem onClick={() => handleStatusChange('In Progress', caseItem.id)}>
//                                                 <Icon icon='tabler:progress' />In Progress</MenuItem>
//                                             <MenuItem onClick={() => handleStatusChange('Completed', caseItem.id)}>
//                                                 <Icon icon='tabler:circle-dashed-check' />
//                                                 Completed</MenuItem>
//                                         </Menu>
//                                     </TableCell>
//                                 </TableRow>
//                             )
//                         )
//                         }
//                     </TableBody>
//                 </Table>
//             </TableContainer>
//         </>
//     );
// }

// export default Agent_Cases






import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, FormControl, InputLabel, Button, Menu, MenuItem } from '@mui/material'
import toast from 'react-hot-toast'
import { fetchCases, updateCaseStatus } from 'src/apis/cases'
import { format } from 'date-fns'
import Icon from 'src/@core/components/icon'

const Agent_Cases = () => {
    const [cases, setCases] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState({});
    const [anchorEls, setAnchorEls] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const casesData = await fetchCases();
                setCases(casesData.data.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleStatusChange = async (status, caseId) => {
        try {
            setSelectedStatus(prevState => ({
                ...prevState,
                [caseId]: status
            }));
            await updateCaseStatus(caseId, status);
            toast.success(`Case status updated to ${status}`);
            setAnchorEls(prevState => ({
                ...prevState,
                [caseId]: null
            }));
        } catch (error) {
            console.error('Error updating case status:', error);
            toast.error('Error updating case status');
        }
    };

    const handleClick = (event, caseId) => {
        setAnchorEls(prevState => ({
            ...prevState,
            [caseId]: event.currentTarget
        }));
    }

    const handleClose = (caseId) => {
        setAnchorEls(prevState => ({
            ...prevState,
            [caseId]: null
        }));
    }

    return (
        <>
            <Typography variant="h1" component="h1" sx={{ mb: 2 }}>Cases</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="cases table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Engineering Field</TableCell>
                            <TableCell>PEC Number</TableCell>
                            <TableCell>Question</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Change Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cases.map((caseItem) => (
                            <TableRow key={caseItem.id}>
                                <TableCell>{caseItem.name}</TableCell>
                                <TableCell>{caseItem.city}</TableCell>
                                <TableCell>{caseItem.engineering_field}</TableCell>
                                <TableCell>{caseItem.pec_registration_number}</TableCell>
                                <TableCell>{caseItem.question}</TableCell>
                                <TableCell>{format(new Date(caseItem.created_at), 'MMMM dd, yyyy')}</TableCell>
                                <TableCell>{caseItem.status}</TableCell>
                                <TableCell>
                                    <Button variant='outlined' aria-controls={`basic-menu-${caseItem.id}`} aria-haspopup='true' onClick={(event) => handleClick(event, caseItem.id)}>
                                        <Icon icon='tabler:dots-vertical' />
                                    </Button>
                                    <Menu keepMounted id={`basic-menu-${caseItem.id}`} anchorEl={anchorEls[caseItem.id]} onClose={() => handleClose(caseItem.id)} open={Boolean(anchorEls[caseItem.id])}>
                                        <MenuItem onClick={() => handleStatusChange('Pending', caseItem.id)}>
                                            <Icon icon='tabler:clock-hour-4' />
                                            Pending</MenuItem>
                                        <MenuItem onClick={() => handleStatusChange('In Progress', caseItem.id)}>
                                            <Icon icon='tabler:progress' />In Progress</MenuItem>
                                        <MenuItem onClick={() => handleStatusChange('Completed', caseItem.id)}>
                                            <Icon icon='tabler:circle-dashed-check' />
                                            Completed</MenuItem>
                                    </Menu>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default Agent_Cases;

