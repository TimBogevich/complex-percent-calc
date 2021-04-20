import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../components/compoundInterest.vue'),
    meta: { title: "compoundPercent" },
  },
  {
    path: '/rental_income',
    name: 'RentalIncome',
    component: () => import(/* webpackChunkName: "about" */ '../components/rental_income.vue'),
    meta: { title: "rentalIncome" },
  },
  {
    path: '/loan',
    name: 'Loan',
    component: () => import(/* webpackChunkName: "about" */ '../components/loan.vue'),
    meta: { title: "loanCalculator" },
  },
  {
    path: '/fixflip',
    name: 'FixAndFlip',
    component: () => import(/* webpackChunkName: "about" */ '../components/fixFlip.vue'),
    meta: { title: "fixAndFlipT" },
  },
  {
    path: '/mortgage',
    name: 'Mortgage',
    component: () => import(/* webpackChunkName: "about" */ '../components/mortgage.vue'),
    meta: { title: "mortgageT" },
  },
  {
    path: '/ipo_calendar',
    name: 'ipoCalendar',
    component: () => import(/* webpackChunkName: "about" */ '../components/ipo.vue'),
    meta: { title: "ipoT" },
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
