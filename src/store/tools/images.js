import firebase from 'firebase/app'
import 'firebase/storage'

export function upload (fileName, file) {
  console.log('Uploading ...')
  let ref = firebase.storage().ref()
  let uploadTask = ref.child(fileName).putString(file, 'data_url')

  return uploadTask.then(function (snapshot) {
    // Upload completed successfully, now we can get the download URL
    return snapshot.ref.getDownloadURL().then(function (downloadURL) {
      console.log('Uploaded image to', downloadURL)
      return downloadURL
    })
  }).catch(error => console.error(error.code))
}

export function getUrl (fileName) {
  let ref = firebase.storage().ref().child(fileName)

  return ref.getDownloadURL().then(url => { return url }).catch(e => {
    return null
  })
}
