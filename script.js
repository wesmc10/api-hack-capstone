'use strict'


function displayTextRecipeResults(responseJson, userInput) {
    $('#text-individual-results').empty();

    if (responseJson.hits.length === 0) {
        $('#text-individual-results').append(
            'Sorry, I could not find any recipes for that food item. Please try modifying your search.');
    }

    for (let i = 0; i < responseJson.hits.length; i++) {
        
        //make sure recipe titles are no longer than 55 characters
        let label = responseJson.hits[i].recipe.label;
        if (label.length > 55) {
            label = label.substring(0, 55).trim() + '...';
        }

        $('#text-individual-results').append(
            `<li>
                <h3><a href="${responseJson.hits[i].recipe.url}" target="_blank">${label}</a></h3>
                <p class="creator">By ${responseJson.hits[i].recipe.source}</p>
                <a href="${responseJson.hits[i].recipe.url}" target="_blank">
                    <img src="${responseJson.hits[i].recipe.image}" class="text-recipe-images" 
                    alt="${responseJson.hits[i].recipe.label} image">
                </a>
            </li>`
        );
    }

    $('#text-individual-results').append(`<h3 class="edamam-more-results"><a href="https://www.edamam.com/recipes/${userInput}" 
    target="_blank">More results on Edamam <img src="https://image.flaticon.com/icons/svg/66/66831.svg" class="more-results" 
    alt="arrow image icon"></a></h3>`);
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

    //add a header for faster load
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
    .then(responseJson => displayTextRecipeResults(responseJson, userInput))
    .catch(error => {
        alert(`Something went wrong: ${error.message}`);
        $('#text-individual-results').empty();
    });
}


//text recipes above
/*==============================================================================================================*/
//recipe videos below


function displayRecipeVideoResults(responseJson, userInput) {
    $('#vid-individual-results').empty();

    if (responseJson.items.length === 0) {
        $('#vid-individual-results').append(
            '<p>Sorry, I could not find any recipe videos for that food item. Please try modifying your search.</p>');
    }

    for (let i = 0; i < responseJson.items.length; i++) {

        let title = responseJson.items[i].snippet.title;
        if (title.length > 55) {
            title = title.substring(0, 55).trim() + '...';
        }

        $('#vid-individual-results').append(
            `<li>
                <h3><a href="https://www.youtube.com/watch?v=${responseJson.items[i].id.videoId}" target="_blank">${title}</a></h3>
                <p class="creator">By <a href="https://www.youtube.com/channel/${responseJson.items[i].snippet.channelId}" 
                target="_blank">${responseJson.items[i].snippet.channelTitle}<a/></p>
                <a href="https://www.youtube.com/watch?v=${responseJson.items[i].id.videoId}" target="_blank">
                    <img src="${responseJson.items[i].snippet.thumbnails.high.url}" class="recipe-video-images" 
                    alt="${responseJson.items[i].snippet.title} video image">
                </a>
            </li>`
        );
    }

    $('#vid-individual-results').append(`<h3 class="youtube-more-results"><a href="https://www.youtube.com/results?search_query=${userInput}+recipes" 
    target="_blank">More results on YouTube <img src="https://image.flaticon.com/icons/svg/66/66831.svg" class="more-results" 
    alt="arrow image icon"></a></h3>`);
}



function formatVideoRecipeParams(vidParams) {
    const vidQueryItems = Object.keys(vidParams).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(vidParams[key])}`);
    return vidQueryItems.join('&');
}



function getRecipeVideos(userInput) {
    const vidApiKey = 'AIzaSyBaSFkq0Cvxl_3eoA_n_DSrflba4SHorMw';
    const vidSearchUrl = 'https://cors.io?https://www.googleapis.com/youtube/v3/search';
    const vidParams = {
        part: 'snippet',
        key: vidApiKey,
        q: userInput + 'recipes',
        maxResults: 9,
        safeSearch: 'strict',
        type: 'video',
        relevanceLanguage: 'en',
    };
    const vidQueryString = formatVideoRecipeParams(vidParams);
    const vidUrl = vidSearchUrl + '?' + vidQueryString;

    fetch(vidUrl)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayRecipeVideoResults(responseJson, userInput))
    .catch(error => {
        alert(`Something went wrong: ${error.message}`);
        $('#vid-individual-results').empty();
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
    $('#nutrition-individual-results').empty();

    $('#nutrition-individual-results').append(
        `<li>
            <h3>${capitalizeFirstLetter(responseJson.foods[0].food_name)}</h3>
            <p>Serving Size: ${responseJson.foods[0].serving_qty} ${responseJson.foods[0].serving_unit} 
            (${Math.round(responseJson.foods[0].serving_weight_grams)}g)</p>
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
    const nutritionAppId = '6cab22bc';
    const nutritionApiKey = '465ee2bcbbae8b0562cfed7aa48a9a9a';
    const url = 'https://trackapi.nutritionix.com/v2/natural/nutrients';
    const data = {'query': userInput};

    fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: new Headers({
        'x-app-id': nutritionAppId,
        'x-app-key': nutritionApiKey,
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
        alert(`Something went wrong: ${error.message}`);
        $('#nutrition-individual-results').empty();
        $('#nutrition-individual-results').append(
            '<p>Sorry, I could not find any nutrition information for that food item. Please try modifying your search.</p>');
    })
}


