import {render} from "@testing-library/react";
import App from "./App";

test("Renders an h1 heading", () => {
    const {getByText} = render(<App />);
    const h1 = getByText(/Chicken Kitchen/); // regular expression
    expect(h1).toHaveTextContent("Chicken Kitchen");
});