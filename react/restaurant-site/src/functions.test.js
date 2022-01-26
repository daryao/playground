import {timesThree} from "./functions.js";

test("Multiplies by three", () => {
    expect(timesThree(5)).toBe(15);
});