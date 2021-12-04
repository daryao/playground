import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSmileBeam, faFrown } from '@fortawesome/free-regular-svg-icons'
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
                    </div>
                </div>
            </div>
        </div>
	);
}

function Footer({year}) {
    const [sentiment, setSentiment] = useState("positive");
    return (
        <div className="section footer">
            <div className="container">
                <div className="row">
                    <div className="column">
                        <p>Thanks for visiting!</p>
                        <div className="row">
                            <div className="one-half column"><button className="button-primary" onClick={() => setSentiment("positive")}>I am happy!</button></div>
                            <div class="one-half column"><button onClick={() => setSentiment("negative")}>No, I have issues with the site</button></div>
                        </div>
                        <br />
                        <p>Current state:&nbsp;
                            {sentiment == "positive" ? (<FontAwesomeIcon className="has-color-positive" icon={faSmileBeam} />) : (<FontAwesomeIcon className="has-color-negative" icon={faFrown} />) }
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
