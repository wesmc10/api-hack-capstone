'use strict'

function formatTextRecipeParams(params) {
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

function getTextRecipes(userInput) {
    const appId = 'c16d6370';
    const apiKey = '1ecbadb5ded7c6e582274ce1bdd43b2a';
    const searchUrl = 'https://api.edamam.com/search';
    const params = {
        q: userInput,
        app_id: appId,
        app_key: apiKey,
    };
    const queryString = formatTextRecipeParams(params);
    const url = searchUrl + '?' + queryString;

    console.log(url);

    fetch(url)
    .then(response => {
        if(response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayTextRecipeResults(responseJson))
    .catch(error => {
        $('#js-error-message').text(`Something went wrong: ${error.message}`);
    });
}

/*function getRecipeVideos(userInput) {

}

function getNutritionInfo(userInput) {

}*/

function watchForm() {
    console.log('App is ready!');
    $('form').submit(event => {
        event.preventDefault();
        const userInput = $('#food-type').val();
        getTextRecipes(userInput);
        /*getRecipeVideos(userInput);
        getNutritionInfo(userInput);*/
        $('#food-type').val('');
    });
}

$(watchForm);