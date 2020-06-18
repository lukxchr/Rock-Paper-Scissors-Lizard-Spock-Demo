var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Move(props) {
	return React.createElement(
		"button",
		{
			className: "move",
			onClick: props.onClick
		},
		props.name
	);
}

function PlayAgainButton(props) {
	return React.createElement(
		"button",
		{
			id: "play-again-btn",
			onClick: props.onClick
		},
		"Play Again"
	);
}

function ShowRulesButton(props) {
	return React.createElement(
		"button",
		{
			id: "rules-button",
			onClick: function onClick() {
				return alert('rules!');
			}
		},
		"Rules"
	);
}

function RulesModal(props) {
	return React.createElement(
		"div",
		null,
		"Rulesboard"
	);
}

function Scoreboard(props) {
	return React.createElement(
		"div",
		{ id: "scoreboard" },
		React.createElement(
			"div",
			{ id: "scoreboard-title" },
			"Rock",
			React.createElement("br", null),
			"Paper",
			React.createElement("br", null),
			"Scissors"
		),
		React.createElement(
			"div",
			{ id: "score" },
			React.createElement(
				"span",
				{ id: "score-label" },
				"Score: "
			),
			React.createElement(
				"span",
				{ id: "score-value" },
				props.score
			)
		)
	);
}

var Board = function (_React$Component) {
	_inherits(Board, _React$Component);

	function Board() {
		_classCallCheck(this, Board);

		return _possibleConstructorReturn(this, (Board.__proto__ || Object.getPrototypeOf(Board)).apply(this, arguments));
	}

	_createClass(Board, [{
		key: "renderMove",
		value: function renderMove(move) {
			var _this2 = this;

			return React.createElement(Move, {
				name: move,
				key: move,
				onClick: function onClick() {
					return _this2.props.handleMoveClick(move);
				}
			});
		}
	}, {
		key: "renderMovesPickedStep",
		value: function renderMovesPickedStep() {
			return React.createElement(
				"div",
				null,
				React.createElement(
					"p",
					null,
					"You picked ",
					this.renderMove(this.props.playerMove)
				),
				React.createElement(
					"p",
					null,
					"The house picked ",
					this.renderMove(this.props.houseMove)
				)
			);
		}
	}, {
		key: "renderShowResultsStep",
		value: function renderShowResultsStep() {
			var _this3 = this;

			var resultMessage = this.props.roundResult === 1 ? 'You win' : this.props.roundResult === 0 ? "It's a tie" : 'You lose';
			return React.createElement(
				"div",
				null,
				React.createElement(
					"p",
					null,
					"You picked ",
					this.props.playerMove
				),
				React.createElement(
					"p",
					null,
					"The house picked ",
					this.props.houseMove
				),
				React.createElement(
					"p",
					null,
					resultMessage
				),
				React.createElement(PlayAgainButton, { onClick: function onClick() {
						return _this3.props.handlePlayAgainClick();
					} })
			);
		}
	}, {
		key: "render",
		value: function render() {
			var _this4 = this;

			if (this.props.gameStep === 'roundStart') return this.props.moves.map(function (move) {
				return _this4.renderMove(move);
			});
			if (this.props.gameStep === 'movesPicked') return this.renderMovesPickedStep();
			if (this.props.gameStep === 'showResult') return this.renderShowResultsStep();
			return "Invalid game step.";
		}
	}]);

	return Board;
}(React.Component);

var Game = function (_React$Component2) {
	_inherits(Game, _React$Component2);

	function Game(props) {
		_classCallCheck(this, Game);

		var _this5 = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, props));

		_this5.state = {
			score: 0,
			gameStep: 'roundStart'
		};
		_this5.handleWindowClick = _this5.handleWindowClick.bind(_this5);
		_this5.handlePlayAgainClick = _this5.handlePlayAgainClick.bind(_this5);
		return _this5;
	}

	_createClass(Game, [{
		key: "handleMoveClick",
		value: function handleMoveClick(move) {
			//choose randomly 
			var houseMove = this.props.moves[Math.floor(Math.random() * this.props.moves.length)];
			//-1=you lose, 0=draw, 1=you win
			var roundResult = move === houseMove ? 0 : this.props.rules[move].includes(houseMove) ? 1 : -1;
			this.setState({
				playerMove: move,
				houseMove: houseMove,
				roundResult: roundResult,
				gameStep: 'movesPicked'
			});
		}
	}, {
		key: "handlePlayAgainClick",
		value: function handlePlayAgainClick() {
			this.setState({ gameStep: 'roundStart' });
		}
		//global listener (e.g. click anywhere to go to the next step)

	}, {
		key: "handleWindowClick",
		value: function handleWindowClick() {
			if (this.state.gameStep == 'movesPicked') {
				var newScore = this.state.score + this.state.roundResult;
				this.setState({
					score: newScore,
					gameStep: 'showResult'
				});
			}
		}
	}, {
		key: "render",
		value: function render() {
			var _this6 = this;

			return React.createElement(
				"div",
				{ onClick: this.handleWindowClick },
				React.createElement(Scoreboard, {
					score: this.state.score
				}),
				React.createElement(Board, {
					moves: this.props.moves,
					handleMoveClick: function handleMoveClick(move) {
						return _this6.handleMoveClick(move);
					},
					handlePlayAgainClick: function handlePlayAgainClick() {
						return _this6.handlePlayAgainClick();
					},
					gameStep: this.state.gameStep,
					playerMove: this.state.playerMove,
					houseMove: this.state.houseMove,
					roundResult: this.state.roundResult
				}),
				React.createElement(ShowRulesButton, null)
			);
		}
	}]);

	return Game;
}(React.Component);

var moves = ['Rock', 'Paper', 'Scissors', 'Lizard', 'Spock'];
//rules[x]=[a,b,c] means x beats a, b and c
var rules = {
	'Rock': ['Lizard', 'Scissors'],
	'Paper': ['Rock', 'Spock'],
	'Scissors': ['Paper', 'Lizard'],
	'Lizard': ['Spock', 'Paper'],
	'Spock': ['Scissors', 'Rock']
};

ReactDOM.render(React.createElement(Game, {
	moves: moves,
	rules: rules
}), document.getElementById('root'));

// (
//    	<React.Fragment>
//    	<h1>Hello, world!</h1>
//    	<h2>it's react</h2>
//    	</React.Fragment>
//    )