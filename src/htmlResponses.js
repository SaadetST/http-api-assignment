//Responds html requests

const fs = require('fs');
const { respondHeader } = require('./responsesUtils');

const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../client/style.css`);

// write the header and the response 
const getIndex = (request, response) => {
    respondHeader(request,response,200,index,'text/html');
}
const getCSS = (request, response) => {
    respondHeader(request,response,200,css,'text/css');
}

module.exports = {
    getIndex,
    getCSS,
}