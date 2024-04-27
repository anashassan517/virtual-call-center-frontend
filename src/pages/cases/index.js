import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, FormControl, InputLabel, Button, ButtonGroup, Menu, MenuItem } from '@mui/material'
import toast from 'react-hot-toast'
import { assignCase, fetchCases, updateCaseStatus } from 'src/apis/cases'
import { fetchApprovedAgents } from 'src/apis/agents'
import { format } from 'date-fns'
import IconButton from '@mui/material/IconButton'
import Icon from 'src/@core/components/icon'
import UserList from '../apps/user/list'
const Cases = () => {

  const [selectedStatus, setSelectedStatus] = useState({});
  const [anchorEl, setAnchorEl] = useState(null)
  const [cases, setCases] = useState([]);
  const [agents, setAgents] = useState([]);
  const [selectedAgents, setSelectedAgents] = useState({});
  
  const [anchorEls, setAnchorEls] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const casesData = await fetchCases();
        setCases(casesData.data.data);

        const agentsData = await fetchApprovedAgents();
        setAgents(agentsData.data.data);

        const assignedAgents = {};

        casesData.data.data.forEach(caseItem => {
          if (caseItem.agentId) {
            const assignedAgent = agentsData.data.data.find(agent => agent.id === caseItem.agentId);
            if (assignedAgent) {
              assignedAgents[caseItem.id] = {
                value: assignedAgent.id,
                label: `${assignedAgent.firstname} ${assignedAgent.lastname}`
              };
            }
          }
        });

        setSelectedAgents(assignedAgents);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleAgentChange = async (event, caseId) => {
    try {
      const selectedAgentId = event.target.value;
      const selectedAgent = agents.find(agent => agent.id === selectedAgentId);

      setSelectedAgents(prevState => ({
        ...prevState,
        [caseId]: {
          value: selectedAgent.id,
          label: `${selectedAgent.firstname} ${selectedAgent.lastname}`
        }
      }));

      const result = await assignCase(selectedAgentId, caseId);
      toast.success('Case assigned successfully');
    } catch (error) {
      console.error('Error assigning case:', error);
      toast.error('Error assigning case');
    }
  };


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
    // <>
    // <Typography variant="h1" component="h1" sx={{ mb: 2 }}>Cases</Typography>
    // <TableContainer component={Paper}>
    //   <Table sx={{ minWidth: 650 }} aria-label="cases table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell>Name</TableCell>
    //         <TableCell>City</TableCell>
    //         <TableCell>Engineering Field</TableCell>
    //         <TableCell>PEC Number</TableCell>
    //         <TableCell>Question</TableCell>
    //         <TableCell>Created At</TableCell>
    //         <TableCell>Status</TableCell>
    //         <TableCell>Assign Agent</TableCell>
    //         <TableCell>Change Status</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {cases.map((caseItem) => (
    //         <TableRow key={caseItem.id}>
    //           <TableCell>{caseItem.name}</TableCell>
    //           <TableCell>{caseItem.city}</TableCell>
    //           <TableCell>{caseItem.engineering_field}</TableCell>
    //           <TableCell>{caseItem.pec_registration_number}</TableCell>
    //           <TableCell>{caseItem.question}</TableCell>
    //           <TableCell>{format(new Date(caseItem.created_at), 'MMMM dd, yyyy')}</TableCell>
    //           <TableCell>{caseItem.status}</TableCell>
    //           <TableCell>
    //             <FormControl fullWidth>
    //               <InputLabel id={`assign-agent-label-${caseItem.id}`}>Select Agent</InputLabel>
    //               <Select
    //   key={caseItem.id}
    //   labelId={`assign-agent-label-${caseItem.agentId}`}
    //   id={`assign-agent-select-${caseItem.agentId}`}
    //   value={selectedAgents[caseItem.id]?.value || ''}
    //   onChange={(event) => handleAgentChange(event, caseItem.id)}
    // >
    //   {agents.map(agent => (
    //     <MenuItem key={agent.id} value={agent.id}>
    //       {`${agent.firstname} ${agent.lastname}`}
    //     </MenuItem>
    //   ))}
    // </Select>
    //             </FormControl>
    //           </TableCell>
    //           <TableCell>
    //             <Button variant='outlined' aria-controls={`basic-menu-${caseItem.id}`} aria-haspopup='true' onClick={(event) => handleClick(event, caseItem.id)}>
    //               <Icon icon='tabler:dots-vertical' />
    //             </Button>
    //             <Menu keepMounted id={`basic-menu-${caseItem.id}`} anchorEl={anchorEls[caseItem.id]} onClose={() => handleClose(caseItem.id)} open={Boolean(anchorEls[caseItem.id])}>
    //               <MenuItem onClick={() => handleStatusChange('Pending', caseItem.id)}>
    //                 <Icon icon='tabler:clock-hour-4' />
    //                 Pending</MenuItem>
    //               <MenuItem onClick={() => handleStatusChange('In Progress', caseItem.id)}>
    //                 <Icon icon='tabler:progress' />In Progress</MenuItem>
    //               <MenuItem onClick={() => handleStatusChange('Completed', caseItem.id)}>
    //                 <Icon icon='tabler:circle-dashed-check' />
    //                 Completed</MenuItem>
    //             </Menu>
    //           </TableCell>
    //         </TableRow>
    //       ))}

    //     </TableBody>
    //   </Table>
    // </TableContainer>
     <UserList/>
    // </>
  );
}

export default Cases

