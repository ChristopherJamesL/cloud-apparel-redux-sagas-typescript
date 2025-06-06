import { useState, FormEvent, ChangeEvent } from "react";
import { useDispatch } from "react-redux";

import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';

import { SignInContainer, ButtonContainer } from './sign-in-form.styles'
import { googleSignInStart, emailSignInStart } from "../../store/user/user.action";

const defaultFormFields = {
    email: '',
    password: '',
}


const SignInForm = () => {
    const [ formFields, setFormFields ] = useState(defaultFormFields);
    const { email, password } = formFields;

    const dispatch = useDispatch();
    
    const signInWithGoogle = async () => {
        dispatch(googleSignInStart());
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            dispatch(emailSignInStart(email, password));
            setFormFields(defaultFormFields);
        } catch (error) {
            switch((error as { code: string }).code) {
                case 'auth/invalid-credential':
                    alert('incorrect email or password');
                    break;
                case 'auth/user-not-found':
                    alert('no user associated with this emal');
                    break;
                default:
                    console.log(error);
            }
        };
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    return (
        <SignInContainer >
            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit} >
                <FormInput
                    label="Email" 
                    type="email" 
                    required 
                    onChange={handleChange}
                    name="email" 
                    value={email} 
                />

                <FormInput
                    label="Password"
                    type="password"
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password} 
                />

                <ButtonContainer >
                    <Button type="submit" >Sign In</Button>
                    <Button 
                        type='button' 
                        buttonType={BUTTON_TYPE_CLASSES.google} 
                        onClick={signInWithGoogle} 
                    >
                        GOOGLE SIGN IN
                    </Button>
                </ButtonContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;