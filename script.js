'use strict'

/*function displayTextRecipeResults(responseJson) {
    console.log(responseJson);
    for (let i = 0; i < responseJson.hits.length; i++) {
        $('#text-individual-results').append(
            `<li>
                <h3><a href="${responseJson.hits[i].recipe.url}" target="_blank">${responseJson.hits[i].recipe.label}</a></h3>
                <p>By ${responseJson.hits[i].recipe.source}</p>
                <a href="${responseJson.hits[i].recipe.url}" target="_blank">
                    <img src="${responseJson.hits[i].recipe.image}" class="text-recipe-images" alt="${responseJson.hits[i].recipe.label} image">
                </a>
            </li>`
        );
    }

    $('#search-results').removeClass('hidden');
    $('.description').addClass('hidden');
    $('.js-search-form').addClass('search-nav');
    $('.container').addClass('flexbox-column');
}

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
        from: 0,
        to: 8,
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

function displayRecipeVideoResults(responseJson) {
    console.log(responseJson);
    for (let i = 0; i < responseJson.items.length; i++) {
        $('#vid-individual-results').append(
            `<li>
                <h3><a href="https://www.youtube.com/watch?v=${responseJson.items[i].id.videoId}" target="_blank">${responseJson.items[i].snippet.title}</a></h3>
                <p>By <a href="https://www.youtube.com/channel/${responseJson.items[i].snippet.channelId}" target="_blank">${responseJson.items[i].snippet.channelTitle}<a/></p>
                <a href="https://www.youtube.com/watch?v=${responseJson.items[i].id.videoId}" target="_blank">
                    <img src="${responseJson.items[i].snippet.thumbnails.default.url}" alt="${responseJson.items[i].snippet.title} video image">
                </a>
            </li>`
        );
    }

    //$('#search-results').removeClass('hidden');
    //$('.description').addClass('hidden');
    //$('.js-search-form').addClass('search-nav');
}

function formatVideoRecipeParams(params) {
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

function getRecipeVideos(userInput) {
    const apiKey = 'AIzaSyBaSFkq0Cvxl_3eoA_n_DSrflba4SHorMw';
    const searchUrl = 'https://www.googleapis.com/youtube/v3/search';
    const params = {
        part: 'snippet',
        key: apiKey,
        q: userInput + 'recipes',
        maxResults: 8,
        safeSearch: 'strict',
        type: 'video',
        relevanceLanguage: 'en',
    };
    const queryString = formatVideoRecipeParams(params);
    const url = searchUrl + '?' + queryString;

    console.log(url);

    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayRecipeVideoResults(responseJson))
    .catch(error => {
        $('#js-error-message').text(`Something went wrong: ${error.message}`);
    });
}*/

function displayNutritionInfoResults(responseJson) {
    console.log(responseJson);
}

function formatNutritionInfoParams(params) {
    const queryItems = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}

function getNutritionInfo(userInput) {
    const appId = '6cab22bc';
    const apiKey = '465ee2bcbbae8b0562cfed7aa48a9a9a';
    const searchUrl = 'https://trackapi.nutritionix.com/v2/search/instant';
    const params = {
        query: userInput,
        branded: false,
    };
    const queryString = formatNutritionInfoParams(params);
    const url = searchUrl + '?' + queryString;

    console.log(url);

    const options = {
        headers: new Headers({
            'x-app-id': appId,
            'x-app-key': apiKey,
        })
    };

    fetch(url, options)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayNutritionInfoResults(responseJson))
    .catch(error => {
        $('#js-error-message').text(`Something went wrong: ${error.message}`);
    });
}

function watchForm() {
    console.log('App is ready!');
    $('form').submit(event => {
        event.preventDefault();
        const userInput = $('#food-type').val();
        //getTextRecipes(userInput);
        //getRecipeVideos(userInput);
        getNutritionInfo(userInput);
        $('#food-type').val('');
    });
}

$(watchForm);