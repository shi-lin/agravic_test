import { auth, firestore } from 'firebase/app'

export const init = ({
  id_url = '',
  gender = '',
  family_name = '',
  given_name = '',
  name = '', // nickname
  self_intro = '',
  image = '',
  address = '',
  address_show = false,
  birth = '',
  birth_show = false,
  career = '',
  career_show = false,
  email = '',
  email_show = false,
  ctime = 0,
  followers = [],
  followings = [],
} = {}) => ({
  id_url,
  gender,
  family_name,
  given_name,
  name,
  self_intro,
  image,
  address,
  address_show,
  birth,
  birth_show,
  career,
  career_show,
  email,
  email_show,
  ctime,
  followers,
  followings,
})

const doc = (id = auth().currentUser.uid) =>
  firestore()
    .collection('users')
    .doc(id)
    .withConverter({
      fromFirestore: (snap) => {
        const data = snap.data()
        return {
          ...data,
          id: snap.id,
          followers: data.followers?.map((p) => p.id) ?? [],
          followings: data.followers?.map((p) => p.id) ?? [],
        }
      },
    })

export const get = async (id) => {
  const snap = await doc(id).get()
  return snap.data()
}

export const getNode = async (userId) => {
  const { id, name, image } = await get(userId)
  return { id, name, image }
}

export const update = async (update) => {
  await doc().update(update)
}

export const follow = async (id) => {
  const user = doc(id)
  const me = doc()
  await user.update({ followers: firestore.FieldValue.arrayUnion(me) })
  await me.update({ followings: firestore.FieldValue.arrayUnion(user) })
}

export const unfollow = async (id) => {
  const user = doc(id)
  const me = doc()
  await user.update({ followers: firestore.FieldValue.arrayRemove(me) })
  await me.update({ followings: firestore.FieldValue.arrayRemove(user) })
}
