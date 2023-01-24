import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('payziff', 'root', 'admin123', {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log
});

async function assertDatabaseConnectionOk() {
	console.log(`Checking database connection...`);
	try {
		await sequelize.authenticate();
		console.log('Database connection OK!');
	} catch (error) {
		console.log('Unable to connect to the database:');
		console.log(error.message);
		process.exit(1);
	}
}

assertDatabaseConnectionOk();

export default sequelize;