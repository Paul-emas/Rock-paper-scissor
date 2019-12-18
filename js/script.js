var UIcontroller = (function () {

    var DOMstrings = {
        scores: '#scores',
        paper: '.btn-paper',
        scissors: '.btn-scissors',
        rock: '.btn-rock',
        rules: '.icon__box--rules',
        modal: '.rules__modal',
        close: '.closeBtn',
        container: '#iconBox',
        container2: '.icon__box--2',
        container3: '#newItem',
        paper2: '.btn-paper--2',
        scissors2: '.btn-scissors--2',
        rock2: '.btn-rock--2',
        paper3: '.btn-paper--3',
        scissors3: '.btn-scissors--3',
        rock3: '.btn-rock--3',
        domantBg: '.btn--3',
        checker: '.checker',
        reset: 'reset'
    };

    return {

        DOMbuttons: function () {
            return {
                paperBtn: document.querySelector(DOMstrings.paper),
                scissorsBtn: document.querySelector(DOMstrings.scissors),
                rockBtn: document.querySelector(DOMstrings.rock),
                activePaper: document.querySelector(DOMstrings.paper2),
                activeScissors: document.querySelector(DOMstrings.scissors2),
                activeRock: document.querySelector(DOMstrings.rock2),
                validPaper: document.querySelector(DOMstrings.paper3),
                validScissors: document.querySelector(DOMstrings.scissors3),
                validRock: document.querySelector(DOMstrings.rock3),
                resetBtn: document.getElementById(DOMstrings.reset)
            }
        },

        getDOMstrings: function () {
            return DOMstrings;
        }

    }

})();


var controller = (function (UIctrl) {

    // Get DOM strings
    var rulesBtn, modal, DOM;
    DOM = UIctrl.getDOMstrings();

    // Modal 

    // Resetting scores
    var scoreText = document.querySelector(DOM.scores);

    // Updating the checker (if user wins or not)            
    var score = 0;

    function updateScore() {
        var checkText = document.querySelector(DOM.checker);
        if (checkText.textContent === 'win') {
            score += 1;
            scoreText.textContent = score;
        } else if (checkText.textContent === 'lose' && score > 0) {
            score -= 1;
            scoreText.textContent = score;
        } else {
            scoreText.textContent = '0';
        }
    }


    // Open modal
    function openModal() {
        rulesBtn = document.querySelector(DOM.rules);
        modal = document.querySelector(DOM.modal);
        rulesBtn.addEventListener('click', function () {
            modal.style.display = 'block';
        });
    }
    openModal();

    // Close Modal
    function closeModal() {
        var close = document.querySelector(DOM.close);
        close.addEventListener('click', function () {
            modal.style.display = 'none';
        });
    }
    closeModal();

    // Removing the selector buttons 
    function clear() {
        document.querySelector(DOM.container).style.display = 'none';
        document.querySelector(DOM.container2).style.display = 'block';
    }


    // Buttons Clicked
    var UIbtn = UIctrl.DOMbuttons();

    var arr = [UIbtn.validPaper, UIbtn.validScissors, UIbtn.validRock];
    var random = Math.floor(Math.random() * arr.length);

    function randomCalc() {
        if (arr[random] === UIbtn.validPaper) {
            UIbtn.validPaper.style.display = 'block';
        } else if (arr[random] === UIbtn.validScissors) {
            UIbtn.validScissors.style.display = 'block';
        } else {
            UIbtn.validRock.style.display = 'block';
        }
    }

    function buttonsClicked() {
        randomCalc();
        (function () {
            UIbtn.paperBtn.addEventListener('click', function () {
                clear();
                UIbtn.activePaper.style.display = 'block';

                // Removing the dominant bg
                remove();

                function remove() {
                    var bg = document.querySelector(DOM.domantBg);
                    bg.style.display = 'none';
                }

                // Creating a new element
                randomCalc();

                // Checking for paper
                (function () {
                    var checkText = document.querySelector(DOM.checker);
                    if (arr[random] === UIbtn.validRock) {
                        checkText.textContent = 'win';
                        console.log('You win');
                    } else {
                        checkText.textContent = 'lose';
                        console.log('You lose');
                        randomCalc();
                    }


                    updateScore();
                })();
            });

            UIbtn.scissorsBtn.addEventListener('click', function () {
                clear();
                UIbtn.activeScissors.style.display = 'block';

                // Removing the dominant bg
                remove();

                function remove() {
                    var bg = document.querySelector(DOM.domantBg);
                    bg.style.display = 'none';
                }

                // Creating a new element
                randomCalc();

                // Checking for scissors 
                (function () {
                    var checkText = document.querySelector(DOM.checker);
                    if (UIbtn.validScissors !== arr[random] && arr[random] === UIbtn.rockBtn) {
                        checkText.textContent = 'win';
                        console.log('You win');
                    } else if (arr[random] === UIbtn.validPaper) {
                        checkText.textContent = 'win';
                        console.log('You win');
                    } else {
                        checkText.textContent = 'lose';
                        console.log('You lose');
                    }

                    updateScore();
                })();

            });

            UIbtn.rockBtn.addEventListener('click', function () {
                clear();
                UIbtn.activeRock.style.display = 'block';

                // Removing the dominant bg
                remove();

                function remove() {
                    var bg = document.querySelector(DOM.domantBg);
                    bg.style.display = 'none';
                }

                // Creating a new element
                randomCalc();


                // Checking for rock
                (function () {
                    var checkText = document.querySelector(DOM.checker);
                    if (UIbtn.validRock === arr[random]) {
                        checkText.textContent = 'lose';
                        console.log('You lose');
                    } else {
                        checkText.textContent = 'win';
                        console.log('You win');
                    }

                    updateScore();
                })();
            });
        })();
    }

    // Init

    return {
        init: function () {
            scoreText.textContent = '0';
            document.getElementById('resetBtn').addEventListener('click', function () {
                location.reload();
            });
            buttonsClicked();
        }
    }
})(UIcontroller);

controller.init();