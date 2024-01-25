import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInStart, signInSuccess, signInFailed } from '../redux/user/userSlice';
import { useSelector, useDispatch } from 'react-redux'
import OAuth from './../components/OAuth';
const SignIn = () => {
    const navigate = useNavigate();
    const { loading, error } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    })
    // const [error, setError] = useState(false)
    // const [loading, setLoading] = useState(false)

    const handleChange = (e) => {
        const id = e.target.id;
        const value = e.target.value
        setFormData({ ...formData, [id]: value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // setLoading(true)
            dispatch(signInStart())
            const res = await fetch('/api/auth/signin', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            // setLoading(false)

            if (data.success === false) {
                // setError(true);
                dispatch(signInFailed(data))
                return;
            }
            dispatch(signInSuccess(data))
            navigate('/')
        }

        catch (error) {
            // setLoading(false);
            // setError(true)
            dispatch(signInFailed(error))
        }


    }

    return (
        <div className=' p-3 max-w-lg mx-auto'>
            <h1 className=' text-3xl text-center font-semibold my-7'>Sign In</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

                <input
                    type='email'
                    placeholder='Email'
                    id='email'
                    onChange={handleChange}
                    className=' bg-slate-100 p-3 rounded-lg shadow-lg' />
                <input
                    type='password'
                    placeholder='Password'
                    id='password'
                    onChange={handleChange}
                    className=' bg-slate-100 p-3 rounded-lg shadow-lg' />
                <button disabled={loading}
                    className='bg-slate-700 p-3 text-white 
                rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
                >{loading ? 'Loading...' : 'Sign in'}
                </button>
                <OAuth />
            </form>
            <div className='flex items-center gap-2 justify-center mt-5 '>
                <p>Dont have an account?</p>
                <Link to="/sign-up">
                    <span className=' text-blue-500 '>Sign up</span>
                </Link>
            </div>
            <p className=' text-red-700 mt-5'>{error ? error.message || 'Something went wrong!' : ''}</p>
        </div>
    )
}

export default SignIn