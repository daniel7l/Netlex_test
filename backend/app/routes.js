const { Router } = require('express');

const routes = new Router();

routes.get('/', (req, res) => {
    res.send(login.html);
   
    

})


module.exports = routes;