
(function runGame() {

    var display = document.getElementById('cards');
    var cards = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

    /* Display cards on page load*/
    newCards();
    /* Do not hit or stand on first two cards on page load */
    checkResult(false, false);

    /**
     * Choose random card from cards array
     * @return {String}     Value of the card
     */
    function randomCard() {
        var card = Math.floor(Math.random() * cards.length);
        return cards[card];
    }

    /**
     * Display two random cards
     * @return {Void}
     */
    function newCards() {
        display.innerHTML = randomCard() + ' ' + randomCard();
    };

    /**
     * Check the result of the current cards and alert the game result
     *
     * @param  {Boolean} standing  Whether or not the player is standing
     * @param  {Boolean} hitting   Whether or not the player is hitting
     * @return {void}
     */
    function checkResult(standing, hitting) {
        var cards = display.innerHTML.split(' ');

        var cardValue = 0;

        cards.forEach(function (card, i) {
            if ( Number(card) ) {
                cardValue += Number(card);
            }

            if (card === 'J' || card === 'Q' || card === 'K') {
                cardValue += 10;
            }

            if (card === 'A') {
                cardValue += 11;
            }
        });

        console.log(cardValue);

        if ( cardValue < 16 && standing ) {
            alert('Dealer wins.');
            newCards();
        } else if ( cardValue <= 18 && standing ) {
            alert('Push!');
            newCards();
        } else if ( ( cardValue > 18 && standing ) || cardValue === 21) {
            alert('You win!');
            newCards();
        } else if (cardValue > 21) {
            alert('You Bust.');
            newCards();
        }

    }

    /**
     * Display a new card and check result
     * @return {void}
     */
    function hit() {
        display.innerHTML = display.innerHTML + ' ' + randomCard();
        checkResult(false, true);
    }

    document.getElementById('stand').addEventListener('click', function() {
        checkResult(true, false);
    });

    document.getElementById('hit').addEventListener('click',function() {
        hit();
    });

})();
