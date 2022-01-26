import React, { useState, useEffect, useReducer } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmileBeam, faDizzy, faFrown, faHandPeace } from '@fortawesome/free-regular-svg-icons'
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import {
    About,
    Events,
    Contact,
    Error404,
    Services,
    Employees,
    Location
} from "./pages";
import storefront from './assets/storefront_illustration.png'

// specials
const [,friday,,sunday] = ["sushi", "ribs", "chicken", "chicken"];

function PromoCodes() {
    return <p>Current promo codes</p>
}

function Header({name}) {
	return (
        <div className="section">
            <div className="container">
                <div className="row">
                    <div className="column"></div>
                        <header>
                            <h1>{name}</h1>
                        </header>
                    </div>
            </div>
        </div>
	);
}

function Main({menu}) {
    const [checked, toggle] = useReducer(
        (checked) => !checked,
        false
    );

	return (
        <div className="section">
            <div className="container">
                <div className="row">
                    <div className="column">
                        <img className="storefront" src={storefront} alt="Illustration of a restaurant storefront" />
                        <p>Serving the most delicious fried chicken and more!</p>
                        <ol>
                            {menu.map((item) => (
                                <li key={item.id}>{item.title}</li>
                            ))}
                        </ol>
                        <input type="checkbox" 
                        value={checked} 
                        onChange={toggle}/>&nbsp;&nbsp;
                        <span>{checked ? "Yes, you checked the checkbox" : "Want to check the checkbox?"}</span>
                    </div>
                </div>
            </div>
        </div>
	);
}

function Footer({year}) {
    const [sentiment, setSentiment] = useState("positive");
    const [secondary, setSecondary] = useState("confused");

    return (
        <div className="section footer">
            <div className="container">
                <div className="row">
                    <div className="column">
                        <p>Thanks for visiting!</p>
                        <div className="row">
                            <div className="one-third column"><button className="button-primary" onClick={() => {setSentiment("positive");setSecondary("fine");}}>I am happy!</button></div>
                            <div className="one-third column"><button onClick={() => {setSentiment("negative"); setSecondary("fine");}}>No, I have issues with the site</button></div>
                            <div className="one-third column"><button onClick={() =>  {setSentiment("negative"); setSecondary("confused");}}>I don't know, I am confused</button></div>
                        </div>
                        <br />
                        <p>Current state:&nbsp;
                            {sentiment === "positive" ? (<FontAwesomeIcon className="has-color-positive" icon={faSmileBeam} />) : (<FontAwesomeIcon className="has-color-negative" icon={faFrown} />) }&nbsp;&nbsp;
                            {secondary === "confused" ? (<FontAwesomeIcon className="has-color-negative" icon={faDizzy} />) : (<FontAwesomeIcon className="has-color-positive" icon={faHandPeace} />) }
                        </p>
                        <div className="copy">Copyright © {year}</div>
                        <br />
                    </div>
                </div>
            </div>
        </div>
    );
}

function FooterExtra({login}) {
    const [devData, setDevdata] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if(!login) return;
        setLoading(true);
        fetch(`https://api.github.com/users/${login.login}`)
        .then((response) => response.json())
        .then(setDevdata)
        .then(() => setLoading(false))
        .catch(setError);
    }, [login]);

    if(loading) return <p>Loading...</p>;
    if(error) return <pre>{JSON.stringify(error.null,2)}</pre>;

    if(devData) {
        return (
            <div className="section footer">
                <div className="container">
                    <div className="row">
                        <div className="column">
                            <hr></hr>
                            <div>
                                <h4>Our web developer:</h4>
                                <p>GitHub username: {devData.login}</p>
                                <img src={devData.avatar_url} alt="Developer's GitHub avatar" />
                                <p>{devData.location}</p>
                            </div>
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return null;
    }
}

const menu = [
    "Caprese salad",
    "Garden salad",
    "Fried chicken",
    "BBQ Ribs",
    "Steak and sushi"
]

const menuObjects = menu.map((item, i) => ({id: i, title : item}))

function MainContent(login) {
    return (
        <div className="App">
            <Header name="Chicken Kitchen" />
            <Nav />
            <Main menu={menuObjects} />
            <Footer year={new Date().getFullYear()} />
            <FooterExtra login={login} />
        </div>
      );
}

function AuthContent(login) {
    return (
        <div className="App">
            <Header name="Chicken Kitchen" />
            <Nav />
            <Main menu={menuObjects} />
            <Footer year={new Date().getFullYear()}/>
            <FooterExtra login={login} />
            <PromoCodes />
        </div>
      );
}

function Nav() {
    return (
        <div className="section">
            <div className="container">
                <nav className="navbar">
                    <ul className="navbar-list">
                        <li className="navbar-item">
                            <Link className="navbar-link" to="about">About</Link>
                        </li>
                        <li className="navbar-item">
                            <Link className="navbar-link" to="events">Events</Link>
                        </li>
                        <li className="navbar-item">
                            <Link className="navbar-link" to="contact">Contact</Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
}

function App(props) {
    return (
        <>
            <Routes>
                <Route path="/" element={props.authorized ? <AuthContent login={props.login}/> : <MainContent login={props.login}/>} />
                <Route path="/about" element={<About />} >
                    <Route path="services" element={<Services />} />
                    <Route path="employees" element={<Employees />} />
                    <Route path="location" element={<Location />} />
                </Route>
                <Route path="/events" element={<Events />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </>
    );
}

export default App;
