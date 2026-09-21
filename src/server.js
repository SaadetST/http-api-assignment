const http = require('http');
const htmlHandler = require('./htmlResponses.js');
const jsonHandler = require('./jsonResponses.js');
const xmlHandler = require('./xmlResponses.js');

// opens a server port
const port = process.env.PORT || process.env.NODE_PORT || 3000;

// writes a response based on the request
const onRequest = (request,response) =>{
    // Parse request url
    const protocol = request.connection.encrypted ? 'https' : 'http';
    const parsedUrl = new URL(request.url, `${protocol}://${request.headers.host}`);
    
    request.query = Object.fromEntries(parsedUrl.searchParams);

    const accpetHeaders = request.headers.accept;
    
    // Find what content type the request asks for 
    let typeHandler = jsonHandler;
    if(accpetHeaders === 'text/xml')
    {
        typeHandler = xmlHandler;
    }

    // Call the correct response handler based on the url
    const urlHandler = {
        '/': htmlHandler.getIndex,
        '/style.css': htmlHandler.getCSS,
        
        // switches type
        '/success': typeHandler.success,
        '/notFound': typeHandler.notFound,
        '/badRequest': typeHandler.badRequest,
        '/unauthorized': typeHandler.unauthorized,
        '/forbidden': typeHandler.forbidden,
        '/internal': typeHandler.internal,
        '/notImplemented': typeHandler.notImplemented,
    }

    // Find handler functions for this url path
    const pathname = parsedUrl.pathname;
    if(urlHandler[pathname]) {
        return urlHandler[pathname](request, response);
    }else{
        return jsonHandler.notFound(request, response);
    }
};

http.createServer(onRequest).listen(port);
console.log(`Listening on 127.0.0.1: ${port}`);