    document.addEventListener('DOMContentLoaded', () => {

        document.getElementById("submit-password").addEventListener("click", function() {
            var password = document.getElementById("password-input").value;
            var correctPassword = "fadoslemeilleurdumonde"; // Set your desired password here
            var errorMessage = document.querySelector('.error-message');
            var successMessage = document.querySelector('.success-message');
            
            if (password === correctPassword) {

                successMessage.textContent = 'Treeeees bien la Monetis. Tres smart! Bwinne Chwince!!';
                successMessage.classList.remove('hidden');
                errorMessage.textContent = ''; // Clear any previous error message
                // Hide the password overlay and show the main content
                setTimeout(function() {
                    document.getElementById("password-overlay").style.display = "none";
                    document.getElementById("main-content").classList.remove("hidden");
                }, 1000); // 2-second delay
            } else {
                // Show error message
                document.getElementById("error-message").textContent = "Incorrect password, please try again.";
            }
        });

        const questions = [
            {
                question: "Quel est mon équipe de foot préférée ?",
                answers: ["Real Madrid", "Manchester United", "FC Barcelona", "Chelsea"],
                correct: 2,
                topic: "easy"
            },
            {
                question: "Quel est mon signe astrologique ?",
                answers: ["Gémeaux", "Taureau", "Bélier", "Cancer"],
                correct: 1,
                topic: "easy"
            },
            {
                question: "Quelle est ma pointure ?",
                answers: ["40", "41", "42", "40.5"],
                correct: 1,
                topic: "easy"
            },
            {
                question: "Qui est mon meilleur ami?",
                answers: ["Hassan", "Yassin", "Omar", "Ilias"],
                correct: 3,
                topic: "easy"
            },
            {
                question: "Quel a été le premier cadeau que je t'ai offert ?",
                answers: ["Fleures", "Livre", "Parfum", "Chocolat"],
                correct: 2,
                topic: "monetis"
            },
            {
                question: "Quel est mon plat préféré ?",
                answers: ["Paella", "Couscous", "Pizza", "Pates"],
                correct: 0,
                topic: "medium"
            },
            {
                question: "Quelle est ma couleur préférée ?",
                answers: ["Vert", "Orange", "Bleu", "Rouge"],
                correct: 2,
                topic: "medium"
            },
            {
                question: "Qui est mon artiste préféré ?",
                answers: ["Kendrick Lamar", "Tupac", "Drake", "Eminem"],
                correct: 3,
                topic: "medium"
            },
            {
                question: "Quel est mon jeu vidéo préféré ?",
                answers: ["FIFA", "The Legend of Zelda", "Grand Theft Auto (GTA)", "Super Mario"],
                correct: 2,
                topic: "medium"
            },
            {
                question: "Qu'est-ce que je préfere en toi physiquement ?",
                answers: ["Sourire", "Yeux", "Cheveux", "Corps"],
                correct: 0,
                topic: "monetis"
            },
            {
                question: "Quelle est ma destionation révée ?",
                answers: ["Tokyo", "NYC", "Bali", "Cuba"],
                correct: 1,
                topic: "hard"
            },
            {
                question: "Combien je mesure ?",
                answers: ["1m 75", "1m 70", "1m 68", "1m 72"],
                correct: 3,
                topic: "hard"
            },
            {
                question: "Combien de pays j'ai visité ?",
                answers: ["2", "3", "4", "5"],
                correct: 2,
                topic: "hard"
            },
            {
                question: "Quel est mon film préféré ?",
                answers: ["Forrest Gump", "Shutter Island", "The Godfather", "Inception"],
                correct: 0,
                topic: "hard"
            },
            {
                question: "Où est-ce que je t'ai dit 'Je t'aime' pour la première fois ?",
                answers: ["Plage", "Maison Omar", "Ma maison", "Banyan Tree"],
                correct: 3,
                topic: "monetis"
            },
            {
                question: "Quelle était ma matière préférée à l'école ?",
                answers: ["Maths", "Physique", "Chimie", "SVT"],
                correct: 1,
                topic: "super"
            },
            {
                question: "Quelle est la partie de mon corps que j'aime le moins ?",
                answers: ["Mes épaules", "Ma taille", "Mon crâne", "Mes dents"],
                correct: 2,
                topic: "super"
            },
            {
                question: "Combien de tantes y'a t'il du côte de ma mère ?",
                answers: ["3", "5", "4", "6"],
                correct: 1,
                topic: "super"
            },
            {
                question: "Mon souvenir traumatisand d'enfance s'est passé dans: ?",
                answers: ["Un zoo", "L'école", "Un supermarché", "Un parc"],
                correct: 0,
                topic: "super"
            },
            {
                question: "Quelle est la personne dont je suis amoureux ?",
                answers: ["Monetis", "Reine Monetis", "La Mwine", "Mouna Benajiba"],
                correct: 3,
                topic: "monetis"
            }
        ];

        let currentQuestion = 0;

        function unlockNextTile() {
            if (currentQuestion < totalTiles - 1) {
                currentQuestion++; // Move to the next question
                const nextTile = document.getElementById(`tile${currentQuestion + 1}`);
                nextTile.classList.remove('locked'); // Unlock the next tile
                nextTile.classList.remove('disabled'); // Make it interactive
            }
        }

        function handleClick(tileId) {
            const tile = document.getElementById(`tile${tileId}`);

            if (tileId - 1 > currentQuestion) {
                alert("Tu dois répondre à la question précedente en premier!");
                return;
            }

            if (!tile.classList.contains('clicked') && !clickedTiles[tileId - 1]) {
                tile.classList.add('clicked');
                clickedTiles[tileId - 1] = true;

                const questionContent = document.createElement('div');
                questionContent.classList.add('question-content');

                const answersContent = document.createElement('div');
                answersContent.classList.add('answers-content');

                tile.querySelector('.back').appendChild(questionContent);
                tile.querySelector('.back').appendChild(answersContent);

                const closeButton = document.createElement('button');
                closeButton.classList.add('close-btn');
                closeButton.textContent = '×';
                closeButton.addEventListener('click', (event) => {
                    event.stopPropagation();
                    handleClose(tileId);
                });
                tile.querySelector('.back').appendChild(closeButton);

                const chronoButton = document.createElement('button');
                chronoButton.classList.add('chrono-btn');
                chronoButton.style.backgroundImage = 'url("img/stopwatch.png")';
                chronoButton.addEventListener('click', () => {
                    startCountdown(tileId);
                    chronoButton.disabled = true; 
                })
                tile.querySelector('.back').appendChild(chronoButton);

                const questionData = questions[tileId - 1];
                questionContent.textContent = questionData.question;

                questionData.answers.forEach((answer, index) => {
                    const answerButton = document.createElement('button');
                    answerButton.classList.add('answer-btn');
                    answerButton.textContent = answer;
                    answerButton.addEventListener('click', () => {
                        handleAnswerClick(answerButton, index, tileId);
                    });
                    answersContent.appendChild(answerButton);
                });
                
                createCountdown(tileId);
            }
        }

        let correctAudio = new Audio('audio/happy.mp3');
        let wrongAudio = new Audio('audio/crying.mp3');

        const pointsMapping = {
            easy: 1,
            medium: 3,
            hard: 5,
            super: 7,
            monetis: 9
        };

        let totalPoints = 0;
        const maxPoints = 100; // Based on the total points system you described

        function updateProgressBar() {
            const progressBar = document.getElementById('progress-fill');
            const progress = (totalPoints / maxPoints) * 100;
            progressBar.style.height = `${progress}%`;
            // Check milestones
            checkMilestones(progress);
        }


        function showVideo() {
            const videoContainer = document.createElement('div');
            videoContainer.classList.add('video-container');
    
            const closeButton = document.createElement('button');
            closeButton.classList.add('close-video-btn');
            closeButton.textContent = '×';
            closeButton.addEventListener('click', () => {
                videoContainer.remove(); // Remove the video container when close button is clicked
            });
    
            const videoElement = document.createElement('iframe');
            videoElement.src = 'https://www.youtube.com/embed/35-jus6Xul4'; // Replace VIDEO_ID with the actual video ID
            videoElement.frameBorder = '0';
            videoElement.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            videoElement.allowFullscreen = true;
    
            videoContainer.appendChild(closeButton);
            videoContainer.appendChild(videoElement);
            document.body.appendChild(videoContainer); // Append video container to body or another container
        }

        function showQRCode() {
            const qrContainer = document.getElementById('qr-container');
            qrContainer.classList.remove('hidden');
        
            const closeButton = document.getElementById('close-qr-btn');
            closeButton.addEventListener('click', () => {
                qrContainer.classList.add('hidden');
            });
        }

        let videoShown = false; // Flag to track if video has been shown
        let qrCodeShown = false; // Flag to track if QR code has been shown

        function checkMilestones(progress) {
            const milestones = {
                13: 'gift1',
                34: 'gift2',
                63: 'gift3',
                100: 'gift4'
            };
        
            for (const [threshold, giftId] of Object.entries(milestones)) {
                const gift = document.getElementById(giftId);
                const milestone = parseInt(threshold);
        
                if (progress >= milestone) {
                    if (!gift.classList.contains('milestone-reached')) {
                        gift.classList.add('milestone-reached');
                    }
                    if (threshold === '63' && !videoShown) { // Show video at 63%
                        showVideo();
                        videoShown = true;
                    }
                    if (threshold === '100' && !qrCodeShown) { // Show qr at 100%
                        showQRCode();
                        qrCodeShown = true;
                    }
                }
            }
        }

        function updateScore() {
            const scoreLabel = document.getElementById('score-value');
            scoreLabel.textContent = totalPoints;
        }

        function handleAnswerClick(answerButton, index, tileId) {
            const tile = document.getElementById(`tile${tileId}`);
            const answersContent = tile.querySelector('.answers-content');
            
            const countdownContent = tile.querySelector('.countdown');
            const isFlashing = countdownContent.classList.contains('flash-text');

            const questionData = questions[tileId - 1];
            if (countdownIntervals[tileId]) {  // Check if countdown is running
                stopCountdown(tileId);
                tickingAudio.pause();
                tickingAudio.currentTime = 0;

                if (isFlashing) {
                    countdownContent.classList.remove('flash-text');
                    tile.querySelector('.back').classList.remove('flash-background');
                }

                // Remove any existing GIFs
                const existingGifs = document.querySelectorAll('.result-gif');
                existingGifs.forEach(gif => gif.remove());

                // Create GIF element
                const gif = document.createElement('img');
                gif.classList.add('result-gif');
                gif.style.position = 'absolute';
                gif.style.top = '50%';
                gif.style.left = '50%';
                gif.style.transform = 'translate(-50%, -50%)';
                gif.style.zIndex = '1000';
                gif.style.width = '500px'; // Adjust size as needed
                gif.style.height = '500px'; // Adjust size as needed

                if (index === questionData.correct) {
                    correctAudio.play();
                    countdownContent.textContent = 'CORRECTE :D';
                    answerButton.classList.add('submitted');
                    tile.querySelector('.back').style.backgroundColor = '#14c93c';

                    // Award points based on topic
                    totalPoints += pointsMapping[questionData.topic];
                    updateProgressBar(); // Update the progress bar based on the points

                    updateScore(); // Update the score label

                    gif.src = 'img/happyhappy.gif'; // Path to the wrong answer GIF

                    unlockNextTile();
                    
                } else {
                    wrongAudio.play();
                    countdownContent.textContent = 'FAUX :(';
                    answerButton.classList.add('incorrect');
                    const correctAnswerButton = answersContent.querySelector(`.answer-btn:nth-child(${questionData.correct + 1})`);
                    correctAnswerButton.classList.add('correct');
                    correctAnswerButton.style.animation = 'flash 1.2s infinite';
                    tile.querySelector('.back').style.backgroundColor = '#ff5500';
                    
                    gif.src = 'img/banana-cat-nobg.gif';

                    unlockNextTile();
                }

                console.log('Adding GIF:', gif.src);
                if (answersContent) {
                    answersContent.appendChild(gif);
                } else {
                    console.log('No answers-content element found in tile', tileId);
                }

                // Disable all answer buttons
                const allAnswerButtons = answersContent.querySelectorAll('.answer-btn');
                allAnswerButtons.forEach(button => {
                    button.disabled = true;
                });
                
            } else {
                countdownContent.textContent = 'Lancer le chrono en premier!';
                countdownContent.style.color = '#f52a48';
            }

        }

        function stopCountdown(tileId) {
            clearInterval(countdownIntervals[tileId]);
            countdownIntervals[tileId] = null;

        }

        let tickingAudio = new Audio('audio/clock-millionaire-cut.mp3');
        let tickingEnd = new Audio('audio/clock-millionaire-end.mp3');
        const countdownIntervals = {};

        function createCountdown(tileId){
            const tile = document.getElementById(`tile${tileId}`);
            const backTile = tile.querySelector('.back');
            const questionContent = tile.querySelector('.question-content');
            // Create the countdown element
            const countdownElement = document.createElement('div');
            countdownElement.classList.add('countdown');
            countdownElement.textContent = '20';

            // Check if there's a scrollbar
            if (backTile.scrollHeight > backTile.clientHeight) {
                // Move the countdown element to the top
                backTile.insertBefore(countdownElement, backTile.firstChild);
                questionContent.style.paddingTop = '10px';
            } else {
                // Append the countdown element at the end
                backTile.appendChild(countdownElement);
            }
        }

        function startCountdown(tileId) {
            const tile = document.getElementById(`tile${tileId}`);
            const backTile = tile.querySelector('.back');
            const countdownElement = backTile.querySelector('.countdown');

            countdownElement.textContent = '20';
            countdownElement.style.color = 'white';

            let countdownValue = 20;

            countdownInterval = setInterval(() => {
                countdownValue--;
                if (countdownValue >= 0) {
                    countdownElement.textContent = countdownValue;
                }

                if (countdownValue <= 0) {
                    clearInterval(countdownInterval);
                    countdownElement.textContent = 'TEMPS ÉCOULÉ !';
                    handleCountdownEnd(tileId);
                } else if (countdownValue <= 5) {
                    countdownElement.classList.add('flash-text');
                    backTile.classList.add('flash-background');
                }
            }, 1000);

            // Store the countdown interval ID in the object
            countdownIntervals[tileId] = countdownInterval;

            tickingAudio.play();
        }


        function handleCountdownEnd(tileId) {
            const tile = document.getElementById(`tile${tileId}`);
            tile.querySelector('.back').style.backgroundColor = '#ff5500';
            tile.querySelector('.back').classList.remove('flash-background');
            tile.querySelector('.countdown').classList.remove('flash-text');
            /* const answerButtons = tile.querySelector('.answers-content').querySelectorAll('.answer-btn');
            answerButtons.forEach(button => {
                button.disabled = true;
            }); */

        }

        function handleClose(tileId) {
            const tile = document.getElementById(`tile${tileId}`);
            tile.classList.remove('clicked');
            clickedTiles[tileId - 1] = true;
            tickingAudio.pause();
            tickingAudio.currentTime = 0;
            correctAudio.pause();
            correctAudio.currentTime = 0;
            wrongAudio.pause();
            wrongAudio.currentTime = 0;

            // Update the appearance of the tile in the grid
            tile.style.backgroundColor = 'black';
            tile.querySelector('.front').style.backgroundColor = 'black';

            const back = tile.querySelector('.back');

            // Remove flashing effect class if it exists
            if (back.classList.contains('flash-background')) {
                back.classList.remove('flash-background');
            }

            while (back.firstChild) {
                back.removeChild(back.firstChild);
            }

            // Clear the countdown interval associated with the closed tile
            clearInterval(countdownIntervals[tileId]);

            // Reset background color and remove flashing effect
            tile.querySelector('.back').style.backgroundColor = '';
            tile.querySelector('.countdown').classList.remove('flash-text');

            
        }

        // Function to assign colors based on topics
        function assignTileColor(topic) {
            switch (topic) {
                case 'easy':
                    return '#06d106'; // Light brown
                case 'medium':
                    return '#3d44ff'; // Green
                case 'hard':
                    return '#ff6219'; // Blue
                case 'super':
                    return '#f70202'; // Light yellowish
                case 'monetis':
                    return '#9807db';
                default:
                    return 'black';
            }
        }

        const board = document.getElementById('board');
        const totalTiles = questions.length;

        // Initialize an array to keep track of clicked tiles
        const clickedTiles = Array.from({ length: totalTiles }, () => false);

        // Loop through questions to create tiles
        for (let i = 0; i < questions.length; i++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');

            const front = document.createElement('div');
            front.classList.add('front');
            front.textContent = i + 1;

            // Set background color of front tile based on topic
            front.style.backgroundColor = assignTileColor(questions[i].topic);

            tile.appendChild(front);

            const back = document.createElement('div');
            back.classList.add('back');
            tile.appendChild(back);

            tile.id = `tile${i + 1}`;

            if (i > 0) {
                tile.classList.add('locked', 'disabled');
            }

            tile.addEventListener('click', () => handleClick(i + 1));
            board.appendChild(tile);
        }

    });