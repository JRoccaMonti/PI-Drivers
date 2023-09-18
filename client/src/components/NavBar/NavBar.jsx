import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        <div>
            <div>
                <NavLink to='/home'>
                    <button>home</button>
                </NavLink>
                <NavLink to='/'>
                    <button>landing</button>
                </NavLink>
                <NavLink to='/register'>
                    <button>registro</button>
                </NavLink>
            </div>
        </div>
    );
}

export default Nav;