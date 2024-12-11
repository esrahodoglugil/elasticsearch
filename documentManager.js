const { client } = require('./elasticsearchClient');

async function addDocument(indexName, document) {
  try {
    const response = await client.index({
      index: indexName,
      id: document.id, // Burada id alanını _id ile eşleştiriyoruz
      document,
      refresh: true, // Hemen sorgulanabilir hale getirir
    });
    console.log('Doküman eklendi:', response);
  } catch (error) {
    console.error('Doküman eklenemedi:', error.message);
  }
}

/*async function updateDocument(indexName, id, updatedFields) {
  try {
    const response = await client.update({
      index: indexName,
      id,
      doc: updatedFields,
    });
    console.log('Doküman güncellendi:', response);
  } catch (error) {
    console.error('Güncelleme hatası:', error.message);
  }
}*/

async function deleteDocument(indexName, id) {
  try {
    const response = await client.delete({
      index: indexName,
      id,
    });
    console.log('Doküman silindi:', response);
  } catch (error) {
    console.error('Silme hatası:', error.message);
  }
}

module.exports = { addDocument, deleteDocument };
