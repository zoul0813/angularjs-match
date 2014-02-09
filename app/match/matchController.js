app.controller('matchController', function($scope, $rootScope) {
  function Card(icon) {
    this.icon = icon;
    this.selected = false;
  }
  Card.prototype.toString = function() {
    return 'glyphicon ' + (this.selected ? 'glyphicon-' + this.icon + ' selected' : '');
  }

  $scope.totalPlays = 0;

  newGame();

  function newGame() {
    var cards = [
      new Card('phone-alt'),
      new Card('floppy-remove'),
      new Card('send'),
      new Card('stats'),
      new Card('tower'),
      new Card('saved'),
  /*
      new Card('adjust'),
      new Card('map-marker'),
      new Card('share'),
      new Card('stop'),
      new Card('play'),
      new Card('question-sign'),
  */
    ];

    $scope.columnSize = 3;

    console.log('cards', cards);

    function clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }  

    var current_hand = [];
    for(x in cards) {
      current_hand.push(cards[x]);
      current_hand.push(jQuery.extend({}, cards[x]));
    }
    console.log('current hand', current_hand);

    /**
     * Randomize array element order in-place.
     * Using Fisher-Yates shuffle algorithm.
     */
    function shuffleArray(array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
        return array;
    }

    current_hand = shuffleArray(current_hand);
    console.log('shuffled', current_hand);

    $scope.cards = current_hand;

    $scope.selected = null;
    $scope.found = [];
    $scope.guesses = 0;
  }

  $scope.cardClick = function() {
    console.log('card clicked', this);
    this.card.selected = true;
    if($scope.selected == null) {
      $scope.selected = this;
      return;
    }
    $scope.guesses++;
    var isMatch = false;
    if($scope.selected.card.icon == this.card.icon) {
      console.log('match found', $scope.selected.card.icon, this.card.icon);
      isMatch = true;
      $scope.found.push($scope.selected, this);
    } else {
      console.log('no match', $scope.selected.card.icon, this.card.icon);
    }
    if(!isMatch) {
      var c = this;
      setTimeout(function() {
        $scope.$apply(function() {
          $scope.selected.card.selected = false;
          c.card.selected = false;
          $scope.selected = null;
        });
      }, 500);
    } else {
      $scope.selected = null;
    }
    
    if($scope.found.length == $scope.cards.length) {
      console.log('You are a Pokemon Master, you\'ve found them all!');
      if(confirm('You are a Pokemon Master, you\'ve found them all! Play again?')) {
        newGame();
        $scope.totalPlays++;
      }
    }
  }
});
