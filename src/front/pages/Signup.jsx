import { Link } from "react-router-dom";
import React, {useState} from "react";




export const Signup = () => {

    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [username, setUsername]=useState('')

    return (
        <div className="container text-center">
            <h1>SignUp</h1>
            <form>
                
                <div className="row mb-3">
                    <label htmlFor="inputEmail3" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input type="email" className="form-control" id="inputEmail3" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="inputPassword3" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-10">
                        <input type="password" className="form-control" id="inputPassword3" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                </div>
                <div className="row mb-3">
                    <label htmlFor="input_username" className="col-sm-2 col-form-label">Username</label>
                    <div className="col-sm-10">
                        <input type="text" className="form-control" id="input_username" value={email} onChange={(e)=>setUsername(e.target.value)}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Sign in</button>
            </form>

            {/* A Link component acts as an anchor tag but is used for client-side routing to prevent page reloads. */}
            <Link to="/">
                <span classNameName="btn btn-primary btn-lg" href="#" role="button">
                    Back home
                </span>
            </Link>
        </div>
    );
};
