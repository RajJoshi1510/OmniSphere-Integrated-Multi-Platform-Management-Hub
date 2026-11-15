/**
 * OmniSphere Enterprise Platform - Process Supervisor
 * Simple English Comment:
 * Runs all 5 MERN projects concurrently with color-coded console output.
 */

const { spawn } = require('child_process');
const path = require('path');

const isWin = process.platform === 'win32';
const npmCmd = isWin ? 'npm.cmd' : 'npm';

const services = [
  // 1. Car Rental
  { name: 'OmniDrive Backend', cwd: '1-Car-Rental/backend', cmd: 'node', args: ['server.js'], port: 4001, color: '\x1b[34m' },
  { name: 'OmniDrive Frontend', cwd: '1-Car-Rental/frontend', cmd: npmCmd, args: ['run', 'dev'], port: 5174, color: '\x1b[34m' },

  // 2. Hotel Booking
  { name: 'OmniStay Backend', cwd: '2-Hotel-Booking/backend', cmd: 'node', args: ['dist/hotel-booking-backend/src/index.js'], port: 5001, color: '\x1b[32m' },
  { name: 'OmniStay Frontend', cwd: '2-Hotel-Booking/frontend', cmd: npmCmd, args: ['run', 'dev'], port: 5175, color: '\x1b[32m' },

  // 3. E-Commerce
  { name: 'OmniMart Backend', cwd: '3-Ecommerce/backend', cmd: 'node', args: ['index.js'], port: 5002, color: '\x1b[35m' },
  { name: 'OmniMart Frontend', cwd: '3-Ecommerce/frontend', cmd: npmCmd, args: ['run', 'dev'], port: 5176, color: '\x1b[35m' },

  // 4. Social Media
  { name: 'OmniSocial Backend', cwd: '4-Social-Media/backend', cmd: 'node', args: ['index.js'], port: 5000, color: '\x1b[36m' },
  { name: 'OmniSocial Frontend', cwd: '4-Social-Media/frontend', cmd: npmCmd, args: ['run', 'dev'], port: 5177, color: '\x1b[36m' },

  // 5. Food Delivery
  { name: 'OmniBite Backend', cwd: '5-Food-Delivery/backend', cmd: 'node', args: ['server.js'], port: 4000, color: '\x1b[33m' },
  { name: 'OmniBite Frontend', cwd: '5-Food-Delivery/frontend', cmd: npmCmd, args: ['run', 'dev'], port: 5178, color: '\x1b[33m' },
  { name: 'OmniBite Admin', cwd: '5-Food-Delivery/admin', cmd: npmCmd, args: ['run', 'dev'], port: 5179, color: '\x1b[33m' }
];

console.log('\n====================================================================');
console.log('   🌟 OMNISPHERE ENTERPRISE PLATFORM — Launching All 5 Projects');
console.log('====================================================================\n');

const children = [];

services.forEach((srv) => {
  const fullCwd = path.resolve(__dirname, srv.cwd);
  const child = spawn(srv.cmd, srv.args, {
    cwd: fullCwd,
    shell: true,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env, PORT: srv.port.toString() }
  });

  child.stdout.on('data', (d) => {
    d.toString().trim().split('\n').forEach(line => {
      if (line.trim()) console.log(`${srv.color}[${srv.name}]\x1b[0m ${line}`);
    });
  });

  child.stderr.on('data', (d) => {
    d.toString().trim().split('\n').forEach(line => {
      if (line.trim()) console.error(`${srv.color}[${srv.name}:err]\x1b[0m ${line}`);
    });
  });

  children.push(child);
});

console.log('\n✅ All 5 platforms (11 services) have been launched!');
console.log('\nDirect Working Links:');
console.log('  • 1. OmniDrive Car Rental:    http://localhost:5174  | API: http://localhost:4001');
console.log('  • 2. OmniStay Hotel Booking:  http://localhost:5175  | API: http://localhost:5001');
console.log('  • 3. OmniMart E-Commerce:     http://localhost:5176  | API: http://localhost:5002');
console.log('  • 4. OmniSocial Media:        http://localhost:5177  | API: http://localhost:5000');
console.log('  • 5. OmniBite Food Delivery:  http://localhost:5178  | Admin: http://localhost:5179 | API: http://localhost:4000');
console.log('\nPress Ctrl+C at any time to stop all services.\n');

process.on('SIGINT', () => {
  console.log('\nShutting down all services...');
  children.forEach(c => {
    try { spawn('taskkill', ['/pid', c.pid, '/f', '/t'], { shell: true }); } catch(e){}
  });
  setTimeout(() => process.exit(0), 1000);
});
