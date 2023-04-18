

const getDate= () =>{
    const today = new Date();

    const options = {
        weekday: "long",
        day : "numeric",
        month: "long",
        year: "numeric"
    }

    return today.toLocaleDateString('en-NG', options);
}

module.exports = getDate;