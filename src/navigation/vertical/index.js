const navigation = (role = "agent", isApproved=false) => {
  console.log("role", role);

  const generalNavigation = [
    {
      title: 'Dashboard',
      icon: 'tabler:smart-home',
      path: '/dashboards/crm',
      // badgeContent: 'new',
      // badgeColor: 'error',
      // children: [
      //   {
      //     title: 'Analytics',
      //     path: '/dashboards/analytics'
      //   },
      //   {
      //     title: 'CRM',
      //     path: '/dashboards/crm'
      //   },
      //   {
      //     title: 'eCommerce',
      //     path: '/dashboards/ecommerce'
      //   }
      // ]
    },
    {
      title: 'Case Management',
      icon: 'tabler:briefcase-2',
      children:isApproved? [
        {
          title: 'List',
          path: '/agent-cases'
        },

        {
          title: 'Add Case',
          path: '/forms/form-validation'
        }
      ]:[
        {
          title: 'List',
          path: '/agent-cases'
        },
      ]
    },
  ];

  const adminNavigation = [
    {
      title: 'Dashboard',
      icon: 'tabler:smart-home',
      path: '/dashboards/crm',
      // badgeContent: 'new',
      // badgeColor: 'error',
      // children: [
      //   {
      //     title: 'Analytics',
      //     path: '/dashboards/analytics'
      //   },
      //   {
      //     title: 'CRM',
      //     path: '/dashboards/crm'
      //   },
      //   {
      //     title: 'eCommerce',
      //     path: '/dashboards/ecommerce'
      //   }
      // ]
    },
    {
      sectionTitle: 'Agents & Cases',
    },
    {
      title: 'Agent Management',
      icon: 'tabler:users',
      children: [
        {
          title: 'List',
          path: '/agents'
        },
        {
          title: 'Add Agent',
          path: '/agent/create'
        }
      ]
    },
    {
      title: 'Case Management',
      icon: 'tabler:briefcase-2',
      children: [
        {
          title: 'List',
          path: '/cases'
        },
        {
          title: 'Add Case',
          path: '/forms/form-validation'
        }
      ]
    },
  ];

  return role === "admin" ? adminNavigation : generalNavigation;
};

export default navigation;

