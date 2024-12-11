const { client } = require('./elasticsearchClient');

async function searchDocuments(indexName, query) {
  try {
    const response = await client.search({
      index: indexName,
      body: {
        query: query || { match_all: {} },
      },
    });
    console.log('Arama sonuçları:', response.hits.hits.map((hit) => hit._source));
  } catch (error) {
    console.error('Arama hatası:', error.message);
  }
}

async function listAllDocuments(indexName) {
  try {
    const response = await client.search({
      index: indexName,
      body: {
        query: { match_all: {} },
      },
    });
    console.log('Tüm dokümanlar:');
    response.hits.hits.forEach((hit) => console.log(hit._source));
  } catch (error) {
    console.error('Doküman listeleme hatası:', error.message);
  }
}

module.exports = { searchDocuments, listAllDocuments };
