export default (context, inject) =>
  inject('utils', {
    diff: require('./diff').default,
    wrapLoading: require('./wrapLoading').default,
  })
