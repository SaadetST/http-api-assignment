// used npm jstoxml to parse into xml 
// and https://www.npmjs.com/package/jstoxml as reference
const { toXML } = require('jstoxml');

const respondXML = (request,response,status, object) => {
    const config = {
        indent: '    '
    };
    
    //const content = JSON.stringify(object);
    const content = toXML({response: object},config);

    const headers = {
        'Content-Type': 'application/xml',
        'Content-Length': Buffer.byteLength(content, 'utf8')
    };

    response.writeHead(status, headers);

    if(request.method !== 'HEAD') {
        response.write(content);
    };

    response.end();
}

// Status Codes
const success = (request, response) => {
    respondStatus(request, response, 200, 
        'This is a successful response');
}

const badRequest = (request,response) => {
    queryBasedResponse(request,response,
        'valid', 'true',
        200,'This request has the required parameters',
        400,'Missing valid query parameter set to true','badRequest');
}

const unauthorized = (request,response) => {
    queryBasedResponse(request,response,
        'loggedIn', 'yes',
        200,'This request has the required parameters',
        400,'Missing valid query parameter set to true','unauthorized');
}

const forbidden = (request, response) => {
    respondStatus(request, response, 403, 
        'This is a forbidden response');
}

const internal = (request, response) => {
    respondStatus(request, response, 500, 
        'This is an internal response');
}

const notImplemented = (request, response) => {
    respondStatus(request, response, 501, 
        'This is a response not yet implemented');
}

// Fucntions to determine what status code does
const respondStatus = (request, response, status, message, id=null) => {
    const responseJSON = {message: message};
    
    // Check for id
    if(id !== null)
        responseJSON.id = id;

    respondXML(request,response,status,responseJSON);
}

const queryBasedResponse = (request, response, 
    queryParam, wantedValue,
    gStatus, gMessage, bStatus, bMessage, id) => {

    // Check for validity
    if(request.query[queryParam] !== wantedValue || !request.query[queryParam]){
        respondStatus(request,response,bStatus,bMessage,id);
        return;
    }

    respondStatus(request,response,gStatus,gMessage);
}

module.exports =  {
    success,
    badRequest,
    unauthorized,
    forbidden,
    internal,
    notImplemented
}