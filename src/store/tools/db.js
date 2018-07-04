export function fetchAll (state, collection) {
  return state.db.collection(collection).get()
    .catch(error => {
      console.log('Could not fetch data from database', error)
      return []
    })
}

export function persist (state, collection, id, data) {
  let tableRef = state.db.collection(collection)
  // add new document
  if (!id.length) {
    data.createdOn = new Date()
    return tableRef.add(data)
      .then(docRef => {
        console.log('Document written with ID: ', docRef.id)
        return docRef.id
      })
      .catch(error => console.error('Error adding document: ', error))
  } else {
    // update existing document
    tableRef.doc(id).update(data)
      .then(res => console.log('Data saved'))
      .catch(err => console.error('something went wrong', err))
  }
}
