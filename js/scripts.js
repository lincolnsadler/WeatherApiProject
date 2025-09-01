const API_KEY = "5187218165b8f70e7a21d215513ee6d1";

const userInput = document.querySelector("#city");
const formContainer = document.querySelector("#form-container");
const informationsContainer = document.querySelector("#informations-container");

const temperatureSpan = document.querySelector("#temperature span");
const umitySpan = document.querySelector("#umity span");
const rainSpan = document.querySelector("#rain-percent spas");
informationsContainer.style.display = "none";

formContainer.addEventListener("submit", function (e) {
    e.preventDefault();
    const cityName = userInput.value.trim();
    if (cityName) {
        getWeatherData(cityName);
        formContainer.classList.add("hide");
        informationsContainer.style.display = "block";
    }
});

const getWeatherData = (cityName) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric&lang=pt_br`;

    axios
        .get(url)
        .then((response) => {
            const data = response.data;
            console.log(data);

            temperatureSpan.textContent = `${data.main.temp} °C`;

            umitySpan.textContent = `${data.main.humidity} %`;

            // ! error
            // const rain = data.rain && data.rain["1h"] ? data.rain["1h"] : 0;
            // rainSpan.textContent = `${rain} mm (última hora)`;
        })
        .catch((error) => {
            console.error("Erro ao buscar dados do clima:", error);
            if (error.response && error.response.status === 404) {
                alert("Cidade não encontrada. Por favor, verifique o nome.");
            } else {
                alert("Ocorreu um erro ao buscar a previsão do tempo.");
            }
        });
};
