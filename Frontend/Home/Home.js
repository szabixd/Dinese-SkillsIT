document.addEventListener('DOMContentLoaded', function () {
    var cardStorage = document.getElementById('testimonialsSharedCardStorage');
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