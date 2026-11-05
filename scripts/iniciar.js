// Inicializa o banco na primeira execução e abre API + interface em um comando.
const { spawn, spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const backend = path.join(root, 'backend');
const frontend = path.join(root, 'frontend');
const database = path.join(backend, 'src', 'database', 'geoinclusivo.db');
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
function execute(script) {
  const result = spawnSync(npm, ['run', script], { cwd: backend, stdio: 'inherit', shell: process.platform === 'win32' });
  if (result.status !== 0) process.exit(result.status || 1);
}
if (!fs.existsSync(path.join(backend, 'node_modules')) || !fs.existsSync(path.join(frontend, 'node_modules'))) {
  console.error('Dependências ausentes. Execute primeiro: npm install'); process.exit(1);
}
if (!fs.existsSync(database)) {
  console.log('\nPreparando o banco de dados pela primeira vez...');
  execute('db:init');
  execute('db:seed');
}
console.log('\nGeoInclusivo: abra http://localhost:5173 no navegador.');
console.log('Para encerrar, pressione Ctrl+C.\n');
const api = spawn(npm, ['run', 'start'], { cwd: backend, stdio: 'inherit', shell: process.platform === 'win32' });
const web = spawn(npm, ['run', 'dev', '--', '--host', '127.0.0.1'], { cwd: frontend, stdio: 'inherit', shell: process.platform === 'win32' });
let stopping = false;
function stop() {
  if (stopping) return;
  stopping = true;
  for (const child of [api, web]) if (child.pid) child.kill('SIGTERM');
}
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
for (const child of [api, web]) child.on('exit', (code) => {
  if (!stopping) { console.error('Um serviço foi encerrado. Código:', code); stop(); process.exitCode = code || 1; }
});
