const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resetButton = document.getElementById("resetButton");
const categoryFilter = document.getElementById("categoryFilter");
const difficultyFilter = document.getElementById("difficultyFilter");
const noResults = document.getElementById("noResults");

const recipeGrid = document.getElementById("recipeGrid");
const recipeDetails = document.getElementById("recipeDetails");

const detailTitle = document.getElementById("detailTitle");
const detailImage = document.getElementById("detailImage");
const detailDescription = document.getElementById("detailDescription");
const detailIngredients = document.getElementById("detailIngredients");
const detailMethod = document.getElementById("detailMethod");
const detailTime = document.getElementById("detailTime");
const detailDifficulty = document.getElementById("detailDifficulty");
const detailCategory = document.getElementById("detailCategory");

const categoryButtons = document.querySelectorAll(".category-buttons button");

const uploadForm = document.getElementById("uploadForm");
const uploadMessage = document.getElementById("uploadMessage");

const reviewForm = document.getElementById("reviewForm");
const reviewList = document.getElementById("reviewList");
const reviewMessage = document.getElementById("reviewMessage");

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

const recipes = {
    dhal: {
        title: "RED LENTIL & SQUASH DHAL",
        image: "images/dhal.jpg",
        description: "A cheap, filling vegan dhal made with lentils, squash and simple spices.",
        ingredients: [
            "1 onion, chopped",
            "1 cup red lentils",
            "2 cups butternut squash, diced",
            "1 tin chopped tomatoes",
            "2 tsp curry powder",
            "500ml vegetable stock",
            "1 tbsp oil"
        ],
        method: [
            "heat oil in a pan and cook the onion until soft",
            "add curry powder and stir for one minute",
            "add lentils, squash, tomatoes and vegetable stock",
            "simmer for 25–30 minutes until the lentils and squash are soft",
            "serve with rice or naan"
        ],
        time: "30 minutes",
        difficulty: "easy",
        category: "vegan"
    },

    biryani: {
        title: "CARROT BIRYANI",
        image: "images/biryani.jpg",
        description: "A budget vegetarian rice dish using carrots, spices and simple cupboard ingredients.",
        ingredients: [
            "1 cup rice",
            "2 carrots, grated or sliced",
            "1 onion, chopped",
            "1 handful peas",
            "2 tsp curry powder or biryani spice",
            "500ml vegetable stock",
            "1 tbsp oil"
        ],
        method: [
            "heat oil in a pan and cook the onion until soft",
            "add the carrots, peas and spices",
            "stir in the rice and vegetable stock",
            "cover and simmer for 20–25 minutes until the rice is cooked",
            "fluff with a fork and serve hot"
        ],
        time: "25 minutes",
        difficulty: "medium",
        category: "vegetarian"
    },

    rice: {
        title: "CHICKEN, LEEK & BROWN RICE STIR FRY",
        image: "images/rice.jpg",
        description: "A quick meat-based stir fry using chicken, leek, brown rice and vegetables.",
        ingredients: [
            "1 chicken breast, sliced",
            "1 leek, sliced",
            "1 cup cooked brown rice",
            "1 garlic clove, chopped",
            "1 tbsp soy sauce",
            "1 handful mixed vegetables",
            "1 tbsp oil"
        ],
        method: [
            "heat oil in a pan and cook the chicken until fully cooked",
            "add the leek, garlic and mixed vegetables",
            "stir fry for 5 minutes until the vegetables soften",
            "add the cooked brown rice and soy sauce",
            "mix everything together and serve hot"
        ],
        time: "20 minutes",
        difficulty: "easy",
        category: "meat"
    }
};

