import redirect from "./redirect"
import getUrl from "./getUrl"

const path = location.pathname
const uniquePath = path.split("/")[1]

if (!uniquePath) {
  redirect("home")
} else {
  getUrl(uniquePath)
}

document
  .getElementById("secretForm")
  .addEventListener("submit", function (event) {
    event.preventDefault()
    const codeInput = document.getElementById("code")

    if (!codeInput.value) {
      alert("Please enter the secret code")
    }

    getUrl(uniquePath, codeInput.value)
  })

document
  .getElementById("togglePassword")
  .addEventListener("click", function () {
    const passwordInput = document.getElementById("code")
    const eyeIconOn = document.getElementById("eye-icon-on")
    const eyeIconOff = document.getElementById("eye-icon-off")

    const type =
      passwordInput.getAttribute("type") === "password" ? "text" : "password"
    passwordInput.setAttribute("type", type)

    if (type === "password") {
      eyeIconOn.classList.remove("hidden")
      eyeIconOff.classList.add("hidden")
    } else {
      eyeIconOn.classList.add("hidden")
      eyeIconOff.classList.remove("hidden")
    }
  })
