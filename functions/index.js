const functions = require('firebase-functions')
const admin = require('firebase-admin')
const serviceAccount = require('./service-account-key.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://seismic-spot-287016.firebaseio.com',
})

const EMPTY_USER = {
  id_url: '',
  gender: '',
  family_name: '',
  given_name: '',
  name: '',
  self_intro: '',
  image: '',
  address: '',
  address_show: false,
  birth: '',
  birth_show: false,
  career: '',
  career_show: false,
  email: '',
  email_show: false,
  ctime: 0,
}

exports.createProfile = functions.auth.user().onCreate(async (user) => {
  const { uid: id, displayName: name, photoURL: image, email } = user
  const ctime = parseInt(Date.now() / 1000, 10)
  const doc = admin.firestore().doc(`/users/${id}`)
  await doc.set({ ...EMPTY_USER, name, image, email, ctime })
})
