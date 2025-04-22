import React, { useState } from 'react'
import './App.css'

function App() {
  const [recipes, setRecipes] = useState([])
  const [name, setName] = useState("")
  const [ingredients, setIngredients] = useState("")
  const [instructions, setInstructions] = useState("")
  const [isEdit, setIsEdit] = useState(false)
  const [editIndex, setEditIndex] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !ingredients || !instructions) {
      return alert("Please fill in all fields")
    }

    const newRecipe = { name, ingredients, instructions }

    if (isEdit) {
      const updatedRecipes = [...recipes]
      updatedRecipes[editIndex] = newRecipe
      setRecipes(updatedRecipes)
      setIsEdit(false)
      setEditIndex(null)
    } else {
      setRecipes([...recipes, newRecipe])
    }

    // Reset form
    setName("")
    setIngredients("")
    setInstructions("")
  }

  const handleEdit = (i) => {
    const recipe = recipes[i]
    setName(recipe.name)
    setIngredients(recipe.ingredients)
    setInstructions(recipe.instructions)
    setIsEdit(true)
    setEditIndex(i)
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <h1>Recipe Book</h1>
        <input
          type="text"
          placeholder="Recipe Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        /><br /><br />

        <textarea
          placeholder="Ingredients (comma separated or detailed)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
        /><br /><br />

        <textarea
          placeholder="Cooking Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        /><br /><br />

        <button>{isEdit ? "Update Recipe" : "Add Recipe"}</button>
      </form>

      <hr />
      <h2>Your Recipes</h2>
      {recipes.length === 0 ? (
        <p>No recipes added yet.</p>
      ) : (
        recipes.map((recipe, i) => (
          <div key={i}>
            <h3>{recipe.name}</h3>
            <p><strong>Ingredients:</strong><br />{recipe.ingredients}</p>
            <p><strong>Instructions:</strong><br />{recipe.instructions}</p>
            <button onClick={() => handleEdit(i)}>EDIT</button>
            <hr />
          </div>
        ))
      )}
    </div>
  )
}

export default App
