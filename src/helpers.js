let validateDate = (date) => {
    let dateRegex = /^\d{4}[-.\/]\d{1,2}[-.\/]\d{1,2}$/gi;
    return (date.match(dateRegex) ? true : false);
}

let daysToMilliseconds = (days) => {
    return days * 24 * 60 * 60 * 1000;
}

module.exports = {
    validateDate,
    daysToMilliseconds
}