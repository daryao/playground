import React from 'react';
import { Link } from 'react-router-dom';
 
const NavBar = () => (
    <nav id="header" className="fixed pt-8 mb-4 z-10 top-0">
        <ul className="list-reset lg:flex justify-end flex-1 items-center">
            <li className="mr-3">
                <Link to="/">Home</Link>
            </li>
            <li className="mr-3">
                <Link to="/about">About</Link>
            </li>
            <li className="mr-3">
                <Link to="/articles-list">Articles</Link>
            </li>
        </ul>
	</nav>
);

export default NavBar;