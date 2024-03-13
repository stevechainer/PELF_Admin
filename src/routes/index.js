// All components mapping with path for internal routes

import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/protected/Dashboard'))
// const Page404 = lazy(() => import('../pages/protected/404'))
// const Blank = lazy(() => import('../pages/protected/Blank'))
// const Charts = lazy(() => import('../pages/protected/Charts'))
const ApprovalGames = lazy(() => import('../pages/protected/ApprovalGames'))
const LiveGames = lazy(() => import('../pages/protected/LiveGames'))
// const Integration = lazy(() => import('../pages/protected/Integration'))
// const Calendar = lazy(() => import('../pages/protected/Calendar'))
// const Team = lazy(() => import('../pages/protected/Team'))
const Transactions = lazy(() => import('../pages/protected/Transactions'))
// const Bills = lazy(() => import('../pages/protected/Bills'))
// const ProfileSettings = lazy(() => import('../pages/protected/ProfileSettings'))
// const GettingStarted = lazy(() => import('../pages/GettingStarted'))
// const DocFeatures = lazy(() => import('../pages/DocFeatures'))
// const DocComponents = lazy(() => import('../pages/DocComponents'))


const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/approval-games',
    component: ApprovalGames,
  },
  {
    path: '/live-games',
    component: LiveGames,
  },
  {
    path: '/transactions',
    component: Transactions,
  },
  // {
  //   path: '/settings-profile',
  //   component: ProfileSettings,
  // },
  // {
  //   path: '/settings-billing',
  //   component: Bills,
  // },
  // {
  //   path: '/getting-started',
  //   component: GettingStarted,
  // },
  // {
  //   path: '/features',
  //   component: DocFeatures,
  // },
  // {
  //   path: '/components',
  //   component: DocComponents,
  // },
  // {
  //   path: '/integration',
  //   component: Integration,
  // },
  // {
  //   path: '/charts',
  //   component: Charts,
  // },
  // {
  //   path: '/404',
  //   component: Page404,
  // },
  // {
  //   path: '/blank',
  //   component: Blank,
  // },
]

export default routes
