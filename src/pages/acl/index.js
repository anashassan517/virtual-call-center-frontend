// ** React Imports
import { useContext ,useEffect,useState} from 'react'

// ** Context Imports
import { AbilityContext } from 'src/layouts/components/acl/Can'

// ** MUI Imports
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'


import CircularProgress from '@mui/material/CircularProgress'
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import CardStatsVertical from 'src/@core/components/card-statistics/card-stats-vertical'
import CrmEarningReportsWithTabs from 'src/views/dashboards/crm/CrmEarningReportsWithTabs'

import { getDashboardData } from 'src/apis/dashboard'




const ACLPage = () => {
  // ** Hooks
  const ability = useContext(AbilityContext)
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const data = await getDashboardData();
      setDashboardData(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div >
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div >
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </div>
    );
  }

  return (
    <ApexChartWrapper>
       {dashboardData ? (
        <><Typography variant='h1' paddingBottom={8}>
          Agent Cases Dashboard
        </Typography>
      <Grid container spacing={6}>
        {/* <Grid item xs={6} sm={4} lg={4}>
          <CrmSalesWithAreaChart />
        </Grid>
        <Grid item xs={6} sm={4} lg={4}>
          <CrmSessions />
        </Grid> */}
        <Grid item xs={6} sm={4} lg={4} paddingBottom={12}>
          <CardStatsVertical
            stats={dashboardData?.data.totalCases}
            chipText='+0.2%'
            chipColor='default'
            avatarColor='error'
            title='Total Cases'
            subtitle='This month'
            avatarIcon='tabler:briefcase'
          />
        </Grid>
        
        <Grid item xs={6} sm={4} lg={4}>
          <CardStatsVertical
            stats={dashboardData.data.pendingCases}
            chipText='+0.0%'
            avatarColor='info'
            chipColor='default'
            title='Pending Cases'
            subtitle='All Time'
            avatarIcon='tabler:clock-hour-4'
          />
        </Grid>
        <Grid item xs={6} sm={4} lg={4}>
          <CardStatsVertical
            stats={dashboardData.data.inProgressCases}
            chipText='0.0%'
            avatarColor='info'
            chipColor='default'
            title='In Progress Cases'
            subtitle='All Time'
            avatarIcon='tabler:progress'
          />
        </Grid>
        </Grid>
        <Grid container spacing={6} >

        <Grid item xs={6} sm={4} lg={4} >
          <CardStatsVertical
            stats={dashboardData.data.completedCases}
            chipText='0.0%'
            avatarColor='success'
            chipColor='default'
            title='Completed Cases'
            subtitle='All Time'
            avatarIcon='tabler:circle-dashed-check'
          />
        </Grid>
        <Grid item xs={6} sm={4} lg={4}>
          <CardStatsVertical
            stats={dashboardData.data.approvedCases}
            chipText='0.0%'
            avatarColor='info'
            chipColor='default'
            title='Approved Cases'
            subtitle='All Time'
            avatarIcon='tabler:shield-check'
          />
        </Grid>
        <Grid item xs={6} sm={4} lg={4}>
          <CardStatsVertical
            stats={dashboardData.data.rejectedCases}
            chipText='+0.0%'
            avatarColor='error'
            chipColor='default'
            title='Rejected Cases'
            subtitle='All Time'
            avatarIcon='tabler:user-x'
          />
        </Grid>
        </Grid>
      </>
      ) : (
        <Typography variant="h6">No data found</Typography>
      )}
    </ApexChartWrapper>
  )
}
//       {ability?.can('read', 'analytics') ? (
//         <Grid item md={6} xs={12}>
//           <Card>
//             <CardHeader title='Analytics' />
//             <CardContent>
//               <Typography sx={{ mb: 4 }}>User with 'Analytics' subject's 'Read' ability can view this card</Typography>
//               <Typography sx={{ color: 'error.main' }}>This card is visible to 'admin' only</Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       ) : null}
//     </Grid>
//   )
// }
ACLPage.acl = {
  action: 'read',
  subject: 'acl-page'
}

export default ACLPage
