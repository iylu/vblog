// front
const FrontEntry = () => import('@/views/front/Entry.vue')
const Home = () => import('@/views/front/Home.vue')
const Archive = () => import('@/views/front/Archive.vue')
const Article = () => import('@/views/front/Article.vue')
const Tag = () => import('@/views/front/Tag.vue')
const TagPager = () => import('@/views/front/TagPager.vue')
const About = () => import('@/views/front/About.vue')
const SearchPager = () => import('@/views/front/SearchPager.vue')

// auth
const Auth = () => import('@/views/admin/Auth.vue')

// admin
const AdminEntry = () => import('@/views/admin/Entry.vue')
const ArticleList = () => import('@/views/admin/ArticleList.vue')
const Editor = () => import('@/views/admin/Editor.vue')
const TagList = () => import('@/views/admin/TagList.vue')
const Account = () => import('@/views/admin/Account.vue')

// 404
const NotFound = () => import('@/components/common/NotFound')

const routerConfig = [
  {
    path: '/',
    component: FrontEntry,
    children: [
      { path: '', alias: 'home', component: Home },
      { path: 'list', redirect: 'home' },
      { path: 'archive', component: Archive },
      {
        path: 'articles/:code',
        component: Article,
        meta: { scrollToTop: true }
      },
      { path: 'page/:number', component: Home },
      { path: 'tags', component: Tag },
      { path: 'tags/:name', component: TagPager },
      { path: 'about', component: About },
      { path: 'search', component: SearchPager }
    ]
  },
  { path: '/auth', component: Auth },
  {
    path: '/admin',
    component: AdminEntry,
    meta: {
      requireAuth: true,
      title: '内容管理',
      show: true
    },
    children: [
      {
        path: '',
        alias: 'articles',
        name: 'articles',
        component: ArticleList,
        meta: {
          title: '文章管理',
          show: true
        }
      },
      {
        path: 'articles/editor',
        name: 'newPost',
        component: Editor,
        meta: {
          title: '文章新建'
        }
      },
      {
        path: 'articles/editor/:code',
        name: 'editor',
        component: Editor,
        meta: {
          title: '文章编辑(查看)'
        }
      },
      {
        path: 'tags',
        name: 'tags',
        component: TagList,
        meta: {
          title: '标签管理',
          show: true
        }
      },
      {
        path: 'account',
        name: 'account',
        component: Account,
        meta: {
          title: '账户管理',
          show: true
        }
      }
    ]
  },
  { path: '*', component: NotFound }
]

export default routerConfig
