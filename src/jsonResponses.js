//Responds json requests

const { respondHeader, statusCodes } = require('./responsesUtils');

const respondJSON = (request,response,status, object) => {
    const content = JSON.stringify(object);
    const contentType = 'application/json';
    
    // writes the header based on contents
    respondHeader(request,response,status,content,contentType);
}

module.exports = statusCodes(respondJSON);