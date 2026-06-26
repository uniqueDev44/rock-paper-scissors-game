
    const score = JSON.parse(localStorage.getItem('scores')) || {
      wins: 0,
      losses: 0,
      ties: 0
    };

    updateScore();

    const resetScoreButton = document.querySelector('.js-reset-score-button');

    resetScoreButton.addEventListener('click', () => {
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.clear('scores');
      updateScore();
    })

    let intervalId;
    let isAutoPlaying = false;

    const autoPlayButton = document.querySelector('.js-autoplay-button');
    autoPlayButton.addEventListener('click', () => {
      autoPlay();
    })

    function autoPlay() {
      const playerChoice = pickComputerChoice();

      if (!isAutoPlaying && autoPlayButton.innerHTML !== 'Stop Playing') {
        intervalId = setInterval(() => {
          playGame(playerChoice)
        },1000);
        isAutoPlaying = true;
        autoPlayButton.innerHTML = 'Stop Playing'
      }else {
        clearInterval(intervalId);
        isAutoPlaying = false;
        autoPlayButton.innerHTML = 'AutoPlay'
      }
      
    }

    const rockButton = document.querySelector('.js-rock-button');
    rockButton.addEventListener('click', () => {
      playGame('rock');
    })

    const paperButton = document.querySelector('.js-paper-button');
    paperButton.addEventListener('click', () => {
      playGame('paper');
    })

    const scissorsButton = document.querySelector('.js-scissors-button');
    scissorsButton.addEventListener('click', () => {
      playGame('scissors');
    })

    function playGame(playerChoice)  {
      const computerChoice = pickComputerChoice();
    
      let result = '';

      if (playerChoice === 'rock') {
        if (computerChoice === 'rock') {
          result = 'Tie!';
        }else if (computerChoice === 'paper') {
          result = 'You Lose!';
        }else if (computerChoice === 'scissors') {
          result = 'You Win!';
        }
      }else if (playerChoice === 'paper') {
        if (computerChoice === 'rock') {
          result = 'You Win!';
        }else if (computerChoice === 'paper') {
          result = 'Tie!';
        }else if (computerChoice === 'scissors') {
          result = 'You Lose!';
        }
      }else if (playerChoice === 'scissors') {
        if (computerChoice === 'rock') {
          result = 'You Lose!';
        }else if (computerChoice === 'paper') {
          result = 'You Win!';
        }else if (computerChoice === 'scissors') {
          result = 'Tie!';
        }
      }

      if (result === 'You Win!') {
        score.wins += 1
      } else if (result === 'You Lose!') {
        score.losses += 1
      }else if (result === 'Tie!') {
        score.ties += 1
      }

      localStorage.setItem('scores', JSON.stringify(score));

      document.querySelector('.js-result')
        .innerHTML = result;
      document.querySelector('.js-choice')
        .innerHTML = `you 
        <img src="images/${playerChoice}-emoji.png" alt="" class="move-icon"> .
        computer 
        <img src="images/${computerChoice}-emoji.png" alt="" class="move-icon">`;

      updateScore();
    }


    function updateScore() {
      document.querySelector('.js-score')
        .innerHTML = `wins: ${score.wins}, losses ${score.losses}, Ties: ${score.ties}`
    }
    

    function pickComputerChoice() {
      const randomNumber = Math.random();

      let computerChoice = '';

      if(randomNumber > 0 && randomNumber <= 1 /3) {
        computerChoice = 'rock';
      }else if (randomNumber > 1 /3 && randomNumber <= 2 /3){
        computerChoice = 'paper';
      }else if (randomNumber > 2 /3 && randomNumber <= 1){
        computerChoice = 'scissors';
      }
      return computerChoice;
    }