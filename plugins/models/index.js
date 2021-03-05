export default (context, inject) => {
  inject('models', {
    artworks: require('./artworks'),
    comments: require('./comments'),
    series: require('./series'),
    storage: require('./storage'),
    users: require('./users'),
    tags: require('./tags'),
    collections: require('./collections'),
  })
}
