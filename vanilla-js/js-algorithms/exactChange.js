// Following the course https://www.udemy.com/course/2019-javascript-algorithmic-scripting-advanced-level/
// Section 4: Exact Change
// Code follows the instructor example with changes for variable naming, testing, logic improvement, and comments for clarification


//ex. checkCashRegister(19.50, 20.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]);
// Account for the scenarios when the register does not have enough cash or will have no cash after the transaction

var denominations = [
    { name: 'ONE HUNDRED', val: 100.00},
    { name: 'TWENTY', val: 20.00},
    { name: 'TEN', val: 10.00},
    { name: 'FIVE', val: 5.00},
    { name: 'ONE', val: 1.00},
    { name: 'QUARTER', val: 0.25},
    { name: 'DIME', val: 0.10},
    { name: 'NICKEL', val: 0.05},
    { name: 'PENNY', val: 0.01}
];


function checkCashRegister(price, payment, cashInDrawer) {

    var change = payment - price;

    // Transform the cash in drawer array into an object
    var register = cashInDrawer.reduce(function(acc, curr) {
        // Add the money value to total
        acc.total += curr[1];
        // Use the denomination name as the accumulator key, and save the denomination value as the accumulator value
        acc[curr[0]] = curr[1];
        return acc;
    }, {total: 0}); // initial value is an object with the total of zero

    // Handle exact change - no cash left after transaction
    if (register.total === change) {
        return 'Closed';
    }

    // Handle insufficent funds
    if (register.total < change) {
        return 'Insufficient Funds';
    }

    var change_arr = denominations.reduce(function(acc, curr) {
        var value = 0;

        // While the register still has this money type
        // and the money type is larger than the change remaining
        while (register[curr.name] > 0 && change >= curr.val) {
            change -= curr.val;
            register[curr.name] -= curr.val;
            value += curr.val;

            change = Math.round(change * 100) / 100;
        }

        // if this denomination was used, add it to the output
        if (value > 0) {
            acc.push([curr.name, value]);
        }

        return acc;
    }, []);

    // if we couldn't find any change or have leftover change
    // return message "Insufficient funds"

    if (change_arr.length < 1 || change > 0) {
        return 'Insufficient Funds';
    }

    return change_arr
}

console.log(checkCashRegister(12.20, 20.00, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.10], ["QUARTER", 4.25], ["ONE", 90.00], ["FIVE", 55.00], ["TEN", 20.00], ["TWENTY", 60.00], ["ONE HUNDRED", 100.00]]));