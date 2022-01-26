import {useLocation, Outlet} from "react-router-dom";

export function About() {
    return (
        <div>
            <h1>About</h1>
            <Outlet />
        </div>
    );
}

export function Events() {
    return (
        <div>
            <h1>Events</h1>
        </div>
    );
}

export function Contact() {
    return (
        <div>
            <h1>Contact</h1>
        </div>
    );
}

export function Error404() {
    let location = useLocation();

    return (
        <div>
            <h1>Sorry, this page does not exist.</h1>
            <p>Resouce not found at {location.pathname}</p>
        </div>
    );
}

export function Services() {
    return (
        <div>
            <h2>Our Services</h2>
        </div>
    );
}

export function Employees() {
    return (
        <div>
            <h2>Our Employees</h2>
        </div>
    );
}

export function Location() {
    return (
        <div>
            <h2>Our Location</h2>
        </div>
    );
}