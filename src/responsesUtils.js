// Functions only called in typeResponses
const respondHeader = (request,response,status,content,contentType) => {
    console.log(contentType);
    const headers = {
        'Content-Type': contentType,
        'Content-Length': Buffer.byteLength(content, 'utf8')
    };

    response.writeHead(status, headers);

    if(request.method !== 'HEAD') {
        response.write(content);
    };

    response.end();
}

// Status Codes
const statusCodes = (typeResponse) => {

    // Fucntions to determine what status code does
    const respondStatus = (request, response, status, message, id=null) => {

        const responseJSON = {message: message};

        // Check for id
        if(id !== null)
            responseJSON.id = id;

        typeResponse(request,response,status,responseJSON);
    }

    const queryBasedResponse = ( 
        request, response, 
        queryParam, wantedValue,
        gStatus, gMessage, bStatus, bMessage, id) => {

        // Check for validity
        if(request.query[queryParam] !== wantedValue || !request.query[queryParam]){
            respondStatus(request,response,bStatus,bMessage,id);
            return;
        }

        respondStatus(request,response,gStatus,gMessage);
    }

    const success = (request, response) => {
    respondStatus(request, response, 200, 
        'This is a successful response.');
    }
    const notFound = (request,response) => {
        respondStatus(request, response, 404, 
            'The page you are looking for was not found.',
            'notFound');
    }
    const badRequest = (request,response) => {
        queryBasedResponse(request,response,
            'valid', 'true',
            200,'This request has the required parameters.',
            400,'Missing valid query parameter set to true.','badRequest');
    }
    const unauthorized = (request,response) => {
        queryBasedResponse(request,response,
            'loggedIn', 'yes',
            200,'You have successfully viewed the content.',
            400,'Missing loggedIn query parameter set to yes.','unauthorized');
    }
    const forbidden = (request, response) => {
        respondStatus(request, response, 403, 
            'You do not have access to this content.');
    }
    const internal = (request, response) => {
        respondStatus(request, response, 500, 
            'Internal Server Error. Something went wrong.');
    }
    const notImplemented = (request, response) => {
        respondStatus(request, response, 501, 
            'A get request for this page has not been implemented yet. ' +
            'Check again later for updated content.');
    }

    return { 
        success,
        notFound,
        badRequest,
        unauthorized,
        forbidden,
        internal,
        notImplemented
    }
}

module.exports = {
    //for typeReponses
    respondHeader,
    statusCodes
}