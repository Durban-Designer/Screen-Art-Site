
export default [
  {path: '/', component: () => import('pages/Home')},
  {path: '/Admin', component: () => import('pages/Admin')},
  {path: '/Contact', component: () => import('pages/Contact')},
  {path: '/CRM', component: () => import('pages/CRM')},
  {path: '/Customer', component: () => import('pages/Customer')},
  {path: '/Inbox', component: () => import('pages/Inbox')},
  {path: '/Info', component: () => import('pages/Info')},
  {path: '/Leads', component: () => import('pages/Leads')},
  {path: '/Login', component: () => import('pages/Login')},
  {path: '/Work', component: () => import('pages/Work')},

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
