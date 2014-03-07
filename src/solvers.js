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
  var solutionCount = 0;

  var solution = new Board({'n': n});

  var hasConflicts = function (arr) {
    var x = 0;
    var y = 0;
    var coordinates = {};
    for (var i = 0; i < arr.length; i++ ) {

      if(arr[i] === 1) {
        solution.togglePiece(y,x);
        coordinates[i] = [y,x];
      }

      if(i !== arr.length -1) {
        x++;
        if(x >= n) {
          x = 0;
          y++;
        }
      }
    }
    var output = solution.hasRowConflictAt(y) || solution.hasColConflictAt(x);
    for (var key in coordinates) {
      solution.togglePiece(coordinates[key][0], coordinates[key][1]);
    }
    return output;
  };

  var testSolutions = function (matrix, rooks) {
    if (hasConflicts(matrix)) {
      return;
    }else if (matrix.length === n*n) {
      if(rooks === n) {
        solutionCount++;
      }
      return;
    }
    var nilCopy = matrix.slice(0);
    nilCopy.push(0);
    var rookCopy = matrix.slice(0);
    rookCopy.push(1);

    testSolutions(nilCopy, rooks);
    testSolutions(rookCopy, rooks + 1);
  };

  testSolutions([], 0);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // debugger;
  var solution = new Board({'n': n});
  var x = 0;
  var y = 0;
  var pieces = 0;
  while(pieces < n && y >= n) {
    solution.togglePiece(y, x);
    pieces++;
    if(solution.hasRowConflictAt(y) || solution.hasColConflictAt(x) || solution.hasMajorDiagonalConflictAt(solution._getFirstRowColumnIndexForMajorDiagonalOn(x)) || solution.hasMinorDiagonalConflictAt(solution._getFirstRowColumnIndexForMinorDiagonalOn(x))) {
      solution.togglePiece(y, x);
      pieces--;
    }
    x++;
    if(x >= n) {
      x = 0;
      y++;
    }
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {

  if(n === 0) {
    return 1;
  }

  var solutionCount = 0;
  var colConf = window.createDefaultObject(0,n);
  var majDiagConf = window.createDefaultObject(-1 * (n - 1), n);
  var minDiagConf = window.createDefaultObject(0, 2 * (n-1) + 1);

  var testSolutions = function(row, colConf, majConf, minConf) {

    if(row === n - 1) {
      for(var j = 0; j < n; j++) {
        if(colConf[j] && majConf[(row) - j] && minConf[(row) + j]) {
          solutionCount++;
          return;
        }
      }
    }

    for (var i = 0; i < n; i++) {   //iterate through columns
      if (colConf[i] && majConf[row - i] && minConf[row + i]) {
        //copy and manipulate objs
        var newColConf = _.extend({}, colConf);
        delete newColConf[i];
        var newMajConf = _.extend({}, majConf);
        delete newMajConf[row - i];
        var newMinConf = _.extend({}, minConf);
        delete newMinConf[row + i];
        //is solution?
        //recurse
        testSolutions(row + 1, newColConf, newMajConf, newMinConf);
      }
    }

  };

  testSolutions(0, colConf, majDiagConf, minDiagConf);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

window.createDefaultObject = function(min,max) {
  var output = {};
  for(var i = min; i < max; i++) {
    output[i] = true;
  }
  return output;
};
















