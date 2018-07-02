export function persist (tableRef, id, data) {
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
