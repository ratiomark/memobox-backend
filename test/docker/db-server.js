const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = 3001;

app.get('/save-db', (req, res) => {
	exec(
		'pg_dump -U postgres dbname > /backups/db_backup.dump',
		(error, stdout, stderr) => {
			if (error) {
				res.status(500).send(stderr);
			} else {
				res.send('Backup created successfully');
			}
		},
	);
});

app.get('/restore-db', (req, res) => {
	exec(
		'psql -U postgres dbname < /backups/db_backup.dump',
		(error, stdout, stderr) => {
			if (error) {
				res.status(500).send(stderr);
			} else {
				res.send('Database restored successfully');
			}
		},
	);
});

app.listen(port, () => {
	console.log(`DB server listening at http://localhost:${port}`);
});
