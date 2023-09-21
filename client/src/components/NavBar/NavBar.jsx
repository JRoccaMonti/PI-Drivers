import React, { useEffect } from 'react';
import { getTeams, getDrivers } from '../../Redux/actions';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

function Nav() {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTeams());
        dispatch(getDrivers());     
    }, []);

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