/**
 *  Set Home URL based on User Roles
 */
const getHomeRoute = role => {
  if (role === 'agent') return '/dashboards/crm'
  else return '/dashboards/crm'
}

export default getHomeRoute
