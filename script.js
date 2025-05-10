const API_KEY = "d6e4980989854f9baab9060a12f4ae7d"; // Replace this with your key

async function getRecipes() {
  const ingredient = document.getElementById("ingredientInput").value.trim();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (!ingredient) {
    resultsDiv.innerHTML = "<p>Please enter an ingredient.</p>";
    return;
  }

  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&number=5&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.length === 0) {
      resultsDiv.innerHTML = "<p>No recipes found.</p>";
      return;
    }

    data.forEach(recipe => {
      const recipeDiv = document.createElement("div");
      recipeDiv.className = "recipe";

      recipeDiv.innerHTML = `
        <h3>${recipe.title}</h3>
        <img src="${recipe.image}" alt="${recipe.title}" width="100%" style="border-radius: 8px;" />
        <p><strong>Used Ingredients:</strong> ${recipe.usedIngredients.map(i => i.name).join(", ")}</p>
        <p><strong>Missing Ingredients:</strong> ${recipe.missedIngredients.map(i => i.name).join(", ")}</p>
      `;

      resultsDiv.appendChild(recipeDiv);
    });

  } catch (error) {
    console.error(error);
    resultsDiv.innerHTML = "<p>Something went wrong. Please try again later.</p>";
  }
}
