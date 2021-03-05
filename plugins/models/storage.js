import { auth, storage } from 'firebase/app'

const HASH_BYTES = 8 // string len 16

export const upload = async (buffer) => {
  const uid = auth().currentUser.uid

  const digest = await crypto.subtle.digest('SHA-256', buffer)
  const hash = Buffer.from(digest)
    .toString('hex', 0, HASH_BYTES)
    .padStart(HASH_BYTES * 2, '0')

  const path = `users/${uid}/${hash}.jpg`

  const ref = storage().ref(path)
  await ref.put(buffer)
  return await ref.getDownloadURL()
}
