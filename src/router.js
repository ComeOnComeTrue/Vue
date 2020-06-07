import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from "./views/Home" // 首页
import auth from './utils/auth' // 登录

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home', // 根路由展示首页
    component: Home,
    // alias: '/'    // 起别名  路径显示是/ 展示的是home页面
  },
  {
    path: '/learn',
    components: { // 命名视图
      default: () => import('./views/Learn'),
      // student: () => import('./views/Student'),
    }
  },
  {
    path: '/student',
    component: () => import('./views/Student'),
  },
  {
    path: '/about',
    component: () => import('./views/About'),
    // beforeEnter: (to, from, next) => {// 路由独享守卫
    //   console.log('我是路由独享守卫');
    //   next('/student');// 跳转
    // },
    meta: {// 自定义信息 练习 没登录requiresLogin为true
      requiresLogin: true,//自定义 要登录才可以看
      // backAsk: true,//自定义 真的要走吗
    },
  },
  {
    path: '/activity',
    component: () => import(/* webpackChunkName: 'academic' */'./views/Activity'),
    redirect: to => { // 方式 1. '/activity/academic' 2. {name: 'academic'} 3. fun()
      return {
        name: 'academic'
      }
    },
    meta: {
      requiresLogin: true,
      backAsk: true,
    },
    children: [  // 嵌套路由
      // { // 默认显示  学术讨论
      //   path: '',   
      //   component: () => import('./views/Academic'),
      // },
      {
        path: 'academic',
        name: 'academic',
        component: () => import(/* webpackChunkName: 'academic' */'./views/Academic'),
      },
      {
        path: 'personal',
        name: 'personal',
        component: () => import('./views/Personal'),
      },
      {
        path: 'download',
        name: 'download',
        component: () => import('./views/Download'),
      },
    ]
  },
  {
    path: '/question/:id', // 动态路由 对于所有 ID 各不相同的用户，都要使用这个组件来渲染
    name: "question",
    component: () => import('./views/Question'),
    props: (route) => ({ // 路由组件传参 函数形式
      name: route.name,
      id: route.params.id
    })
  },
  {
    path: '/login',
    component: () => import('./views/Login')
  }
];



const router = new VueRouter({
  mode: 'history', // history 模式 不显示hash 
  routes,
  scrollBehavior(to, from, savedPosition) { // 设置回到首页滚动条具体位置
    // return 期望滚动到哪个的位置
    if (savedPosition) { // 
      return savedPosition;
    } else {
      if (to.hash) { // 有hash就 跳转到hash值位置 比如页面中设置有ID的元素位置
        return { selector: to.hash }
      } else {
        return { x: 0, y: 0 }
      }
    }
  }
});

// 验证登录功能 没登录不让进
router.beforeEach((to, from, next) => { // 全局路由守卫 路由跳转前触发的钩子函数
  // 遍历 看 一个族群中有没有包含 to.meta.requiresLogin 有一个true说明没登录
  const isRequiresLogin = to.matched.some(item => item.meta.requiresLogin);
  if (isRequiresLogin) {
    // 模拟后台传过来的数据
    // 看cookie里的每个数据有没有包含filterText数据 有就返回true
    const isLogin = auth.isLogin();
    if (isLogin) { // 和后台数据一样就登录跳转
      next();
    } else {
      const isToLogin = window.confirm('需要登录才可以浏览，要去登录吗？');
      isToLogin == true ? next('./login') : next(false);
      // 跳转到login页面
    }
  } else {
    next();
  }

  // 看哪些组件要回退操作提示
  // const from.meta.backAsk
  if (from.meta.backAsk) {
    const isGo = window.confirm('你真的要走吗？')
    isGo ? next() : next(false);

  } else {
    next();
  }

});


export default router;