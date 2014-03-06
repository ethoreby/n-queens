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



  var testSolutions = function (matrix, x, y, rooks) {
    // debugger;
    var board = new Board(matrix);
    if (y < n && x < n && (board.hasRowConflictAt(y) || board.hasColConflictAt(x))) {
      return;
    } else if (rooks === n) {
      // solutionCount++;
      var boardKey = _.flatten(board.rows()).join("");
      solutionCount[boardKey] = board.rows();
      return;
    } else if (y >= n) {
      return;
    }

    var trueCopy = _.map(board.rows(), function(row) {
      return row.slice();
    });
    board.togglePiece(y,x);
    var modCopy = _.map(board.rows(), function(row) {
      return row.slice();
    });
    x++;
    if(x >= n) {
      x = 0;
      y++;
    }
    testSolutions(modCopy, x, y, rooks + 1);
    testSolutions(trueCopy, x, y, rooks);
  };
  testSolutions(solution.rows(), 0, 0, 0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  console.dir(solutionCount);
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
