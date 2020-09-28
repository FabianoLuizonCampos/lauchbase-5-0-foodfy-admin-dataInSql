const selectMethod = document.querySelectorAll(".selectMethod")
const form = document.querySelector("form")

for (let actionMethod of selectMethod) {
  actionMethod.addEventListener("click", function() {

      const content = actionMethod.getAttribute("id")

      console.log(content)

      if(content === "put") {
        form.action = "/admin/recipes/?_method=PUT"
      }
      else if (content === "delete") {
        form.action = "/admin/recipes/?_method=DELETE"
      }
  })
}
