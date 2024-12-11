const { client } = require('./elasticsearchClient');

async function bulkInsert(indexName, documents) {
  const body = documents.flatMap(doc => [
    { index: { _index: indexName, _id: doc.id } }, // id alanını _id ile eşleştiriyoruz
    doc,
  ]);

  try {
    const response = await client.bulk({ refresh: true, body });

    if (response.errors) {
      console.error('Hatalı dokümanlar:');
      response.items.forEach(item => {
        if (item.index && item.index.error) {
          console.error(`Hata: ${item.index.error.reason}, ID: ${item.index._id}`);
        }
      });
    } else {
      console.log('Toplu veri ekleme tamamlandı.');
    }
  } catch (error) {
    console.error('Toplu veri ekleme hatası:', error.message);
  }
}

module.exports = { bulkInsert };
