function getVisitor() {
  const visitor = localStorage.getItem("visitor")

  if (visitor) return visitor
  else {
    const now = Date.now()
    const randomString = Math.random().toString(36).substring(2, 7)
    const newVisitor = `${now}${randomString}`
    localStorage.setItem("visitor", newVisitor)
    return newVisitor
  }
}

export default getVisitor
