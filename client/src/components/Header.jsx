import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../Assets/logo.jpg';
import SearchBar from './SearchBar';

function Header() {
    return (
        <div className="flex flex-row bg-header items-center gap-8">
            <Link to="/"> 
                <img src={logo} alt="logo" className="w-64"></img>
            </Link>
            <SearchBar></SearchBar>
            <div className="w-64"></div>
        </div>
    )
}

export default Header;