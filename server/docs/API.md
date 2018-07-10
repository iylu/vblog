### Restful API

```
/api/list?pageNum=1&pageSize=8&tag=vue
/api/articles
/api/articles/:code
/api/archive
/api/page/:number
/api/tags
/api/tags/:name
/api/search?q=koa2
```

### Restful 接口数据

`/api/list?pageNum=1&pageSize=8&tag=vue`

```
[{
  _id(code),
  title,
  abstract,
  tags:['node.js', 'vue'],
  meta: {
    created_at,
    updated_at
  }
}]
```

`/api/articles/:code 文章详情页面`

```
{
  _id(code),
  title,
  abstract,
  content,
  tags:['node.js', 'vue'],
  meta: {
    created_at,
    updated_at
  }
}
```

`/api/archive 按时间线归档页面 archive页面`

```
[{
  _id(code),
  title,
  meta: {
    created_at
  }
}]
```

`/api/tag tag页面`

```
[{ name: '' },{ name: '' }]
```

`/api/tags/:name 某个具体标签下的页面 即tagPager页面 接口同首页，只是返回数据不一样`

```
[{
  _id(code),
  title,
  abstract,
  tags:['node.js', 'vue'],
  meta: {
    created_at,
    updated_at
  }
}]
```

`/api/search?q=koa 搜索结果页面: 返回的接口信息 和 首页相同`

```
[{
  _id(code),
  title,
  abstract,
  tags:['node.js', 'vue'],
  meta: {
    created_at,
    updated_at
  }
}]
```

`/api/page/:number 分页时提供接口,链接到相应页面`

```
{
  articleList:[{
    _id(code),
    title,
    abstract,
    tags:['node.js', 'vue'],
    meta: {
      created_at,
      updated_at
    }
  }],
  totalNumber,
  totalPage
}
```

创建标签两种方法:

1.  creatTag
2.  创建文章时填写不存在的标签
