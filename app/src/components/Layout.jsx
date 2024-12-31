import React from "react"
import { Outlet } from "react-router-dom"



export const Layout = () => {

    return (<div>

        <p>This is our layout</p>

        <ul>

            <li><a href="/">Admin</a></li>
            <li><a href="/user">User</a></li>
        </ul>

        <Outlet />
    </div>
    );
};