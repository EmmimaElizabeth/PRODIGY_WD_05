function functionAlert(msg, myYes) {
    var confirmBox = $("#confirm")
    confirmBox.find(".message").text(msg)
    confirmBox
        .find(".yes")
        .unbind()
        .click(function () {
            confirmBox.hide()
        })
    confirmBox.find(".yes").click(myYes)
    confirmBox.show()
}

let temp1save,
    temp2save = 0
let weather = {
    apiKey: "d91a3bef612827322a27d8d8f0dd3b98",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
                city +
                "&units=metric&appid=" +
                this.apiKey
        )
            .then((response) => {
                if (!response.ok) {
                    functionAlert()
                }
                return response.json()
            })
            .then((data) => this.displayWeather(data))
    },
    displayWeather: function (data) {
        const { name } = data
        const { icon, description } = data.weather[0]
        const { temp, humidity } = data.main
        const temp2 = temp * 1.8 + 32
        const { speed } = data.wind
        document.querySelector(".city").innerText = "Weather in " + name
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png"
        document.querySelector(".description").innerText = description

        !document.querySelector("#checkbox").checked
            ? (document.querySelector(".temp").innerText = temp + "℃")
            : (document.querySelector(".temp").innerText = temp2 + "℉")
        temp1save = temp
        temp2save = temp2

        document.querySelector(".humidity").innerText =
            "Humidity: " + humidity + "%"
            
        document.querySelector(".wind").innerText =
            "Wind speed: " + speed + " km/h"
        document.querySelector(".weather").classList.remove("loading")
        document.body.style.backgroundImage =
            "url('https://source.unsplash.com/1600x900/?" + name + "')"
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value)
    }
}

document.querySelector(".search button").addEventListener("click", function () {
    weather.search()
})

document
    .querySelector(".search-bar")
    .addEventListener("keyup", function (event) {
        if (event.key == "Enter") {
            weather.search()
        }
    })

weather.fetchWeather("Lucknow")

function onTempChange() {
    !document.querySelector("#checkbox").checked
        ? (document.querySelector(".temp").innerText = temp1save + "℃")
        : (document.querySelector(".temp").innerText = temp2save + "℉")
}

let darkMode = localStorage.getItem("darkMode")
const darkModeToggle = document.querySelector(".toggle-btn")
//check if Dark mode is enabled
// if its enabled turn it off
// else turn it on
const enableDarkMode = () => {
    document.body.classList.add("darkmode")
    localStorage.setItem("darkMode", "enabled")
}

const disableDarkMode = () => {
    document.body.classList.remove("darkmode")
    localStorage.setItem("darkMode", null)
}

darkModeToggle.addEventListener("click", () => {
    darkMode = localStorage.getItem("darkMode")
    if (darkMode != "enabled") {
        enableDarkMode()
        console.log(darkMode)
    } else {
        disableDarkMode()
        console.log(darkMode)
    }
})
function myFunction() {
    var element = document.getElementById("box")
    element.classList.toggle("light-mode")
    var e2 = document.getElementById("search")
    e2.classList.toggle("change")
}