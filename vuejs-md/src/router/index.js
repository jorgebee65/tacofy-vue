import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import NewElement from '@/components/NewElement'
import ViewElement from '@/components/ViewElement'
import EditElement from '@/components/EditElement'

Vue.use(Router)

let router = new Router({
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

router.beforeEach((to, from, next)=>{
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!firebase.auth().currentUser){
      //go to login
      console.log('Router: no hay usuario')
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    }else{
      //Procede to route
      next();
    }
  }else if(to.matched.some(record => record.meta.requiresGuest)){
    if(firebase.auth().currentUser){
      next({
        path: '/',
        query: {
          redirect: to.fullPath
        }
      });
    }else{
      //Procede to route
      next();
    }
  }else{
    next();
  }
})

export default router;
