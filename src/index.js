const express = require("express"); 
const cors = require("cors");
const path = require('path');
const config = require('./config/env')

const app = express(); 
const PORT = config.PORT || 0; 
const v1Router = require("./v1/routes");

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));
app.use("/api/v1", v1Router);

app.listen(PORT, () => { 
    console.log(`Servidor corriendo en el puerto ${PORT}`); 
});