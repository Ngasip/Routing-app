function requireHTTPS(req, res, next){
    // The 'x-forwarded-proto' check is for Heroku
    if(!req.secure && req.get('x-forwarded-proto') !== 'https'){
        return res.redirect('http://' + req.get('host') + req.url);
    }
    next();
}

const express = require('express');
const app = express();

app.use(requireHTTPS);
app.use(express.static('./dist/routing-app'));

app.get('/*', (req, res) => 
res.sendFile('index.html', {root: 'dist/routing-app/'}),
);

const port = process.env.PORT || 8080
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})