import React from "react"
import { Outlet } from "react-router-dom"



export const Layout = () => {

    return ( <div>

        <p>This is our layout</p>

        <Outlet/>
    </div>
    );
};