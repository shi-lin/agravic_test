import { firestore } from 'firebase/app'
import { getNode as getUserNode } from './users'

export const init = () => ({
  text: '',
  user: { id: '', name: '', image: '' },
  ctime: 0,
})

const coll = (artworkId = '', parentId = '') => {
  let ref = firestore()
    .collection('artworks')
    .doc(artworkId)
    .collection('comments')

  if (parentId) {
    ref = ref.doc(parentId).collection('comments')
  }

  return ref
}

export const get = async (artworkId, parentId, commentId) => {
  const doc = await coll(artworkId, parentId).doc(commentId).get()
  return { id: doc.id, ...doc.data() }
}

export const list = async (artworkId, parentId) => {
  const query = coll(artworkId, parentId).orderBy('ctime', 'desc')
  const { docs } = await query.get()
  return docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}

export const create = async (artworkId, parentId, text = '') => {
  if (!text) return

  const user = await getUserNode()
  const ctime = parseInt(Date.now() / 1000, 10)

  const ref = coll(artworkId, parentId).doc()
  await ref.set({ text, user, ctime })
  return ref.id
}

// export const update = async (artworkId, commentId) => {}

// export const del = async (artworkId, commentId) => {}
