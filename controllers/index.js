const gitServices = require('../services');
const path = require('path');

const getData = async (req, res, next) => {
    const data = await gitServices.fetchRepo(req.query.q);
    res.send(data).status(200);
}

const getIndexPage = (req,res,next) => {
    res.sendFile(path.join(__dirname,'../','index.html'));
}

const getHomePage = (req,res, next) => {
    res.sendFile(path.join(__dirname,'../','homePage.html'));
}

module.exports = {
    getData, getHomePage, getIndexPage
}