'use strict'


function displayTextRecipeResults(responseJson) {
    console.log(responseJson);

    $('#text-individual-results').empty();

    if (responseJson.hits.length === 0) {
        $('#text-individual-results').append('Sorry, I could not find any recipes for that food item. Please try modifying your search.');
    }

    for (let i = 0; i < responseJson.hits.length; i++) {

        let label = responseJson.hits[i].recipe.label;
        if (label.length > 55) {
            label = label.substring(0, 55).trim() + '...';
        }

        $('#text-individual-results').append(
            `<li>
                <h3><a href="${responseJson.hits[i].recipe.url}" target="_blank">${label}</a></h3>
                <p class="creator">By ${responseJson.hits[i].recipe.source}</p>
                <a href="${responseJson.hits[i].recipe.url}" target="_blank">
                    <img src="${responseJson.hits[i].recipe.image}" class="text-recipe-images" alt="${responseJson.hits[i].recipe.label} image">
                </a>
            </li>`
        );
    }  
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
        to: 10,
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
        $('#text-individual-results').empty();
        $('#text-individual-results').append(`Something went wrong: ${error.message}`);
    });
}


//text recipes above
/*==============================================================================================================*/
//recipe videos below


function displayRecipeVideoResults(responseJson, userInput) {
    console.log(responseJson);

    $('#vid-individual-results').empty();

    if (responseJson.items.length === 0) {
        $('#vid-individual-results').append('Sorry, I could not find any recipes for that food item. Please try modifying your search.');
    }

    for (let i = 0; i < responseJson.items.length; i++) {

        let title = responseJson.items[i].snippet.title;
        if (title.length > 55) {
            title = title.substring(0, 55).trim() + '...';
        }

        $('#vid-individual-results').append(
            `<li>
                <h3><a href="https://www.youtube.com/watch?v=${responseJson.items[i].id.videoId}" target="_blank">${title}</a></h3>
                <p class="creator">By <a href="https://www.youtube.com/channel/${responseJson.items[i].snippet.channelId}" target="_blank">${responseJson.items[i].snippet.channelTitle}<a/></p>
                <a href="https://www.youtube.com/watch?v=${responseJson.items[i].id.videoId}" target="_blank">
                    <img src="${responseJson.items[i].snippet.thumbnails.default.url}" alt="${responseJson.items[i].snippet.title} video image">
                </a>
            </li>`
        );
    }

    $('#vid-individual-results').append(`<h3 class="youtube-more-results"><a href="https://www.youtube.com/results?search_query=${userInput}+recipes" target="_blank">More results on YouTube
    <img src="http://www.logospng.com/images/66/work-well-solutions-informatiques-en-action-66386.png" class="youtube" alt="YouTube Attribution image"> <img src="https://image.flaticon.com/icons/svg/66/66831.svg" class="more-results" alt="arrow image icon"></a></h3>`);
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
    .then(responseJson => displayRecipeVideoResults(responseJson, userInput))
    .catch(error => {
        $('#js-error-message').text(`Something went wrong: ${error.message}`);
        $('#vid-individual-results').empty();
        $('#vid-individual-results').append(`Something went wrong: ${error.message}`);
    });
}


//recipe videos above
/*==============================================================================================================*/
//nutrition info below


function capitalizeFirstLetter(string) {
    let splitString = string.toLowerCase().split(' ');
  
    for (let i = 0; i < splitString.length; i++) {
        splitString[i] = splitString[i].charAt(0).toUpperCase() + splitString[i].substring(1);     
    }
    
    return splitString.join(' '); 
}



function displayNutritionInfoResults(responseJson) {
    console.log(responseJson);

    $('#nut-individual-results').empty();

    $('#nut-individual-results').append(
        `<li>
            <h3>${capitalizeFirstLetter(responseJson.foods[0].food_name)}</h3>
            <p>Serving Size: ${responseJson.foods[0].serving_qty} ${responseJson.foods[0].serving_unit} (${Math.round(responseJson.foods[0].serving_weight_grams)}g)</p>
            <h4>Amount Per Serving</h4>
            <p>Calories: ${Math.round(responseJson.foods[0].nf_calories)}</p>
            <p>Total Fat: ${Math.round(responseJson.foods[0].nf_total_fat)}g</p>
            <p>Saturated Fat: ${Math.round(responseJson.foods[0].nf_saturated_fat)}g</p>
            <p>Cholesterol: ${Math.round(responseJson.foods[0].nf_cholesterol)}mg</p>
            <p>Sodium: ${Math.round(responseJson.foods[0].nf_sodium)}mg</p>
            <p>Potassium: ${Math.round(responseJson.foods[0].nf_potassium)}mg</p>
            <p>Total Carbohydrates: ${Math.round(responseJson.foods[0].nf_total_carbohydrate)}g</p>
            <p>Dietary Fiber: ${Math.round(responseJson.foods[0].nf_dietary_fiber)}g</p>
            <p>Sugars: ${Math.round(responseJson.foods[0].nf_sugars)}g</p>
            <p>Protein: ${Math.round(responseJson.foods[0].nf_protein)}g</p>
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
        $('#nut-individual-results').empty();
        $('#nut-individual-results').append(`Something went wrong: ${error.message}`);
    })
}


//nutrition info above
/*==============================================================================================================*/
//scroll features below


function navBarUpOnScrollDown() {
    let previousPosition = window.pageYOffset;

    $(window).on('scroll', function(event) {
        let currentPosition = window.pageYOffset;
        if (currentPosition > previousPosition) {
            $('#nav').slideUp(365, 'linear');
            $('.js-search-form').removeClass('search-nav search-nav-scroll-down').addClass('search-nav-scroll-up');
        }
        else {
            $('#nav').slideDown(365, 'linear');
            $('.js-search-form').removeClass('search-nav-scroll-up').addClass('search-nav-scroll-down');
        }
        previousPosition = currentPosition;
    });
}

function scrollToRecipes() {
    $('#nav').on('click', '#recipes', function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: $('#recipes-container').offset().top - 35}, 'slow');
    });
}



function scrollToVideos() {
    $('#nav').on('click', '#videos', function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: $('#videos-container').offset().top - 35}, 'slow');
    });
}


/*==============================================================================================================*/


function watchForm() {
    console.log('App is ready!');

    $('body').addClass('overflow-hidden');
    setTimeout(function(){ $('.transition').addClass('hidden'); }, 2000);
    $('main').addClass('landing-page-background');

    $('.js-search-form').submit(event => {
        event.preventDefault();
        let userInput = $('#food-type').val();
        getTextRecipes(userInput);
        getRecipeVideos(userInput);
        getNutritionInfo(userInput);
        navBarUpOnScrollDown()
        scrollToRecipes();
        scrollToVideos();
        $('body').removeClass('overflow-hidden').addClass('results-page-background');
        $('main').removeClass('landing-page-background');
        $('#title').addClass('hidden');
        $('#recipes').removeClass('hidden');
        $('#videos').removeClass('hidden');
        $('#nav').removeClass('large-header').addClass('flexbox-row small-header');
        $('#search-results').removeClass('hidden');
        $('.description').addClass('hidden');
        $('.js-search-form').addClass('search-nav');
        $('.container').addClass('flexbox-column'); 
        $('#food-type').val('');
    });
}

$(watchForm);