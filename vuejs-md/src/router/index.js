import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewElement from '@/components/NewElement'
import ViewElement from '@/components/ViewElement'
import EditElement from '@/components/EditElement'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/new',
      name: 'new-element',
      component: NewElement
    },
    {
      path: '/:taq_id',
      name: 'view-element',
      component: ViewElement
    },
    {
      path: '/edit/:taq_id',
      name: 'edit-element',
      component: EditElement
    }
  ]
})
