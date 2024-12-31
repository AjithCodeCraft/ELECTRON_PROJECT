import React from "react"
import { Outlet } from "react-router-dom"



export const Admin = () => {

    return ( <div>

        <p>This is Admin Page</p>

        <Outlet/> 
    </div>
    );
};