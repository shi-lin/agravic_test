import { firestore } from 'firebase/app'

export const init = () => ({
  id: 0,
  text: '',
})

const coll = () =>
  firestore()
    .collection('tags')
    .withConverter({
      fromFirestore: (doc) => ({
        id: doc.id,
        text: doc.data().text,
      }),
      toFirestore: (tag) => ({
        text: tag.text,
      }),
    })

// export const get = async () => {}

export const list = async () => {
  const { docs = [] } = await coll().get()
  return docs.map((doc) => doc.data())
}

export const create = async (text = '') => {
  if (!text) throw new Error('empty text')

  const rs = await coll().where('text', '==', text).get()
  if (!rs.empty) {
    return rs.docs[0].data()
  }

  const doc = coll().doc()
  await doc.set({ text })
  return (await doc.get()).data()
}

// export const update = async () => {}

// export const del = async () => {}
