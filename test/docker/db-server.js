/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();

const express = require('express');
const { exec } = require('child_process');
const { promisify } = require('util');

const app = express();
const port = 3001;

const dbHost = process.env.DATABASE_HOST;
const dbPort = process.env.DATABASE_PORT;
const username = process.env.DATABASE_USERNAME;
const dbPassword = process.env.DATABASE_PASSWORD;
const dbName = process.env.DATABASE_NAME;
const dbBinPath = process.env.DATABASE_BIN_PATH;

const execAsync = promisify(exec);

app.get('/save-db', async (req, res) => {
	try {
		const saveCommand = `${dbBinPath}/pg_dump -U ${username} --clean ${dbName} > ${dbBinPath}/db_backup.dump`;

		const { stdout } = await execAsync(saveCommand, {
			env: {
				PGPASSWORD: dbPassword,
			},
		});
		console.log('Database saved successfully');

		res.send('Database saved successfully');
	} catch (error) {
		console.error('Ошибка при сохранении базы данных:', error);
		res.status(500).send(error);
	}
});

app.get('/restore-db', async (req, res) => {
	try {
		const restoreCommand = `${dbBinPath}/psql -U ${username} -d ${dbName} < ${dbBinPath}/db_backup.dump`;

		const { stdout } = await execAsync(restoreCommand, {
			env: {
				PGPASSWORD: dbPassword,
			},
		});

		res.send('Database restored successfully');
	} catch (error) {
		console.error('Ошибка при восстановлении базы данных:', error);
		res.status(500).send(error);
	}
});

app.listen(port, () => {
	console.log(dbHost, dbPort, username, dbPassword, dbName);
	console.log(`DB server listening at http://localhost:${port}`);
});
