const express = require('express');
const app = express();
const port = 3000;
//require('dotenv').config();

app.use(express.json());

require('./Controllers/menu_do_dia')(app);

app.listen(port, () => {
    console.log(`[BOB AC] O servidor está ativo na porta ${port}`);
    }
);

