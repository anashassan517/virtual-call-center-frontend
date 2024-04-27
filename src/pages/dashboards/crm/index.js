// ** MUI Import
import Grid from '@mui/material/Grid'

// ** Demo Component Imports
import CrmSessions from 'src/views/dashboards/crm/CrmSessions'
import CrmRevenueGrowth from 'src/views/dashboards/crm/CrmRevenueGrowth'
import CrmBrowserStates from 'src/views/dashboards/crm/CrmBrowserStates'
import CrmProjectStatus from 'src/views/dashboards/crm/CrmProjectStatus'
import CrmActiveProjects from 'src/views/dashboards/crm/CrmActiveProjects'
import CrmLastTransaction from 'src/views/dashboards/crm/CrmLastTransaction'
import CrmActivityTimeline from 'src/views/dashboards/crm/CrmActivityTimeline'
import CrmSalesWithAreaChart from 'src/views/dashboards/crm/CrmSalesWithAreaChart'
import CrmSalesWithRadarChart from 'src/views/dashboards/crm/CrmSalesWithRadarChart'
import CrmEarningReportsWithTabs from 'src/views/dashboards/crm/CrmEarningReportsWithTabs'

// ** Custom Component Imports
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import CardStatsVertical from 'src/@core/components/card-statistics/card-stats-vertical'
// import { useDashboardData } from 'src/apis/dashboard'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { getDashboardData } from 'src/apis/dashboard'
import { useState, useEffect } from 'react';
import { color, textAlign } from '@mui/system'

const CrmDashboard = () => {
  // const { data, isLoading, isError }=useDashboardData();
  // if (isLoading) return 'Loading...';

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
      {dashboardData && (
        <><Typography variant='h1'>
          Cases Details
        </Typography>
          <Grid container
            spacing={5}
            marginBottom={8}
            direction='row'

          >
            {/* <Grid item xs={6} sm={4} lg={2}>
          <CrmSalesWithAreaChart />
        </Grid>
        <Grid item xs={6} sm={4} lg={2}>
          <CrmSessions />
        </Grid> */}

        <Grid item xs={6} sm={6} lg={4}>
          <CardStatsVertical
            stats={dashboardData?.data.totalCases}
            chipText='+12.2%'
            chipColor='default'
            avatarColor='error'
            title='Total Cases'
            subtitle='This month'
            avatarIcon='tabler:briefcase'
          />
        </Grid>


        <Grid item xs={6} sm={6} lg={4}>
          <CardStatsVertical
            stats={dashboardData.data.pendingCases}
            chipText='+35.2%'
            avatarColor='info'
            chipColor='default'
            title='Pending Cases'
            subtitle='All Time'
            avatarIcon='tabler:clock-hour-4'
          />
        </Grid>
        <Grid item xs={6} sm={6} lg={4}>
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
        <Grid item xs={6} sm={6} lg={4}>
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



          {/* <Grid item xs={6} sm={4} lg={2}>
        {/* <Grid item xs={6} sm={6} lg={4}>
          <CardStatsVertical
            stats={dashboardData.data.unassignedCases}
            chipText='+25.2%'
            avatarColor='error'
            chipColor='default'
            title='Unassigned Cases'
            subtitle='All Time'
            avatarIcon='tabler:user'
          />
        </Grid> */}
        </Grid>
      {dashboardData.data.totalAgents && (
        <Grid container spacing={8}
          marginBottom={8}
          direction='row'>
          <Grid item xs={12} sm={12} lg={12}>
            <Typography variant='h1'>
              Agents Details
            </Typography></Grid>
          <Grid item xs={6} sm={6} lg={4}>
            <CardStatsVertical
              stats={dashboardData.data.totalAgents}
              chipText='+25.2%'
              avatarColor='error'
              chipColor='default'
              title='Total Agents'
              subtitle='All Time'
              avatarIcon='tabler:user'
            />
          </Grid>
          <Grid item xs={6} sm={6} lg={4}>
            <CardStatsVertical
              stats={dashboardData.data.pendingAgents}
              chipText='+45.2%'
              avatarColor='info'
              chipColor='default'
              title='Pending Agents'
              subtitle='All Time'
              avatarIcon='tabler:clock-record'
            />
          </Grid>
          <Grid item xs={6} sm={6} lg={4}>
            <CardStatsVertical
              stats={dashboardData.data.approvedAgents}
              chipText='+0.0%'
              avatarColor='success'
              chipColor='default'
              title='Approved Agents'
              subtitle='All Time'
              avatarIcon='tabler:shield-check'
            />
          </Grid>
          {/* <Grid item xs={12} sm={8} lg={4}>
          <CrmRevenueGrowth />
        </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}>
          <CrmSalesWithRadarChart />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CrmBrowserStates />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CrmProjectStatus />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <CrmActiveProjects />
        </Grid>
        <Grid item xs={12} md={6}>
          <CrmLastTransaction />
        </Grid>
        <Grid item xs={12} md={6}>
          <CrmActivityTimeline />
        </Grid> */}
        </Grid>)}
      <Grid item xs={12} lg={8}>
        <CrmEarningReportsWithTabs tabData={
          !dashboardData.data.totalAgents ? [
            {
              type: 'Cases',
              avatarIcon: 'tabler:chart-bar',
              series: [{ data: dashboardData.data.cases }]
            }
          ] : [
            {
              type: 'Agents',
              avatarIcon: 'tabler:users',
              series: [{ data: dashboardData.data.agents }]
            },
            {
              type: 'Cases',
              avatarIcon: 'tabler:chart-bar',
              series: [{ data: dashboardData.data.cases }]
            }
          ]
        } />
      </Grid>
    </>
  )
}
    </ApexChartWrapper>
  )
}

export default CrmDashboard