//nutrition info above
/*==============================================================================================================*/
//scroll features below


function nutritionInfoScroll() {
    let previousPosition = window.pageYOffset;

    $(window).on('scroll', function(event) {
        let currentPosition = window.pageYOffset;
        if ($(window).width() >= 1083 && currentPosition > previousPosition) {
            $('#nutrition-container').removeClass('nutrition-scroll-down').addClass('nutrition-scroll-up');
        }
        else if ($(window).width() >= 1083 && currentPosition < previousPosition) {
            $('#nutrition-container').removeClass('nutrition-scroll-up').addClass('nutrition-scroll-down');
        }
        previousPosition = currentPosition;
    });
}



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



function scrollToTop() {
    $('#nav').on('click', '#results-title', function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: 0}, 'slow');
    });
}



function scrollToRecipes() {
    $('#nav').on('click', '#recipes', function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: $('#recipes-container').offset().top - 42}, 'slow');
    });
}



function scrollToVideos() {
    $('#nav').on('click', '#videos', function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: $('#videos-container').offset().top - 42}, 'slow');
    });
}


//scroll features above
/*==============================================================================================================*/
//window resize features below


function windowResize() {
    $(window).resize(function() {
        if ($(window).width() >= 1083) {
            $('#search-results').addClass('flex-row-big-screen');
        } else {
            $('#search-results').removeClass('flex-row-big-screen');
        }
    });
}



function windowSize() {
    if ($(window).width() >= 1083) {
        $('#search-results').addClass('flex-row-big-screen');
    } else {
        $('#search-results').removeClass('flex-row-big-screen');
    }
}


//window resize features above
/*==============================================================================================================*/
//switching header features below


function switchHeader() {
    if ($(window).width() < 1083) {
        $('#nav').removeClass('large-header').addClass('flexbox-row small-header');
        $('#title').addClass('hidden');
        $('#recipes').removeClass('hidden');
        $('#videos').removeClass('hidden');
    } else {
        $('#nav').removeClass('large-header').addClass('small-header');
        $('#title').addClass('hidden');
        $('#results-title').removeClass('hidden');
    }
}



function switchHeaderResize() {
    $(window).resize(function() {
        if ($(window).width() < 1083) {
            $('#nav').removeClass('large-header').addClass('flexbox-row small-header');
            $('#title').addClass('hidden');
            $('#recipes').removeClass('hidden');
            $('#videos').removeClass('hidden');
            $('#results-title').addClass('hidden');
        } else {
            $('#nav').removeClass('large-header flexbox-row').addClass('small-header');
            $('#title').addClass('hidden');
            $('#results-title').removeClass('hidden');
            $('#recipes').addClass('hidden');
            $('#videos').addClass('hidden');
        }
    });
}


//switching header features above
/*==============================================================================================================*/
//prepare page for displaying results below


function prepareForDisplayingResults() {
    $('body').removeClass('overflow-hidden').addClass('results-page-background');
    $('main').removeClass('landing-page-background');
    $('#search-results').removeClass('hidden');
    $('.description').addClass('hidden');
    $('.js-search-form').addClass('search-nav');
    $('.container').addClass('flexbox-column');
    $('.landing-container').removeClass('flex-container');
    $('#food-type').val('');
}


//prepare page for displaying results above
/*==============================================================================================================*/
//on load and submit below


function watchForm() {
    $('body').addClass('overflow-hidden');
    setTimeout(function(){ $('.transition').addClass('hidden'); }, 2000);
    $('main').addClass('landing-page-background');
    $('.landing-container').addClass('flex-container');

    $('.js-search-form').submit(event => {
        event.preventDefault();
        const userInput = $('#food-type').val();
        getTextRecipes(userInput);
        getRecipeVideos(userInput);
        getNutritionInfo(userInput);
        navBarUpOnScrollDown()
        scrollToTop();
        scrollToRecipes();
        scrollToVideos();
        windowResize();
        windowSize();
        nutritionInfoScroll();
        switchHeader();
        switchHeaderResize();
        prepareForDisplayingResults();
    });
}

$(watchForm);