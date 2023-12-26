/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    // loop over each item in the data


        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

    games.forEach((game) => {
        const newGameCard = document.createElement("div");
        newGameCard.classList.add("game-card");
        newGameCard.innerHTML =
            `<img class="game-img" src="${game.img}" alt="Image of Game" />
            <h3 class="game-card-name">${game.name}</h3>
            <p>${game.description}</p>
            <p>Goal: ${game.goal}</p>
            <p>Pledged: ${game.pledged}</p>
            <p>Backers: ${game.backers}</p>`
        gamesContainer.appendChild(newGameCard);
    });
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalContributions = GAMES_JSON.reduce((contributions, game) => {
    return contributions + game.backers;
}, 0);


// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerHTML = `${totalContributions.toLocaleString("en-US")}`


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
const totalRaised = GAMES_JSON.reduce((raised, game) => {
    return raised + game.pledged;
}, 0);

// set inner HTML using template literal
raisedCard.innerHTML = `$${totalRaised.toLocaleString("en-US")}`

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
const totalGames = GAMES_JSON.reduce((numOfGames) => {
    return numOfGames + 1;
}, 0);

gamesCard.innerHTML = `${totalGames}`
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedSongs = GAMES_JSON.filter((game) => {
        return game.pledged < game.goal;
    });

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedSongs);
    getGameSelection(gamesSelect);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedSongs = GAMES_JSON.filter((game) => {
        return game.pledged >= game.goal;
    });

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedSongs);
    getGameSelection(gamesSelect);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    const allSongs = GAMES_JSON.map((game) => {
        return game;
    });
    addGamesToPage(allSongs);
    getGameSelection(gamesSelect);
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click", showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const totalUnfundedGames = GAMES_JSON.reduce((unfundedGames, game) => {
    if(game.pledged < game.goal) {
        return unfundedGames + 1; 
    } else {
        return unfundedGames;
    }
}, 0);

// create a string that explains the number of unfunded games using the ternary operator
const ternaryTotalUnfundedGames = GAMES_JSON.reduce((unfundedGames, game) => {
    return (game.pledged < game.goal) ? unfundedGames + 1 : unfundedGames; 
}, 0);

// create a new DOM element containing the template string and append it to the description container
const displayStr = `A total of $${totalRaised.toLocaleString("en-US")} has been raised for ${totalGames} games. Currently, ${ternaryTotalUnfundedGames} remain unfunded. We need your help to fund these amazing games!`

const fundInfo = document.createElement("p");
fundInfo.innerText = displayStr;
fundInfo.classList.add("info-text");

descriptionContainer.appendChild(fundInfo);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [firstGame, secondGame, ...otherGames] = sortedGames;

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topFundedElement = document.createElement("p");
topFundedElement.innerText = `${firstGame.name}`;
topFundedElement.classList.add("info-text");
firstGameContainer.appendChild(topFundedElement);

// do the same for the runner up item
const runnerUpElement = document.createElement("p");
runnerUpElement.innerText = `${secondGame.name}`;
runnerUpElement.classList.add("info-text");
secondGameContainer.appendChild(runnerUpElement);

// Step 3: Customizations
// grabs "our games anchor tag from nav bar"
const gamesNavButton = document.querySelector(".game-nav");
gamesNavButton.addEventListener("mouseover", () => {
    gamesNavButton.style.cursor = "pointer";
});

gamesNavButton.addEventListener("click", () => {
    // click to scroll to "our games section"
    gamesContainer.scrollIntoView();
});

// populate select element with options based on GAMES_JSON
const gamesSelect = document.querySelector(".games-select");

// dynamically get select element contents based on filter
function getGameSelection(selectElement) {
    deleteChildElements(selectElement);
    Array.from(gamesContainer.children).forEach((gameCard) => {
        const newGameOption = document.createElement("option");
        newGameOption.classList.add("game-option");
        newGameOption.innerText = gameCard.children[1].innerText;
        selectElement.add(newGameOption);
    });
}

// render select element upon loading page
getGameSelection(gamesSelect);

// search for game based on name in select element
const gameSearchBtn = document.querySelector(".search-btn");
gameSearchBtn.addEventListener("click", () => {
    const searchValue = gamesSelect.value;
    const searchableGames = document.querySelectorAll(".game-card");

    // reset highlight on search
    searchableGames.forEach((gameCard) => {
        gameCard.style.boxShadow = null;
    });
    
    // search if game exists within filter
    searchableGames.forEach((gameCard) => {
        if(gameCard.innerText.includes(searchValue)) {
            gameCard.scrollIntoView();
            gameCard.style.boxShadow = "0 0 30px yellow";
        }
    });
});
