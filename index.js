const { client, checkConnection } = require('./elasticsearchClient'); // client eklendi
const { createIndex, deleteIndex } = require('./indexManager');
const { addDocument, deleteDocument } = require('./documentManager');
const { searchDocuments, listAllDocuments } = require('./searchManager');
const { bulkInsert } = require('./bulkManager');

async function main() {
  await checkConnection();

  // Yeni indeks adı
  const indexName = 'devices';

  // Doküman ekleme
  await addDocument(indexName, { id: 1, name: 'Smartphone', price: 800, category: 'Mobile' });

  // Doküman arama
  await searchDocuments(indexName, { match: { name: 'Smartphone' } });

  // Toplu veri ekleme
  await bulkInsert(indexName, [
    { id: 2, name: 'Laptop', price: 1200, category: 'Computers' },
    { id: 3, name: 'Smartwatch', price: 200, category: 'Wearable' },
  ]);

  // Doküman silme
  await deleteDocument('devices', 3);
   // İndeks oluşturma
   await createIndex(indexName);
  // İndeksi güncelle (refresh)
  await client.indices.refresh({ index: 'devices' });

  // Tüm dokümanları listeleme
  await listAllDocuments(indexName);

  // İndeksi silme (isteğe bağlı, eğer veri korumak istiyorsanız yoruma alın)
  // await deleteIndex(indexName);
}

main();
