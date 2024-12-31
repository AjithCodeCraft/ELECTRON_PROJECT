import React from "react"
import { Outlet } from "react-router-dom"



export const User = () => {

    return (<div>

        <h1>Welcome User</h1>

        <h2>Register Here</h2>

        <form action="submit" style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems:"center" }}>


            <div>

            <input type="text" name="username" id="username"  placeholder="Enter your username" required/>
            </div>
            
            <div>
                <input type="password" name="password" id = "password" placeholder="Enter your Password" required />

                </div>  
            <div> 
                <button>Submit</button>
            </div>
                
        </form>

        <Outlet />
    </div>
    );
};