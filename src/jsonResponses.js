const { respondHeader, statusCodes } = require('./responsesUtils');

const respondJSON = (request,response,status, object) => {
    const content = JSON.stringify(object);

    const contentType = 'application/json';
    //console.log(contentType);

    respondHeader(request,response,status,content,contentType);
}

module.exports = statusCodes(respondJSON);