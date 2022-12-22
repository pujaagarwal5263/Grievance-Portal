import React from 'react';
import { NavLink } from 'react-router-dom';

const Error=()=>{
    return(
        <>
        <p>Error 404. Page not found!</p>
        <NavLink to="/">Back to Home </NavLink>
        </>
    );
}
export default Error;