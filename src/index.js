const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const hbs = require('hbs');

const staticPath = path.join(__dirname,'../public');
const partialPath = path.join(__dirname,'../templates/partials')
const viewsPath = path.join(__dirname,'../templates/views')
app.use(express.static(staticPath));
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath);


app.get('/',(req,res)=>{
    res.render('chat');
})

app.listen(port,()=>{
    console.log('listening at '+port);
})