document.addEventListener('DOMContentLoaded', function () {
    var cardStorage = document.getElementById('testimonialsSharedCardStorage', 'testimonialsHeaderSharedCard');
    var cards = cardStorage.getElementsByClassName('testimonialsSharedCard');
    var cardsArray = Array.from(cards);

    shuffleArray(cardsArray);

    cardsArray.forEach(function (card) {
        cardStorage.appendChild(card);
    });

    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
});

function setRandomPosition(card) {
    var maxX = window.innerWidth - card.offsetWidth;
    var maxY = window.innerHeight - card.offsetHeight;

    var randomX = Math.floor(Math.random() * maxX);
    var randomY = Math.floor(Math.random() * maxY);

    card.style.left = randomX + 'px';
    card.style.top = randomY + 'px';
}

/*Async function for Top Rated Restaurant fetch.*/
async function getFeaturedRestaurant() {
    const response = await fetch('https://es2025-s17-hu-r1-backend.onrender.com/api/v1/restaurants/top-rated');/*backend endpoint for json*/
    const restaurants = await response.json();/*const for json answer.*/
    let intoTOHTML = "";

    /*Try-catch for answer check*/
    try {
        for (let responseInformation of restaurants) {/*For to check all answer line.*/
            let rateINHTML = "";/*varible for rate*/

            for (let i = 1; i <= 5; i++) {/*for cycle for rate stars 1-5*/
                let star = document.createElement('img');/*create star img element in star varible*/
                star.src = i <= responseInformation.rating ? './assets/images/star.png' : './assets/images/star.png';
                star.alt = 'Star';
                if (i - 1 >= responseInformation.rating) {
                    star.classList.add('gray');
                }
                rateINHTML += star.outerHTML;
            }
            /*fill html div on bottom.*/
            intoTOHTML += `
                <div class="card">
                    <div class="card-img">
                        <img src="${responseInformation.image}" alt="">
                    </div>
                    <div class="card-nameandrate">
                        <h2>${responseInformation.name}</h2>
                        <div class="ratestars">
                            ${rateINHTML}
                        </div>
                    </div>
                    <div class="card-description">
                        <p>${responseInformation.description}</p>
                    </div>
                    <a class="card-viewrestaurant" href="#">View restaurant »</a>
                </div>
            `;
        }

    } catch (error) {
        console.error(error);/*Error showed in console.*/
    }

    document.getElementById('cardHolder').innerHTML += intoTOHTML;
}
/*Function call*/
getFeaturedRestaurant();



/*Async function for get all restaurant from endpoints with varibles.*/
let intoTOHTMLlater = "";
let intoTOHTML = "";
async function getAllRestaurant() {
    const response = await fetch('https://es2025-s17-hu-r1-backend.onrender.com/api/v1/restaurants');/*backend endpoint*/
    const restaurants = await response.json();
    let curCard = 0;

    try {/*try-catch for validate answer*/
        for (let responseInformation of restaurants) {
            curCard += 1;
            let rateINHTML = "";

            for (let i = 1; i <= 5; i++) {
                let star = document.createElement('img');
                star.src = i <= responseInformation.rating ? './assets/images/star.png' : './assets/images/star.png';
                star.alt = 'Star';
                if (i - 1 >= responseInformation.rating) {
                    star.classList.add('gray');
                }
                rateINHTML += star.outerHTML;
            }
            if (curCard >= 4) {
                intoTOHTMLlater += `
                    <div class="card">
                        <div class="cardImage">
                            <img src="${responseInformation.image}" alt="">
                        </div>
                        <div class="cardRestaurantnameAndRate">
                            <h2>${responseInformation.name}</h2>
                            <div class="ratedInStar">
                                ${rateINHTML}
                            </div>
                        </div>
                        <div class="cardDescription">
                            <p>${responseInformation.description}</p>
                        </div>
                        <a class="cardfooter" href="#">View restaurant »</a>
                    </div>
                `;
            }
            else {
                intoTOHTML += `
                    <div class="card">
                        <div class="cardImage">
                            <img src="${responseInformation.image}" alt="">
                        </div>
                        <div class="cardRestaurantnameAndRate">
                            <h2>${responseInformation.name}</h2>
                            <div class="ratedInStar">
                                ${rateINHTML}
                            </div>
                        </div>
                        <div class="cardDescription">
                            <p>${responseInformation.description}</p>
                        </div>
                        <a class="cardfooter" href="#">View restaurant »</a>
                    </div>
                `;
            }
        }

    } catch (error) {
        console.error(error);
    }

    document.getElementById('AllRestaurantCard').innerHTML += intoTOHTML;
}

getAllRestaurant();

/*Function for load all card*/
function fillAllResponse() {
    var btn = document.getElementById('showMore');
    var lessbtn = document.getElementById('showLess');

    if (btn.style.display != 'none') {
        document.getElementById('AllRestaurantCard').innerHTML += intoTOHTMLlater;
    }

    btn.style.display = 'none';
    lessbtn.style.display = 'flex';
}

/*Function for less restaurant.*/
function showLessResponse() {
    var btn = document.getElementById('showLess');
    var morebtn = document.getElementById('showMore');

    if (btn.style.display != 'none') {
        document.getElementById('AllRestaurantCard').innerHTML = intoTOHTML;
    }

    btn.style.display = 'none';
    morebtn.style.display = 'flex';
}