const formatNumberWithCommas = (number: number) => {
    return  Math.floor(number)?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const formatFloatNumberWithCommas = (number: number) => {
    return  number?.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const formatDate = (date: string) => {
    var options: {} = { year: 'numeric', month: 'numeric', day: 'numeric' };
    // TODO: String.prototype.replaceAll supported from Node.js v15 or higher
    const dateArr = new Date(date).toLocaleDateString("hu-HU", options).split(" ");
    return dateArr.concat(dateArr[0] + dateArr[1] + dateArr[2])[3];
}

export { formatNumberWithCommas, formatFloatNumberWithCommas, formatDate };