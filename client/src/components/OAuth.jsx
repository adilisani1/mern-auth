import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const handleGoogleClicked = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider);
            const res = await fetch("/api/auth/google", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                })
            });
            const data = await res.json();
            dispatch(signInSuccess(data))
            navigate('/')
        } catch (error) {
            console.log('could not login with google')
        }
    }
    return (
        <button
            type='button'
            onClick={handleGoogleClicked}
            className=' bg-red-700 p-3 text-white 
                rounded-lg uppercase hover:opacity-95 '>
            Continue with Google
        </button>
    )
}

export default OAuth