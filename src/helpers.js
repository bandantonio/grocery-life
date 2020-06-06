let validateDate = (date) => {
    let dateRegex = /^\d{4}[-.\/]\d{1,2}[-.\/]\d{1,2}$/gi;
    return (date.match(dateRegex) ? true : false);
}

module.exports = {
    validateDate
}