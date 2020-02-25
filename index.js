const express = require('express');

const app = express();
const port = 3000;

app.use('/api/', require('./routes'));

app.listen(port, () => console.log(`app listening on port ${port}!`));
