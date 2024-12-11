const { Client } = require('@elastic/elasticsearch');

const client = new Client({
  node: 'http://localhost:9200',
  auth: {
    username: 'elastic', 
    password: 'password123',
  },
});

async function checkConnection() {
  try {
    await client.ping();
    console.log('Elasticsearch Bağlantısı Başarılı');
  } catch (error) {
    console.error('Elasticsearch Bağlantısı Hatası:', error);
  }
}

module.exports = { client, checkConnection };
//Elasticsearch bağlantısını ve istemciyi yönetir.