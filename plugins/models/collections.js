import { auth, firestore } from 'firebase/app'
import { getNode as getArtworkNode } from './artworks'

export const init = ({
  title = '',
  visibility = 'ALL', // ALL / LINK / SELF
  artworks = [],
} = {}) => ({
  title,
  visibility,
  artworks,
})

const coll = (userId = auth().currentUser.uid) =>
  firestore()
    .collection('users')
    .doc(userId)
    .collection('collections')
    .withConverter({
      toFirestore: (data) => init(data),
      fromFirestore: (snap) => ({
        id: snap.id,
        ...init(snap.data()),
      }),
    })

export const get = async (id, userId) => {
  const snap = await coll(userId).doc(id).get()
  return snap.data()
}

export const list = async (userId) => {
  const { docs } = await coll(userId).get()
  return docs.map((doc) => doc.data())
}

export const create = async (data) => {
  const ref = coll().doc()
  await ref.set(init(data))
  return ref.id
}

export const add = async (id, artworkId) => {
  const doc = coll().doc(id)
  const collection = (await doc.get()).data()

  let artwork = collection.artworks.find((p) => p.id === artworkId)
  if (artwork) return

  artwork = await getArtworkNode(artworkId)
  const artworks = firestore.FieldValue.arrayUnion(artwork)
  await doc.update({ artworks })
}

export const remove = async (id, artworkId) => {
  const doc = coll().doc(id)
  const collection = (await doc.get()).data()

  const artwork = collection.artworks.find((p) => p.id === artworkId)
  if (!artwork) return

  const artworks = firestore.FieldValue.arrayRemove(artwork)
  await doc.update({ artworks })
}

// export const update = async (id, data) => {}

export const del = async (id) => {
  await coll().doc(id).delete()
}
