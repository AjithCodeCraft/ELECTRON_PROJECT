import React from "react"
import { Outlet } from "react-router-dom"



export const Admin = () => {

    return ( <div>

        <p className="text-3xl font-bold underline">This is Admin Page</p>

        <Outlet/> 
    </div>
    );
};