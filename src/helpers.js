let validateDate = (date) => {
    let dateRegex = /^\d{1,2}[-.\/]\d{1,2}[-.\/]\d{4}$/gi;
    return (date.match(dateRegex) ? true : false);
}

module.exports = {
    validateDate
}