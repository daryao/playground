import './App.css';
import storefront from './assets/storefront_illustration.png'

function PromoCodes() {
    return <p>Current promo codes</p>
}

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
                        <p>Serving the most delicious fried chicken and more!</p>
                        <ol>
                            {props.menu.map((item) => (
                                <li key={item.id}>{item.title}</li>
                            ))}
                        </ol>
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

const menu = [
    "Caprese salad",
    "Garden salad",
    "Fried chicken",
    "BBQ Ribs",
    "Steak and sushi"
]

const menuObjects = menu.map((item, i) => ({id: i, title : item}))

function MainContent(props) {
    return (
        <div className="App">
            <Header name="Chicken Kitchen" />
            <Main menu={menuObjects} />
            <Footer year={new Date().getFullYear()} />
        </div>
      );
}

function AuthContent(props) {
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
            {props.authorized ? <AuthContent props={props} /> : <MainContent props={props} />}
        </>
    );
}

export default App;
