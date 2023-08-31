const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../client/dist')));

// Serve the service worker script
app.get('/service-worker.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'service-worker.js'));
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/htmlRoutes')(app);

app.listen(PORT, () => console.log(`Now listening on: http://localhost:${PORT}`));
