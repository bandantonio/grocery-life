const emoji = require('node-emoji');

let validateDate = (date) => {
    let dateRegex = /^\d{4}[-.\/]\d{1,2}[-.\/]\d{1,2}$/ig;
    return (date.match(dateRegex) ? true : false);
}

let formatDbResponse = (dbResponse) => {
    let formattedResponse = dbResponse.map(item =>
        emoji.emojify(`:white_check_mark: ${item.grocery} - :clock3: ${item.expiration_date}`)).join('\n');
    return formattedResponse;
}

module.exports = {
    validateDate,
    formatDbResponse
}