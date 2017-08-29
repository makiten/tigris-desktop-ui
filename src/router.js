import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function load (component) {
  return () => System.import(`components/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */
  mode: 'history',
  routes: [
    { path: '/',
      name: 'index',
      component: load('Index'),
      children:
      [
        {
          path: '/courses/',
          name: 'courses',
          component: load('courses/Courses'),
          children: [
            { path: ':courseName/', // TODO Change to course index
              name: 'course',
              component: load('courses/Course'),
              children: [
                { path: 'done/', name: 'done', component: load('courses/CourseDone') }, // Finished course
                { path: 'exam/', name: 'exam', component: load('courses/assessments/Exam') }, // Final exam
                { path: ':moduleName/', name: 'module', component: load('courses/Module') } // Module
              ]
            }
          ]
        },
        {
          path: '/admin/',
          name: 'admin',
          component: load('admin/Admin')
        }
      ]
    },
    { path: '/verify/:token', name: 'verify', component: load('Verify') },
    { path: '/login', name: 'login', component: load('Login') }, // Login
    { path: '/logout', name: 'logout', component: load('Login') }, // Logout
    { path: '/forbidden', component: load('Error403') }, // Forbidden
    { path: '/server-error', component: load('Error500') }, // Internal Server Error
    { path: '*', component: load('Error404') } // Not found
  ]
})
