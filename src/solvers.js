/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


// hasRowConflictAt
// hasAnyRowConflicts
// hasColConflictAt
// hasAnyColConflicts
// hasMajorDiagonalConflictAt
// hasAnyMajorDiagonalConflicts
// hasMinorDiagonalConflictAt
// hasAnyMinorDiagonalConflicts

window.findNRooksSolution = function(n) {
  var solution = new Board({'n': n});
  var x = 0;
  var y = 0;
  var pieces = 0;
  while(pieces < n) {
    solution.togglePiece(y, x);
    pieces++;
    if(solution.hasRowConflictAt(y) || solution.hasColConflictAt(x)) {
      solution.togglePiece(y, x);
      pieces--;
    }
    x++;
    if(x >= n) {
      x = 0;
      y++;
    }
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = {};
  var solution = new Board({'n': n});

debugger;

  var testSolutions = function (matrix, x, y, rooks) {
    var board = new Board(matrix);

// debugger;
    var trueCopy = _.map(board.rows(), function(row) {
      return row.slice();
    });

    board.togglePiece(y,x);
    var continueTest = true;

    if(board.hasRowConflictAt(y) || board.hasColConflictAt(x)) {
      continueTest = false;
    }else if (rooks + 1 === n) {
      var boardKey = _.flatten(board.rows()).join("");
      solutionCount[boardKey] = board.rows();
      continueTest = false;
    }

    x++;
    if(x >= n) {
      x = 0;
      y++;
    }

    if(y < n) {
      if(continueTest) {
        var modCopy = _.map(board.rows(), function(row) {
          return row.slice();
        });
        testSolutions(modCopy, x, y, rooks + 1);
      }
      testSolutions(trueCopy, x, y, rooks);
    }
  };

  testSolutions(solution.rows(), 0, 0, 0);
  console.log('Number of solutions for ' + n + ' rooks:', Object.keys(solutionCount).length);
  return Object.keys(solutionCount).length;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
