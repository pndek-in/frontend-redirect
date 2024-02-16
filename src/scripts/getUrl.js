import redirect from "./redirect"
import getVisitor from "./getVisitor"

const form = document.querySelector("form")
const loading = document.querySelector("#loading")

function getUrl(uniquePath, secretCode) {
  form.classList.add("hidden")
  loading.classList.remove("hidden")

  const uniqueVisitor = getVisitor()
  const searchParams = new URLSearchParams(window.location.search)

  const payload = {
    referrer: document.referrer,
    visitor: uniqueVisitor,
    source: searchParams.get("s") || "web",
    secretCode
  }

  const query = secretCode ? "?unlock=true" : ""

  fetch(`${process.env.SERVER_URL}/link/short/${uniquePath}${query}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  })
    .then((res) => {
      if (res.status !== 200) throw new Error(res.status)
      return res.json()
    })
    .then((res) => {
      const { url, hasSecretCode } = res.data

      if (hasSecretCode) {
        loading.classList.add("hidden")
        form.classList.remove("hidden")
        return
      }

      redirect("success", url)
    })
    .catch((err) => {
      if (err.message == 400) {
        alert("Invalid secret code")
        loading.classList.add("hidden")
        form.classList.remove("hidden")
        return
      } else if (err.message == 404) {
        redirect("not-found")
      } else if (err.message == 410) {
        redirect("expired")
      } else {
        redirect("server-error")
      }
    })
}

export default getUrl
