const { client } = require('./elasticsearchClient');

async function createIndex(indexName) {
  try {
    const exists = await client.indices.exists({ index: indexName });
    if (!exists) {
      const response = await client.indices.create({
        index: indexName, 
        body: {
          mappings: {
            properties: {
              id: { type: 'integer' },
              name: { type: 'text' },
              price: { type: 'double' },
              category: { type: 'keyword' },
              brand: { type: 'keyword' },
            },
          },
        },
      });
      console.log('İndeks oluşturuldu:', response);
    } else {
      console.log(`İndeks zaten mevcut: ${indexName}`);
    }
  } catch (error) {
    console.error('İndeks oluşturulamadı:', error.message);
  }
}

async function deleteIndex(indexName) {
  try {
    const exists = await client.indices.exists({ index: indexName });
    if (exists) {
      const response = await client.indices.delete({ index: indexName });
      console.log(`Index silindi: ${indexName}`, response);
    } else {
      console.log(`Index zaten mevcut değil: ${indexName}`);
    }
  } catch (error) {
    console.error('Index silinemedi:', error.message);
  }
}

module.exports = { createIndex, deleteIndex };
