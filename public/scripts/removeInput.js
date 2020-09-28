const inputsIngredient = document.querySelectorAll(".ingredient")

let sizeIngredient = inputsIngredient.length

for (let input of inputsIngredient) {
  input.addEventListener("click", function() {

    if(sizeIngredient > 1) {
      input.remove()
      sizeIngredient--
    }
      

  })
}

const inputsPreparation = document.querySelectorAll(".preparation")

let sizePreparation = inputsPreparation.length

for (let input of inputsPreparation) {
  input.addEventListener("click", function() {

    input.remove()

  })
}

/*const buttons = document.querySelectorAll(".remove-ingredient")

const inputs = document.querySelectorAll(".ingredient")

for (let button of buttons) {
  button.addEventListener("click", function() {

    const buttonIndex = ( button.getAttribute("id") ) - 10

    console.log(buttonIndex)

    button.remove()

    input = inputs[buttonIndex]

    input.remove()

  })
}*/


/*const ingredients = document.querySelectorAll(".remove-ingredient")

const inputIngredients = document.querySelectorAll(".ingredient")

for(let ingredient of ingredients) {
    ingredient.addEventListener("click", function () {
        
        const ingredientIndex = ingredient.getAttribute("id")
        
        //console.log(ingredientIndex)

        ingredient.remove()

        const inputElement = document.getElementById 
      

        
    } )
}
*/

