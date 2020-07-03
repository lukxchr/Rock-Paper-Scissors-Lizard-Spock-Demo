function Move(props) {
	const outerClases = 
    `move-outer ${props.name.toLowerCase()}-move`;
  return (
    <div
      className={outerClases}
      onClick={props.onClick}
    >
    <div className="move-inner">
      <img className="move-img" src={props.imgPath}/>
    </div>
    </div>
	);
}

function PlayAgainButton(props) {
  return (
    <button
      id="play-again-btn"
      onClick={props.onClick}
    >PLAY AGAIN</button>
	);
}

function ShowRulesButton(props) {
  return (
    <button
      id="rules-button"
      onClick={props.onClick}
    >RULES</button>
  );
}

function RulesModal(props) {
  const close_btn = (
    <img 
      className="close-btn" 
      src="images/icon-close.svg"
      onClick = {props.onCloseClick}
    />);
  return (
    <div id="rules-modal">
      <div id="rules-modal-header">
        <div id="rules-modal-title">RULES</div>
        {close_btn}
      </div>
      <div id="rules-modal-content">
        <img id="rules-img" src="images/image-rules-bonus.svg"/>
      </div>
      <div id="rules-modal-footer">
        {close_btn}
      </div>
    </div>
  );
}

function Scoreboard(props) {
	return (
		<div id="scoreboard">
      <img id="logo" src="images/logo-bonus.svg"/>
			<div id="score-container">
				<div id="score-label">SCORE</div>
				<div id="score-value">{props.score}</div>
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
      imgPath={`images/icon-${move.toLowerCase()}.svg`}
		/>);
	}

  renderResult() {
    let resultMessage = this.props.roundResult === 1 ? 'YOU WIN' : 
        (this.props.roundResult === 0 ? "IT'S A TIE" : 'YOU LOSE');
      return (
        <div id="result-container">
          <p id="result-message">{resultMessage}</p>
          <PlayAgainButton onClick={() => this.props.handlePlayAgainClick()}/>
        </div>
      );
  }

  renderRoundStart() {
    return (
      <div id="board-outer" className="round-start">
        <div id="board-inner">
          {this.props.moves.map(move => this.renderMove(move))}
        </div>
      </div>
    );
  }

  renderMovesPicked(showWinner=false) {
    const stepClass = showWinner ? "show-results" : "moves-picked"
    return (
        <div id="board-outer" className={stepClass}>
          <div id="player-choice" className="choice">
            <div id="player-choice-label" className="choice-label">YOU PICKED</div>
            {this.renderMove(this.props.playerMove)}
          </div>
          {showWinner ? this.renderResult() : null}
          <div id="house-choice" className="choice">
            <div id="house-choice-label" className="choice-label">THE HOUSE PICKED</div>
            {this.renderMove(this.props.houseMove)}
          </div>
        </div>
      );
  }

	render() {
		if (this.props.gameStep === 'roundStart') return this.renderRoundStart();
		if (this.props.gameStep === 'movesPicked') return this.renderMovesPicked();
		if (this.props.gameStep === 'showResult') return this.renderMovesPicked(showWinner=true);
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
    if (this.state.gameStep !== 'roundStart') return;
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
  // handleShowRulesClick() {
  //   alert("rules");
  // }

	//click anywhere to go to the next step
	handleWindowClick() {
		if (this.state.gameStep == 'movesPicked') {
			const newScore = this.state.score + this.state.roundResult;
			this.setState({
				score: newScore,
				gameStep: 'showResult',
        showRules: false
			});	
		} 
	}

	render() {
		return (
			<div id="game" onClick={this.handleWindowClick}>
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
				<ShowRulesButton onClick = {() => this.setState({showRules: !this.state.showRules})} />
        {this.state.showRules ? <RulesModal onCloseClick= {() => this.setState({showRules: false})}/> : null}
			</div>
		);
	}
}

const moves = ['Spock', 'Scissors', 'Paper', 'Lizard', 'Rock',];
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