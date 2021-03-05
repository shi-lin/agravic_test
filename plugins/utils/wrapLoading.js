import set from 'lodash/set'

export default (instance, statePath, methodNames = []) => {
  methodNames.forEach((name) => {
    const method = instance[name]
    instance[name] = async (...args) => {
      set(instance, statePath, true)
      try {
        return await method(...args)
      } catch (err) {
        console.error(err)
      } finally {
        set(instance, statePath, false)
      }
    }
  })
}
