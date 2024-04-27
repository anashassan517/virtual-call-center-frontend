import { useState, useEffect } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Menu from '@mui/material/Menu';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';
import Icon from 'src/@core/components/icon';
import { useDispatch } from 'react-redux';
import CustomChip from 'src/@core/components/mui/chip';
import CustomTextField from 'src/@core/components/mui/text-field';
import AddUserDrawer from 'src/views/apps/user/list/AddUserDrawer';
import { fetchCases } from 'src/apis/cases';
import { useRouter } from 'next/router';

const userStatusObj = {
  Completed: 'success',
  Pending: 'warning',
  InProgress: 'primary'
}

const UserList = ({ apiData }) => {
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
  const [data, setData] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetchCases();
      setData(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleUserClick = (id) => {
    router.push(`/cases/${id}`);
  };

  const columns = [
    {
      flex: 0.10,
      minWidth: 200,
      field: 'name',
      headerName: 'User',
      renderCell: ({ row }) => {
        const { name, email, id } = row;

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }} onClick={() => handleUserClick(id)}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main', cursor: 'pointer' }
                }}
              >
                {name}
              </Typography>
              <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
                {email}
              </Typography>
            </Box>
          </Box>
        );
      }
    },
    {
      flex: 0.1,
      field: 'city',
      minWidth: 100,
      headerName: 'city',
      renderCell: ({ row }) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.city}
            </Typography>
          </Box>
        )
      }
    },
    {
      flex: 0.17,
      minWidth: 120,
      headerName: 'Rg# Number',
      field: 'pec_registration_number',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
            {row.pec_registration_number}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 220,
      field: 'question',
      headerName: 'Question',
      renderCell: ({ row }) => {
        return (
          <Typography noWrap sx={{ color: 'text.secondary' }}>
            {row.question}
          </Typography>
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'status',
      headerName: 'Status',
      renderCell: ({ row }) => {
        return (
          <CustomChip
            rounded
            skin='light'
            size='small'
            label={row.status}
            color={userStatusObj[row.status]}
            sx={{ textTransform: 'capitalize' }}
          />
        )
      }
    },
    {
      flex: 0.1,
      minWidth: 90,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => <RowOptions id={row.id} />
    }
  ];

  const RowOptions = ({ id }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const rowOptionsOpen = Boolean(anchorEl);

    const handleRowOptionsClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleRowOptionsClose = () => {
      setAnchorEl(null);
    };

    return (
      <>
        <IconButton size='small' onClick={handleRowOptionsClick}>
          <Icon icon='tabler:dots-vertical' />
        </IconButton>
        <Menu
          keepMounted
          anchorEl={anchorEl}
          open={rowOptionsOpen}
          onClose={handleRowOptionsClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          PaperProps={{ style: { minWidth: '8rem' } }}
        >
          <MenuItem
            onClick={() => handleUserClick(id)}
            sx={{ '& svg': { mr: 2 } }}
          >
            <Icon icon='tabler:eye' fontSize={20} />
            View
          </MenuItem>
        </Menu>
      </>
    )
  };

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        {apiData && (
          <Grid container spacing={6}>
            {apiData.statsHorizontalWithDetails.map((item, index) => {
              return (
                <Grid item xs={12} md={3} sm={6} key={index}>
                  <CardStatsHorizontalWithDetails {...item} />
                </Grid>
              )
            })}
          </Grid>
        )}
      </Grid>
      <Grid item xs={12}>
        <Card>
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={data}
            columns={columns}
            disableRowSelectionOnClick
            pageSizeOptions={[10, 25, 50]}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
          />
        </Card>
      </Grid>

      <AddUserDrawer open={addUserOpen} toggle={() => setAddUserOpen(!addUserOpen)} />
    </Grid>
  )
}

export default UserList;
