// PSEUDO CODE: 
// ✅ Get the eslint up 
// ✅ Get the page up + css
// ✅ make a function that works /success / notFOund
// ✅ convert the function to dynamic
// ✅ function that takes in ?_____=boolen in url
// add an xml version to the functions
// fetch function WORK with button
// 404 page
// double check req rq


const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const xmlHandler = require('./xmlResponses.js');
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// HTML elements
//const page = document.querySelector('#page');
//const pageType = document.querySelector('#type');
//const sendButton = document.querySelector('#send');

//sendButton.addEventListener('click', handleSend);

const urlStruct = {
    '/': htmlHandler.getIndex,
    '/style.css': htmlHandler.getCSS,

    '/success': jsonHandler.success,
    '/successXML': xmlHandler.success,
    
    '/badRequest': jsonHandler.badRequest,
    '/badRequestXML': xmlHandler.badRequest,
    
    '/unauthorized': jsonHandler.unauthorized,
    '/unauthorizedXML': xmlHandler.unauthorized,
    
    '/forbidden': jsonHandler.forbidden,
    '/forbiddenXML': xmlHandler.forbidden,
    
    '/internal': jsonHandler.internal,
    '/internalXML': xmlHandler.internal,
    
    '/notImplemented': jsonHandler.notImplemented,
    '/notImplementedXML': xmlHandler.notImplemented,
    
    notFound: jsonHandler.notFound,
};

const onRequest = (request,response) =>{
    const protocol = request.connection.encrypted ? 'https' : 'http';
    const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);
    
    request.query = Object.fromEntries(parsedUrl.searchParams);

    //console.log(urlStruct[parsedUrl.pathname]);
    if(urlStruct[parsedUrl.pathname]) {
        return urlStruct[parsedUrl.pathname](request, response);
    }else{
        return urlStruct.notFound(request, response);
    }
};

http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);