var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function Move(props) {
  var outerClases = "move-outer " + props.name.toLowerCase() + "-move";
  return React.createElement(
    "div",
    {
      className: outerClases,
      onClick: props.onClick
    },
    React.createElement(
      "div",
      { className: "move-inner" },
      React.createElement("img", { className: "move-img", src: props.imgPath })
    )
  );
}

function PlayAgainButton(props) {
  return React.createElement(
    "button",
    {
      id: "play-again-btn",
      onClick: props.onClick
    },
    "PLAY AGAIN"
  );
}

function ShowRulesButton(props) {
  return React.createElement(
    "button",
    {
      id: "rules-button",
      onClick: props.onClick
    },
    "RULES"
  );
}

function RulesModal(props) {
  var close_btn = React.createElement("img", {
    className: "close-btn",
    src: "images/icon-close.svg",
    onClick: props.onCloseClick
  });
  return React.createElement(
    "div",
    { id: "rules-modal" },
    React.createElement(
      "div",
      { id: "rules-modal-header" },
      React.createElement(
        "div",
        { id: "rules-modal-title" },
        "RULES"
      ),
      close_btn
    ),
    React.createElement(
      "div",
      { id: "rules-modal-content" },
      React.createElement("img", { id: "rules-img", src: "images/image-rules-bonus.svg" })
    ),
    React.createElement(
      "div",
      { id: "rules-modal-footer" },
      close_btn
    )
  );
}

function Scoreboard(props) {
  return React.createElement(
    "div",
    { id: "scoreboard" },
    React.createElement("img", { id: "logo", src: "images/logo-bonus.svg" }),
    React.createElement(
      "div",
      { id: "score-container" },
      React.createElement(
        "div",
        { id: "score-label" },
        "SCORE"
      ),
      React.createElement(
        "div",
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
        },
        imgPath: "images/icon-" + move.toLowerCase() + ".svg"
      });
    }
  }, {
    key: "renderResult",
    value: function renderResult() {
      var _this3 = this;

      var resultMessage = this.props.roundResult === 1 ? 'YOU WIN' : this.props.roundResult === 0 ? "IT'S A TIE" : 'YOU LOSE';
      return React.createElement(
        "div",
        { id: "result-container" },
        React.createElement(
          "p",
          { id: "result-message" },
          resultMessage
        ),
        React.createElement(PlayAgainButton, { onClick: function onClick() {
            return _this3.props.handlePlayAgainClick();
          } })
      );
    }
  }, {
    key: "renderRoundStart",
    value: function renderRoundStart() {
      var _this4 = this;

      return React.createElement(
        "div",
        { id: "board-outer", className: "round-start" },
        React.createElement(
          "div",
          { id: "board-inner" },
          this.props.moves.map(function (move) {
            return _this4.renderMove(move);
          })
        )
      );
    }
  }, {
    key: "renderMovesPicked",
    value: function renderMovesPicked() {
      var showWinner = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var stepClass = showWinner ? "show-results" : "moves-picked";
      return React.createElement(
        "div",
        { id: "board-outer", className: stepClass },
        React.createElement(
          "div",
          { id: "player-choice", className: "choice" },
          React.createElement(
            "div",
            { id: "player-choice-label", className: "choice-label" },
            "YOU PICKED"
          ),
          this.renderMove(this.props.playerMove)
        ),
        showWinner ? this.renderResult() : null,
        React.createElement(
          "div",
          { id: "house-choice", className: "choice" },
          React.createElement(
            "div",
            { id: "house-choice-label", className: "choice-label" },
            "THE HOUSE PICKED"
          ),
          this.renderMove(this.props.houseMove)
        )
      );
    }
  }, {
    key: "render",
    value: function render() {
      if (this.props.gameStep === 'roundStart') return this.renderRoundStart();
      if (this.props.gameStep === 'movesPicked') return this.renderMovesPicked();
      if (this.props.gameStep === 'showResult') return this.renderMovesPicked(showWinner = true);
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
      if (this.state.gameStep !== 'roundStart') return;
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
    // handleShowRulesClick() {
    //   alert("rules");
    // }

    //click anywhere to go to the next step

  }, {
    key: "handleWindowClick",
    value: function handleWindowClick() {
      if (this.state.gameStep == 'movesPicked') {
        var newScore = this.state.score + this.state.roundResult;
        this.setState({
          score: newScore,
          gameStep: 'showResult',
          showRules: false
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this6 = this;

      return React.createElement(
        "div",
        { id: "game", onClick: this.handleWindowClick },
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
        React.createElement(ShowRulesButton, { onClick: function onClick() {
            return _this6.setState({ showRules: !_this6.state.showRules });
          } }),
        this.state.showRules ? React.createElement(RulesModal, { onCloseClick: function onCloseClick() {
            return _this6.setState({ showRules: false });
          } }) : null
      );
    }
  }]);

  return Game;
}(React.Component);

var moves = ['Spock', 'Scissors', 'Paper', 'Lizard', 'Rock'];
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