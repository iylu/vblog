export const articleList = state => state.articleList

export const article = state => state.article

export const prev = state => state.prev

export const next = state => state.next

export const tags = state => {
  let tagNames = []
  for (let tag of state.tags) {
    tagNames.push(tag.name)
  }
  return tagNames
}
