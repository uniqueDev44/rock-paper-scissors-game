
    const score = JSON.parse(localStorage.getItem('scores')) || {
      wins: 0,
      losses: 0,
      ties: 0
    };

    updateScore();

     const resetScoreButton = document.querySelector('.js-reset-score-button');

      resetScoreButton.addEventListener('click', () => {
        confirmationMsg()
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

    function resetScore() {
      score.wins = 0;
      score.losses = 0;
      score.ties = 0;
      localStorage.clear('scores');
      updateScore();
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

    document.body.addEventListener('keydown', (event) => {
      if (event.key === 'r') {
        playGame('rock')
      }else if (event.key === 'p') {
        playGame('paper')
      }else if (event.key === 's') {
        playGame('scissors')
      }else if (event.key === 'a') {
        autoPlay()
      }else if (event.key === 'Backspace') {
        confirmationMsg();
      }
    })

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


    const displayConfirmation = document.querySelector('.js-confirmation-msg');
    function confirmationMsg() {
      displayConfirmation.innerHTML = `
        Are You Sure You Want To Reset The Score
        <button class="js-yes-reset">Yes</button>
        <button class="js-no-reset">No</button>
      `

      document.querySelector('.js-yes-reset').addEventListener('click', () => {
        resetScore();
        hideConfirmation()
      })
      document.querySelector('.js-no-reset').addEventListener('click', () => {
        hideConfirmation()
      })
    }

    function hideConfirmation() {
      displayConfirmation.innerHTML = ''
    }