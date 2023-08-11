const { createConnection } = require('typeorm');

const connection = createConnection({
  type: 'postgres',
  host: 'your-database-host',
  port: 5432,
  username: 'your-database-username',
  password: 'your-database-password',
  database: 'your-database-name',
  entities: ['src/entities/**/*.js'],
  migrations: ['src/migrations/**/*.js'],
  synchronize: true,
});

module.exports = connection;
