import { 
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        console.log('user object: ', user);
        const userDocRef = await createUserDocumentFromAuth(user);
    }

    return (
        <div>
            <h1>Sign In page</h1>
            <button onClick={logGoogleUser} >
                Sign In with Google Popup
            </button>
            <SignUpForm />
        </div>
    );
};

export default SignIn;