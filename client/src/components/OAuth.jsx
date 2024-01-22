import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import { useDispatch } from 'react-redux';
import { signInStart } from '../redux/user/userSlice';

const OAuth = () => {
    const dispatch = useDispatch()
    const handleGoogleClicked = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)
            const result = await signInWithPopup(auth, provider);
            const res = await fetch("/api/auth/google", {
                method: "POST",
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
            dispatch(signInStart(data))
            console.log(data)
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