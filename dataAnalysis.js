const getMostFrequentUserCountries = (data) => {
    let countries = new Map(); // For storing all the Countries along with their frequency in data

    // Calculating the frequency of Users Countries
    data.forEach(userData => {
        if (countries.has(userData["country"])) {
            countries.set(userData["country"], countries.get(userData["country"]) + 1);
        } else {
            countries.set(userData["country"], 1);
        }
    });

    // Finding the top 3 Countries where Users are from
    let countriesCount = [...countries.entries()]; // Converting a map object into an array
    countriesCount.sort((a, b) => b[1] - a[1]);

    let mostFrequentCountries = countriesCount.slice(0, 3); // Storing the top 3 Countries where Users are from along with their count

    return mostFrequentCountries;
}

const fetchData = async (url) => {
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        }
        else {
            throw new Error('Cannot parse data');
        }
    }
    catch (error) {
        console.log(error);
    }
}

const analyseData = async () => {
    const url = '/mockAPI.json'; // Put your own local server address before "/mockAPI.json"

    const data = await fetchData(url); // Fetching the data from API

    const mostFrequentCountries = getMostFrequentUserCountries(data); // Getting the top 3 Countries where Users are from along with their count

    console.log("Top 3 frequent Countries in data are:");
    mostFrequentCountries.forEach((countryAndCount) => {
        console.log(`${countryAndCount[0]} : ${countryAndCount[1]}`);
    });
}

analyseData();