const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const databasePath = process.env.DATABASE_URL || './src/database/geoinclusivo.db';
const resolvedPath = path.resolve(databasePath);
const db = new sqlite3.Database(resolvedPath, (error) => {
  if (error) { console.error('Erro ao conectar ao banco de dados:', error.message); process.exit(1); }
});
db.run('PRAGMA foreign_keys = ON');
module.exports = db;
