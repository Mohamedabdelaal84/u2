/* Global Variables */
const zip = document.querySelector("#zip");
const dateDay = document.querySelector("#dateDay");
const temp = document.querySelector("#temp");
const content = document.querySelector("#content");
const feeling = document.querySelector(".content");

// Create a new date instance dynamically with JS
let d = new Date();
let date = d.toDateString();

// Personal API Key for OpenWeatherMap API
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=cdd095dbc2964fb07bf11f144de9f557&units=imperial';


/* Function called by event listener */
const generate = document.querySelector("#generate");
generate.addEventListener("click", (event) => {
    event.preventDefault();
    const madeURI = `${baseURL}${zip.value}${apiKey}`;
    getDate(madeURI)
        .then((date) => {
            projectData(date)
                .then((information) => {
                    postData("/add", information)
                        .then((data) => {
                            retreiveData("/all", data)
                                .then((data) => {
                                    updateUI(data);
                                });
                        });
                });
        });
});

const getDate = async(url) => {
    try {
        const result = await fetch(url);
        const data = await result.json();
        if (data.cod == 200) {
            return data;
        } else {
            console.log(data.message);
        }
    } catch (e) {
        console.log(e);
    }
};

const projectData = async(data) => {
    try {
        if (data.message) {
            return data;
        } else {
            const information = {
                date,
                temp: (data.main.temp),
                content: content.value,
            };
            return information;
        }
    } catch (err) {
        console.log(err);
    }
};

const postData = async(url = "", data = {}) => {
    const result = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    try {
        const response = await result.json();
        return response;
    } catch (err) {
        console.error(err);
    }
};

const retreiveData = async(url) => {
    const data = await fetch(url);
    try {
        const response = await data.json();
        return response;
    } catch (err) {
        console.error(err);
    }
};

const updateUI = async(data) => {
    const response = await data;
    if (response.date) {
        dateDay.innerHTML = `<span class="font-weight-bold text-info">Date Is :</span> ${response.date}`;
        temp.innerHTML = `<span class="font-weight-bold text-info">Temp Is :</span> ${response.temp}`;
        feeling.innerHTML = content.innerHTML = `<span class="font-weight-bold text-info">My Feelings Is :</span> ${response.content}`;
    }
};