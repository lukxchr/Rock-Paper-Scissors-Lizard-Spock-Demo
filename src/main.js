function Move(props) {
	return (
		<button 
			className="move"
			onClick={props.onClick}
		>{props.name}</button>
	);
}

function PlayAgainButton(props) {
  return (
    <button
      id="play-again-btn"
      onClick={props.onClick}
    >Play Again</button>
	);
}

function ShowRulesButton(props) {
  return (
    <button
      id="rules-button"
      onClick={() => alert('rules!')}
    >Rules</button>
  );
}

function RulesModal(props) {
  return (
    <div>Rulesboard</div>
  );
}

function Scoreboard(props) {
	return (
		<div id="scoreboard">
			<div id="scoreboard-title">
				Rock<br/>Paper<br/>Scissors
			</div>
			<div id="score">
				<span id="score-label">Score: </span>
				<span id="score-value">{props.score}</span>
			</div>
		</div>
	);
}

class Board extends React.Component {
	renderMove(move) {
		return (
		<Move
			name={move}
			key={move}
			onClick={() => this.props.handleMoveClick(move)}
		/>);
	}

  renderMovesPickedStep() {
    return (
        <div>
          <p>You picked {this.renderMove(this.props.playerMove)}</p>
          <p>The house picked {this.renderMove(this.props.houseMove)}</p>
        </div>
      );
  }

  renderShowResultsStep() {
    let resultMessage = this.props.roundResult === 1 ? 'You win' : 
        (this.props.roundResult === 0 ? "It's a tie" : 'You lose');
      return (
        <div>
          <p>You picked {this.props.playerMove}</p>
          <p>The house picked {this.props.houseMove}</p>
          <p>{resultMessage}</p>
          <PlayAgainButton onClick={() => this.props.handlePlayAgainClick()}/>
        </div>
      );
  }

	render() {
		if (this.props.gameStep === 'roundStart') return this.props.moves.map(move => this.renderMove(move));
		if (this.props.gameStep === 'movesPicked') return this.renderMovesPickedStep();
		if (this.props.gameStep === 'showResult') return this.renderShowResultsStep(); 
    return "Invalid game step."
	}
}

class Game extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			score: 0,
			gameStep: 'roundStart',
		};
		this.handleWindowClick = this.handleWindowClick.bind(this);
    this.handlePlayAgainClick = this.handlePlayAgainClick.bind(this);
	}

	handleMoveClick(move) {
		//choose randomly 
		const houseMove = this.props.moves[Math.floor(Math.random() * this.props.moves.length)];
		//-1=you lose, 0=draw, 1=you win
		const roundResult = move === houseMove ? 0 : 
			(this.props.rules[move].includes(houseMove) ? 1 : -1);
		this.setState({
			playerMove: move,
			houseMove: houseMove,
			roundResult: roundResult,
			gameStep: 'movesPicked'
		});
	}

  handlePlayAgainClick() {
    this.setState({gameStep: 'roundStart'});
  }
	//global listener (e.g. click anywhere to go to the next step)
	handleWindowClick() {
		if (this.state.gameStep == 'movesPicked') {
			const newScore = this.state.score + this.state.roundResult;
			this.setState({
				score: newScore,
				gameStep: 'showResult'
			});	
		} 
	}

	render() {
		return (
			<div onClick={this.handleWindowClick}>
				<Scoreboard
					score = {this.state.score}
				/>
				<Board
					moves = {this.props.moves}
					handleMoveClick = {move => this.handleMoveClick(move)}
          handlePlayAgainClick = {() => this.handlePlayAgainClick()}
					gameStep = {this.state.gameStep}
					playerMove = {this.state.playerMove}
					houseMove = {this.state.houseMove}
					roundResult = {this.state.roundResult}
				/>
				<ShowRulesButton/>
			</div>
		);
	}
}

const moves = ['Rock', 'Paper', 'Scissors', 'Lizard', 'Spock'];
//rules[x]=[a,b,c] means x beats a, b and c
const rules = {
	'Rock': ['Lizard', 'Scissors'],
	'Paper': ['Rock', 'Spock'],
	'Scissors': ['Paper', 'Lizard'],
	'Lizard': ['Spock', 'Paper'],
	'Spock': ['Scissors', 'Rock']
}

ReactDOM.render(
	<Game 
		moves = {moves}
		rules = {rules} 
	/>,
	document.getElementById('root')
);

 // (
 //    	<React.Fragment>
 //    	<h1>Hello, world!</h1>
 //    	<h2>it's react</h2>
 //    	</React.Fragment>
 //    )