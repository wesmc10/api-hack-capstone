'use strict'

function displayTextRecipeResults(responseJson) {
    console.log(responseJson);

    $('#text-individual-results').empty();

    if (responseJson.hits.length === 0) {
        $('#text-individual-results').append('Sorry, I could not find any recipes for that food item. Please try modifying your search.');
    }

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
    const textAppId = 'c16d6370';
    const textApiKey = '1ecbadb5ded7c6e582274ce1bdd43b2a';
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

    const options = {
        headers: new Headers({
            'Accept-Encoding': 'gzip'
        })
    };

    fetch(textUrl, options)
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

    $('#vid-individual-results').empty();

    if (responseJson.items.length === 0) {
        $('#vid-individual-results').append('Sorry, I could not find any recipes for that food item. Please try modifying your search.');
    }

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
    const vidApiKey = 'AIzaSyBaSFkq0Cvxl_3eoA_n_DSrflba4SHorMw';
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

    $('#nut-individual-results').empty();

    $('#nut-individual-results').append(
        `<li>
            <h3>${responseJson.foods[0].food_name}</h3>
            <p>Serving Size: ${responseJson.foods[0].serving_qty} ${responseJson.foods[0].serving_unit} (${responseJson.foods[0].serving_weight_grams}g)</p>
            <p><h4>Amount Per Serving</h4></p>
            <p>Calories: ${responseJson.foods[0].nf_calories}</p>
            <p>Total Fat: ${responseJson.foods[0].nf_total_fat}g</p>
            <p>Saturated Fat: ${responseJson.foods[0].nf_saturated_fat}g</p>
            <p>Cholesterol: ${responseJson.foods[0].nf_cholesterol}mg</p>
            <p>Sodium: ${responseJson.foods[0].nf_sodium}mg</p>
            <p>Potassium: ${responseJson.foods[0].nf_potassium}mg</p>
            <p>Total Carbohydrates: ${responseJson.foods[0].nf_total_carbohydrate}g</p>
            <p>Dietary Fiber: ${responseJson.foods[0].nf_dietary_fiber}g</p>
            <p>Sugars: ${responseJson.foods[0].nf_sugars}g</p>
            <p>Protein: ${responseJson.foods[0].nf_protein}g</p>
        </li>`
    );
}

function getNutritionInfo(userInput) {
    const nutAppId = '6cab22bc';
    const nutApiKey = '465ee2bcbbae8b0562cfed7aa48a9a9a';
    const url = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
    const data = {'query': userInput};

    fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'x-app-id': nutAppId,
        'x-app-key': nutApiKey,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayNutritionInfoResults(responseJson))
    .catch(error => {
        $('#js-error-message').text(`Something went wrong: ${error.message}`);
        $('#nut-individual-results').append('Sorry, I could not find any nutrition information for that food item. Please try modifying your search.');
    })
}

function scrollToRecipes() {
    $('#nav').on('click', '#recipes', function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: $('#recipes-container').offset().top - 70}, 'slow');
    });
}

function scrollToVideos() {
    $('#nav').on('click', '#videos', function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: $('#videos-container').offset().top - 70}, 'slow');
    });
}

function watchForm() {
    console.log('App is ready!');
    $('.js-search-form').submit(event => {
        event.preventDefault();
        let userInput = $('#food-type').val();
        getTextRecipes(userInput);
        getRecipeVideos(userInput);
        getNutritionInfo(userInput);
        scrollToRecipes();
        scrollToVideos();
        $('#title').addClass('hidden');
        $('#recipes').removeClass('hidden');
        $('#videos').removeClass('hidden');
        $('#nav').addClass('flexbox-row');
        $('#food-type').val('');
    });
}

$(watchForm);