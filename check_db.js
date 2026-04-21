import db from './config/db.config.js';

db.query('DESCRIBE tasks', (err, result) => {
  if (err) {
    console.error('Error describing table:', err);
  } else {
    console.log('Table schema:', result);
  }
  process.exit();
});
