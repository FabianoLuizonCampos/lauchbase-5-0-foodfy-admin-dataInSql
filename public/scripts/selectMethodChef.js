const selectMethod = document.querySelectorAll(".selectMethodChef")
const form = document.querySelector("form")

for (let actionMethod of selectMethod) {
  actionMethod.addEventListener("click", function() {

      const content = actionMethod.getAttribute("id")

      console.log(content)

      if(content === "put") {
        form.action = "/admin/chefs/?_method=PUT"
        console.log("PUT")
      }
      else if (content === "delete") {
        form.action = "/admin/chefs/?_method=DELETE"
        console.log("DELETE")
      }
  })
}