function createRecipeCard(recipeKey, recipe){

    const card = document.createElement("article");
    card.classList.add("recipe-card");
    card.setAttribute("data-category", recipe.category);
    card.setAttribute("data-difficulty", recipe.difficulty);
    card.setAttribute("data-recipe", recipeKey);

    card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.title.toLowerCase()}">
        <div class="recipe-info">
            <h2>${recipe.title}</h2>
            <p>${recipe.description}</p>
            <p><strong>Category:</strong> ${recipe.category}</p>
            <p><strong>Difficulty:</strong> ${recipe.difficulty}</p>
            <p><strong>Cooking time:</strong> ${recipe.time}</p>
            <button class="view-recipe-btn">View Recipe</button>
        </div>
    `;

    recipeGrid.appendChild(card);
}

function displayRecipes(recipeKeys){

    recipeGrid.innerHTML = "";

    if(recipeKeys.length === 0){
        noResults.style.display = "block";
        return;
    }

    noResults.style.display = "none";

    recipeKeys.forEach(function(recipeKey){
        createRecipeCard(recipeKey, recipes[recipeKey]);
    });
}

function runSearch(){

    const searchText = searchInput.value.toLowerCase().trim();
    const selectedCategory = categoryFilter.value;
    const selectedDifficulty = difficultyFilter.value;

    const matchingRecipes = Object.keys(recipes).filter(function(recipeKey){

        const recipe = recipes[recipeKey];

        const recipeText = [
            recipe.title,
            recipe.description,
            recipe.category,
            recipe.difficulty,
            recipe.time,
            recipe.ingredients.join(" "),
            recipe.method.join(" ")
        ].join(" ").toLowerCase();

        const searchMatches = searchText === "" || recipeText.includes(searchText);
        const categoryMatches = selectedCategory === "all" || recipe.category === selectedCategory;
        const difficultyMatches = selectedDifficulty === "all" || recipe.difficulty === selectedDifficulty;

        return searchMatches && categoryMatches && difficultyMatches;
    });

    displayRecipes(matchingRecipes);
}

function showRecipeDetails(recipeKey){

    const recipe = recipes[recipeKey];

    detailTitle.textContent = recipe.title;
    detailImage.src = recipe.image;
    detailImage.alt = recipe.title.toLowerCase();
    detailDescription.textContent = recipe.description;
    detailTime.textContent = recipe.time;
    detailDifficulty.textContent = recipe.difficulty;
    detailCategory.textContent = recipe.category;

    detailIngredients.innerHTML = "";
    detailMethod.innerHTML = "";

    recipe.ingredients.forEach(function(ingredient){
        const li = document.createElement("li");
        li.textContent = ingredient;
        detailIngredients.appendChild(li);
    });

    recipe.method.forEach(function(step){
        const li = document.createElement("li");
        li.textContent = step;
        detailMethod.appendChild(li);
    });

    recipeDetails.style.display = "block";

    recipeDetails.scrollIntoView({
        behavior: "smooth"
    });
}

recipeGrid.addEventListener("click", function(event){

    const button = event.target.closest(".view-recipe-btn");

    if(button){
        const card = button.closest(".recipe-card");
        const recipeKey = card.getAttribute("data-recipe");
        showRecipeDetails(recipeKey);
    }

});

searchButton.addEventListener("click", runSearch);

searchInput.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        runSearch();
    }
});

categoryFilter.addEventListener("change", runSearch);
difficultyFilter.addEventListener("change", runSearch);

resetButton.addEventListener("click", function(){
    searchInput.value = "";
    categoryFilter.value = "all";
    difficultyFilter.value = "all";
    recipeDetails.style.display = "none";
    displayRecipes(Object.keys(recipes));
});

categoryButtons.forEach(function(button){

    button.addEventListener("click", function(){

        categoryFilter.value = button.getAttribute("data-category");
        runSearch();

        document.getElementById("browse").scrollIntoView({
            behavior: "smooth"
        });

    });

});

uploadForm.addEventListener("submit", function(event){

    event.preventDefault();

    const title = document.getElementById("recipeTitle").value.trim();
    const description = document.getElementById("recipeDescription").value.trim();
    const ingredientsText = document.getElementById("recipeIngredients").value.trim();
    const methodText = document.getElementById("recipeMethod").value.trim();
    const time = document.getElementById("recipeTime").value.trim();
    const category = document.getElementById("recipeCategory").value;
    const difficulty = document.getElementById("recipeDifficulty").value;
    const imageInput = document.getElementById("recipeImageUpload");

    if(title === "" || description === "" || ingredientsText === "" || methodText === "" || time === "" || category === "" || difficulty === ""){
        uploadMessage.textContent = "please complete all fields before submitting.";
        uploadMessage.style.color = "red";
        return;
    }

    let imagePath = "images/placeholder.jpg";

    if(imageInput.files.length > 0){
        imagePath = URL.createObjectURL(imageInput.files[0]);
    }

    const newKey = "uploaded" + Date.now();

    recipes[newKey] = {
        title: title.toUpperCase(),
        image: imagePath,
        description: description,
        ingredients: ingredientsText.split(",").map(function(item){
            return item.trim();
        }),
        method: methodText.split(".").filter(function(step){
            return step.trim() !== "";
        }).map(function(step){
            return step.trim();
        }),
        time: time,
        difficulty: difficulty,
        category: category
    };

    uploadMessage.textContent = "recipe uploaded successfully.";
    uploadMessage.style.color = "green";

    uploadForm.reset();

    displayRecipes(Object.keys(recipes));

    document.getElementById("browse").scrollIntoView({
        behavior: "smooth"
    });

});

reviewForm.addEventListener("submit", function(event){

    event.preventDefault();

    const name = document.getElementById("reviewName").value.trim();
    const review = document.getElementById("reviewText").value.trim();
    const rating = document.getElementById("reviewRating").value;

    if(name === "" || review === "" || rating === ""){
        reviewMessage.textContent = "please complete all review fields.";
        reviewMessage.style.color = "red";
        return;
    }

    const reviewCard = document.createElement("div");
    reviewCard.classList.add("review-card");

    reviewCard.innerHTML = `
        <h3>${name}</h3>
        <p>${rating}</p>
        <p>${review}</p>
    `;

    reviewList.appendChild(reviewCard);

    reviewMessage.textContent = "review submitted successfully.";
    reviewMessage.style.color = "green";

    reviewForm.reset();

});

menuBtn.addEventListener("click", function(){
    navLinks.classList.toggle("active");
});

displayRecipes(Object.keys(recipes));