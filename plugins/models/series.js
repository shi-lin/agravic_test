import { auth, firestore } from 'firebase/app'

export const init = ({
  title = '',
  desc = '',
  end = false,
  original = false,
  genre = null,
} = {}) => ({
  title,
  desc,
  end,
  original,
  genre,
})

const nodeConverter = {
  fromFirestore: (snap) => ({
    id: snap.id,
    title: snap.data().title,
  }),
  toFirestore: (data) => ({
    title: data.title,
  }),
}

const converter = {
  fromFirestore: (snap) => ({ id: snap.id, ...init(snap.data()) }),
  toFirestore(data) {
    const series = init(data)
    if (!series.title) throw new Error('empty title')
    return init(series)
  },
}

const coll = () => {
  const userId = auth().currentUser.uid
  return firestore() //
    .collection('users')
    .doc(userId)
    .collection('series')
}

export const get = async (id) => {
  const snap = await coll().withConverter(converter).doc(id).get()
  return snap.data()
}

export const list = async (full = false) => {
  const snaps = await coll()
    .withConverter(full ? converter : nodeConverter)
    .get()
  return snaps.docs.map((snap) => snap.data())
}

export const create = async (data) => {
  const ref = coll().withConverter(converter).doc()
  await ref.set(data)
  return ref.id
}

export const update = async (id, update) => {
  const ref = coll().doc(id)
  const { id: _, ...rest } = update
  await ref.update(rest)
}

export const del = async (id) => {
  await coll().doc(id).delete()
}
