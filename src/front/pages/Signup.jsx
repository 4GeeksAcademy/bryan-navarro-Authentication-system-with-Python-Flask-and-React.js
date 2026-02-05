import { Link } from "react-router-dom";
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";



export const Signup = () => {
    const navigate=useNavigate()

    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const [username, setUsername]=useState('')

    const handleSubmit = async (e) =>{
        e.preventDefault()

        try {
            const backendURL = import.meta.env.VITE_BACKEND_URL;
            const response = await fetch(`${backendURL}api/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email, password, username})
            })
            if (!response.ok){
                const err = await response.json()
                alert(err.message || 'signup failed')
                return
            }
            alert('SignUp successful, Please Login')
            navigate('/')
        } catch (error) {
            console.error('signup error:', error);
            alert('SignUp Failed!')
        }
    }

    return (
        <div className="container text-center">
            <h1>SignUp</h1>
            <form onSubmit={handleSubmit}>
                
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
                        <input type="text" className="form-control" id="input_username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
            </form>

            {/* A Link component acts as an anchor tag but is used for client-side routing to prevent page reloads. */}
            <Link to="/">
                <span className="btn btn-primary btn-lg mt-1" href="#" role="button">
                    Back home
                </span>
            </Link>
        </div>
    );
};
