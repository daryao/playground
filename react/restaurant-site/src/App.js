import './App.css';
import storefront from './assets/storefront_illustration.png'

function Header(props) {
	return (
        <div className="section">
            <div className="container">
                <div className="row">
                    <div className="column"></div>
                        <header>
                            <h1>{props.name}</h1>
                        </header>
                    </div>
            </div>
        </div>
	);
}

function Main(props) {
	return (
        <div className="section">
            <div className="container">
                <div className="row">
                    <div className="column">
                        <img className="storefront" src={storefront} alt="Illustration of a restaurant storefront" />
                        <p>Serving the most delicious fried chicken!</p>
                    </div>
                </div>
            </div>
        </div>
	);
}

function Footer(props) {
    return (
        <div className="section footer">
            <div className="container">
                <div className="row">
                    <div className="column">
                        <p>Thanks for visiting!</p>
                        <div className="copy">Copyright © {props.year}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function App() {
  return (
    <div className="App">
        <Header name="Chicken Kitchen" />
        <Main />
        <Footer year={new Date().getFullYear()} />
    </div>
  );
}

export default App;
