const currencyFormatter = (value) => {
    let currency = new Intl.NumberFormat("ur-PK", {
        style: "currency", currency: "PKR",
    });

    return currency.format(value);
};

const fileToBase64 = (file) => {
    return new Promise((resolve) => {
        let baseURL = "";
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            baseURL = reader.result;
            resolve(baseURL);
        };
    });
};

const responseToObject = (response) => {
    const result = {};
    for (const key in response) {
        if (response.hasOwnProperty(key)) {
            const keys = key.split(".");
            const value = response[key];
            let currentObject = result;
            for (let i = 0; i < keys.length - 1; i++) {
                const currentKey = keys[i];
                currentObject[currentKey] = currentObject[currentKey] || {};
                currentObject = currentObject[currentKey];
            }
            const finalKey = keys[keys.length - 1];
            currentObject[finalKey] = value;
        }
    }
    return result;
}

const formatDate = (date, isObject) => {
    if (!date) return "N/A";
    let d = date === "current" ? new Date() : new Date(date);
    let day = d.getDate() <= 9 ? `0${d.getDate()}` : d.getDate();
    let month = d.getMonth() + 1 <= 9 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
    let year = d.getFullYear();
    return Number.isInteger(parseInt(day)) ? isObject ? {
        day: day, month: month, year: year
    } : `${year}-${month}-${day}` : "N/A";
};
const stringToArray = (str) => {
    return str.split(',').map(item => item.trim());
}

export {currencyFormatter, fileToBase64, responseToObject, formatDate, stringToArray};
