let validateDate = (date) => {
    let dateRegex = /^\d{4}[-.\/]\d{1,2}[-.\/]\d{1,2}$/gi;
    return (date.match(dateRegex) ? true : false);
}

let daysToMilliseconds = (days) => {
    return days * 24 * 60 * 60 * 1000;
}

let formatGroceriesOutput = (groceries) => {
    let numberOfGroceries = Array.from(groceries).length;
    if (numberOfGroceries > 0) {
        return Array.from(groceries).map(item => {
            return `${item.grocery} - ${item.expiration_date}`;
        }).join('\n');
    } else {
        return `${groceries.grocery} - ${groceries.expiration_date}`;
    }
}

module.exports = {
    validateDate,
    daysToMilliseconds,
    formatGroceriesOutput
}