// Following the course https://www.udemy.com/course/2019-javascript-algorithmic-scripting-advanced-level/
// Section 3: Symmetric Difference (disjunctive union)
// Code follows the instructor example with changes for variable naming, testing, logic improvement, and comments for clarification


//ex. the symmetric difference of the sets {1,2,3} and {3,4} is {1,2,4}
//i.e. the set of elements which are in either of the sets, but not in their intersection
// sym(A,B,C) = A union B union C - A intersect B - A intersect C - B intersect C


// Version 1
function sym() {

    // Combine the given arrays into one set
    // Essentailly, the union of the sets
    var set = [];
    for (var i = 0; i < arguments.length; i++) {
        set.push(arguments[i]);
    }

    // Recucer callback function where arr1 is the accumulator and arr2 is the currentValue
    function symDiff(arr1, arr2) {
        var result = [];

        // Get the intersection of the sets
        // Loop through arr1 and if the item is not in arr2 or the result, add it to the result
        // Simiarly, repeat for arr2

        arr1.forEach(function(item) {
            if (arr2.indexOf(item) < 0 && result.indexOf(item) < 0) {
                result.push(item);
            }
        });

        arr2.forEach(function(item) {
            if (arr1.indexOf(item) < 0 && result.indexOf(item) < 0) {
                result.push(item);
            }
        });

        return result;
    }

    // Reduce the given arrays to one, using the symDiff function
    return set.reduce(symDiff);
}

// Test, expected value is [1,2,6]
console.log(sym([1,2,3], [2,3,5], [2,5,6]));




// Version 2 

function sym2 () {

    // Convert the arguments Object into a proper array
    // i.e. add each item of arguments to a new empty array from start to end
    var set = Array.prototype.slice.call(arguments);

    // Get the sym diff of two arrays
    var symDiffTwoArrays = function(arr1, arr2) {
        // Find items in arr1 that do not exist in arr2 
        function filterItems(arr1,arr2) {
            return arr1.filter(function(item) {
                return arr2.indexOf(item) < 0;
            });
        }

        // Run symDiffTwoArrays on each of the 2 arrays against the other and combine
        return filterItems(arr1,arr2).concat(filterItems(arr2,arr1));
    }
    
    // Reduce all arguments by finding the symDiffTwoArrays between all the arrays starting with an empty array
    var symArray = set.reduce(symDiffTwoArrays, []);
    
    // Get all the unique values
    var finalResult = symArray.filter(function(value, index, self) {
        // If the first found index value of current item value is the same as the current index
        // it is not a duplicate value so it pass the uniqueness test
        return self.indexOf(value) === index;
    });

    return finalResult;
}

console.log(sym2([1,2,5], [2,3,5], [3,4,5]));
console.log(sym2([1,2,3], [6,2,1,9]));
