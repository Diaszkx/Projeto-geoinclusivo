function all(db, sql, params = []) { return new Promise((resolve, reject) => { db.all(sql, params, (error, rows) => error ? reject(error) : resolve(rows)); }); }
function get(db, sql, params = []) { return new Promise((resolve, reject) => { db.get(sql, params, (error, row) => error ? reject(error) : resolve(row)); }); }
function run(db, sql, params = []) { return new Promise((resolve, reject) => { db.run(sql, params, function callback(error) { error ? reject(error) : resolve({ id: this.lastID, changes: this.changes }); }); }); }
module.exports = { all, get, run };
