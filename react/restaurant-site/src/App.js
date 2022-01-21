import React, { useState, useEffect, useReducer } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmileBeam, faDizzy, faFrown, faHandPeace } from '@fortawesome/free-regular-svg-icons'
import './App.css';
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

    // useEffect(() => {
    //     console.log(`sentiment set to ${sentiment}`);
    // }, [sentiment]);

    // useEffect(() => {
    //     console.log(`secondary emotion shows ${secondary}`);
    // }, [secondary]);

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
                    </div>
                </div>
            </div>
        </div>
    );
}

const menu = [
    "Caprese salad",
    "Garden salad",
    "Fried chicken",
    "BBQ Ribs",
    "Steak and sushi"
]

const menuObjects = menu.map((item, i) => ({id: i, title : item}))

function MainContent() {
    return (
        <div className="App">
            <Header name="Chicken Kitchen" />
            <Main menu={menuObjects} />
            <Footer year={new Date().getFullYear()} />
        </div>
      );
}

function AuthContent() {
    return (
        <div className="App">
            <Header name="Chicken Kitchen" />
            <Main menu={menuObjects} />
            <Footer year={new Date().getFullYear()} />
            <PromoCodes />
        </div>
      );
}

function App(props) {
    return (
        <>
            {props.authorized ? <AuthContent /> : <MainContent />}
        </>
    );
}

export default App;
