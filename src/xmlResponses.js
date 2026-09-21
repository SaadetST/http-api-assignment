//Responds xml requests

const { toXML } = require('jstoxml');
const { respondHeader, statusCodes } = require('./responsesUtils');

const respondXML = (request,response,status, object) => {
    const config = {
        indent: '    '
    };
    
    const content = toXML({response: object},config);
    const contentType = 'text/xml';

    respondHeader(request,response,status,content,contentType);
}

module.exports = statusCodes(respondXML);