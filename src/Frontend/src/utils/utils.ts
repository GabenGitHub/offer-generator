const formatNumberWithCommas = (number: number) => {
    return number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const formatDate = (date: string) => {
    var options: {} = { year: 'numeric', month: 'numeric', day: 'numeric' };
    // TODO: String.prototype.replaceAll supported from Node.js v15 or higher
    const dateArr = new Date(date).toLocaleDateString("hu-HU", options).split(" ");
    return dateArr.concat(dateArr[0] + dateArr[1] + dateArr[2])[3];
}

export { formatNumberWithCommas, formatDate };