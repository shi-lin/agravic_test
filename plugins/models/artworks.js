import { auth, firestore } from 'firebase/app'
import { getNode as getUserNode } from './users'

export const init = ({
  type = 'IMAGE',
  user = { id: '', name: '', image: '' },
  title = '',
  desc = '',
  body = '',
  series = null,
  files = [],
  tags = [],
  forbid_tags = false,
  visibility = 'ALL', // ALL / FOLLOWERS / MUTUAL_FOLLOWERS / LINK / SELF
  forbid_comments = false,
  rating = 'G', // G / R-18 / R-18G
  original = false,
  target = '', // BG / BL / GL / YUME
  rps = false,
  ctime = 0,
  mtime = 0,
  published = false,
  likes = [],
  // num_collect = 0,
} = {}) => ({
  type,
  user,
  title,
  desc,
  body,
  series,
  files,
  tags,
  forbid_tags,
  visibility,
  forbid_comments,
  rating,
  original,
  target,
  rps,
  ctime,
  mtime,
  published,
  likes,
  // num_collect,
})

export const coll = () =>
  firestore()
    .collection('artworks')
    .withConverter({
      toFirestore: (data) => init(data),
      fromFirestore: (snap) => {
        const data = init(snap.data())
        return {
          id: snap.id,
          ...data,
          likes: data.likes.map((r) => r.id),
        }
      },
    })

export const get = async (id) => {
  if (!id) throw new Error('empty id')

  const doc = await coll().doc(id).get()
  return doc.data()
}

export const getNode = async (id) => {
  const { title, user, files } = await get(id)
  return { id, title, user, files }
}

export const list = async (filters = { type: 'IMAGE', published: true }) => {
  let query = coll()
  Object.entries(filters).forEach(([key, value]) => {
    query = query.where(key, '==', value)
  })
  const { docs } = await query.get()
  return docs.map((doc) => doc.data())
}

export const create = async (type = 'IMAGE') => {
  const user = await getUserNode()

  const query = coll()
    .where('user.id', '==', user.id)
    .where('type', '==', type)
    .where('published', '==', false)

  const snaps = await query.get()
  if (!snaps.empty) {
    const snap = snaps.docs[0]
    return snap.data()
  } else {
    const doc = coll().doc()
    await doc.set({ type, user })
    const snap = await doc.get()
    return snap.data()
  }
}

export const update = async (id, update) => {
  const data = { ...update }
  if (data.ctime > 0) {
    data.mtime = firestore.FieldValue.serverTimestamp()
  } else if (data.published) {
    data.ctime = firestore.FieldValue.serverTimestamp()
  }
  await coll().doc(id).update(data)
}

export const like = async (id) => {
  const uid = auth().currentUser.uid
  const ref = firestore().collection('users').doc(uid)

  await coll()
    .doc(id)
    .update({
      likes: firestore.FieldValue.arrayUnion(ref),
    })
}

export const unlike = async (id) => {
  const uid = auth().currentUser.uid
  const ref = firestore().collection('users').doc(uid)

  await coll()
    .doc(id)
    .update({
      likes: firestore.FieldValue.arrayRemove(ref),
    })
}

// export const del = async () => {}
