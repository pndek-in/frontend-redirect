const redirect = (key, url) => {
  const mainWeb = process.env.MAIN_WEB
  switch (key) {
    case "success":
      location.href = url
      break
    case "home":
      location.href = mainWeb
      break
    case "not-found":
      location.href = `${mainWeb}/link-not-found`
      break
    case "expired":
      location.href = `${mainWeb}/link-invalid`
      break
    default:
      location.href = `${mainWeb}/link-server-error`
      break
  }
}

export default redirect