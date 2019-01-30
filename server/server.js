const path = require('path');
const publicPath = path.join(__dirname, '../public');
const express = require('express');

var app = express();
const port = process.env.PORT || 8000;
app.use(express.static(publicPath));
app.listen(port, ()=>{
    console.log(`Server run on port ${port}`);
}); 
