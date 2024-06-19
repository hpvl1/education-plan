
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },
  {
    path: '/addcomp/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/CompetencyMakePage.vue'), name: 'addcomp', }
    ]
  },
  {
    path: '/editcomp/',

    component: () => import('layouts/MainLayout.vue'),
    props: (route) => ({compId: route.params.compId}),
    children: [
      { path: '', component: () => import('pages/CompetencyEditPage.vue'), name: 'editcomp', }
    ]
  },
  {
    path: '/addcomp1/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/CompetencyPage.vue') }
    ]
  },
  {
    path: '/eduplan/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/EducationPlanPage.vue') }
    ]
  },
  {
    path: '/editplan/',
    props: (route) => ({planId: route.params.planId}),
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PlanEditPage.vue') }
    ]
  },
  {
    path: '/eduplan/adduser/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/AssignEducationPlanPage.vue') }
    ]
  },
  {
    path: '/eduplan/individual/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndividualPlanPage.vue') }
    ]
  },
  {
    path: '/competencies/list/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/CompetenciesPage.vue') }
    ]
  },
  {
    path: '/plans/list/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PlansList.vue') }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
