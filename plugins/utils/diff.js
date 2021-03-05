import reduce from 'lodash/reduce'
import isEqual from 'lodash/isEqual'
import isObject from 'lodash/isObject'

const diff = (obj, base) =>
  !isObject(obj) || !isObject(base)
    ? obj
    : reduce(
        obj,
        (acc, value, key) =>
          isEqual(value, base[key])
            ? acc
            : { ...acc, [key]: diff(value, base[key]) },
        {}
      )

export default diff
