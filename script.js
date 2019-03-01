'use strict'

function displayTextRecipeResults(responseJson) {
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

function formatTextRecipeParams(textParams) {
    const textQueryItems = Object.keys(textParams).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(textParams[key])}`);
    return textQueryItems.join('&');
}

function getTextRecipes(userInput) {
    const textAppId = config.textAppId;
    const textApiKey = config.textApiKey;
    const textSearchUrl = 'https://api.edamam.com/search';
    const textParams = {
        q: userInput,
        app_id: textAppId,
        app_key: textApiKey,
        from: 0,
        to: 8,
    };
    const textQueryString = formatTextRecipeParams(textParams);
    const textUrl = textSearchUrl + '?' + textQueryString;

    console.log(textUrl);

    fetch(textUrl)
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
}

function formatVideoRecipeParams(vidParams) {
    const vidQueryItems = Object.keys(vidParams).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(vidParams[key])}`);
    return vidQueryItems.join('&');
}

function getRecipeVideos(userInput) {
    const vidApiKey = config.vidApiKey;
    const vidSearchUrl = 'https://www.googleapis.com/youtube/v3/search';
    const vidParams = {
        part: 'snippet',
        key: vidApiKey,
        q: userInput + 'recipes',
        maxResults: 8,
        safeSearch: 'strict',
        type: 'video',
        relevanceLanguage: 'en',
    };
    const vidQueryString = formatVideoRecipeParams(vidParams);
    const vidUrl = vidSearchUrl + '?' + vidQueryString;

    console.log(vidUrl);

    fetch(vidUrl)
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
}

function displayNutritionInfoResults(responseJson) {
    console.log(responseJson);
}

function formatNutritionInfoParams(nutParams) {
    const nutQueryItems = Object.keys(nutParams).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(nutParams[key])}`);
    return nutQueryItems.join('&');
}

function getNutritionInfo(userInput) {
    const nutAppId = config.nutAppId;
    const nutApiKey = config.nutApiKey;
    const nutSearchUrl = 'https://trackapi.nutritionix.com/v2/search/instant';
    const nutParams = {
        query: userInput,
        branded: false,
    };
    const nutQueryString = formatNutritionInfoParams(nutParams);
    const nutUrl = nutSearchUrl + '?' + nutQueryString;

    console.log(nutUrl);

    const options = {
        headers: new Headers({
            'x-app-id': nutAppId,
            'x-app-key': nutApiKey,
        })
    };

    fetch(nutUrl, options)
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