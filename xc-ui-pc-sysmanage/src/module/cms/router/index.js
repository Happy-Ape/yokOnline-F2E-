import Home from '@/module/home/page/home.vue';
import site_list from '@/module/cms/page/site_list.vue';
import site_add from '@/module/cms/page/site_add.vue';
import site_edit from '@/module/cms/page/site_edit.vue';
import template_list from '@/module/cms/page/template_list.vue';
import template_add from '@/module/cms/page/template_add.vue';
import template_edit from '@/module/cms/page/template_edit.vue';
import page_list from '@/module/cms/page/page_list.vue';
import page_add from '@/module/cms/page/page_add.vue';
import page_edit from '@/module/cms/page/page_edit.vue';
import page_html from '@/module/cms/page/page_html.vue';
import addUser from '@/module/cms/page/addUser.vue';
export default [{
    path: '/cms',
    component: Home,
    name: 'CMS管理',
    hidden: false,
    children: [
      { path: '/cms/site/list', name:'站点列表',component: site_list,hidden:false},
      { path: '/cms/site/add', name:'新增站点',component: site_add,hidden:true},
      { path: '/cms/site/edit/:siteId', name:'修改站点',component: site_edit,hidden:true},
      { path: '/cms/template/list', name:'模板列表',component: template_list,hidden:false},
      { path: '/cms/template/add', name:'新增模板',component: template_add,hidden:true},
      { path: '/cms/template/edit/:templateId', name:'修改模板',component: template_edit,hidden:true},
      { path: '/cms/page/list', name:'页面列表',component: page_list,hidden:false},
      { path: '/cms/page/add', name:'新增页面',component: page_add,hidden:true},
      { path: '/cms/page/edit/:pageId', name:'修改页面',component: page_edit,hidden:true},
      { path: '/cms/page/html/:pageId', name:'生成html',component: page_html,hidden:true},

    ]
    // ,
    // redirect: '/home',
    // children: [
    //   {path: 'home', component: Home}
    // ]
  },
  {
    path: '/add',
    component: Home,
    name: '添加用户',
    hidden: false,
    children: [
      {path: '/add/user', name: '添加用户', component: addUser, hidden: false},

    ]
  }
]
