import { 
    takeLatest, 
    put, 
    all, 
    call,
    CallEffect,
    PutEffect,
    ForkEffect,
    AllEffect
} from "redux-saga/effects";
import { User, UserCredential } from "firebase/auth";

import { USER_ACTION_TYPES } from "./user.types";

import { 
    signInSuccess, 
    signInFailed, 
    signUpFailed, 
    signUpSuccess,
    signOutSuccess,
    signOutFailed,
    EmailSignInStart,
    SignUpStart,
    SignUpSuccess
} from "./user.action";

import { 
    getCurrentUser, 
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
    createAuthUserWithEmailAndPassword,
    signOutUser,
    AdditionalInformation
} from "../../utils/firebase/firebase.utils";

// ===== Hybrid Saga Types =====
export type BasicSaga<YieldRT = unknown> = Generator<
    | CallEffect<unknown>
    | PutEffect<{ type: string; payload?: any }>,
    void,
    YieldRT
>;
export type AuthSaga = BasicSaga<UserCredential>;
export type GoogleSignInSaga = BasicSaga<UserCredential>;
export type CurrentUserSaga = Generator<
    CallEffect<User | null> | CallEffect<void> | PutEffect<any>,
    void, 
    User | null
>;
export type SignUpSaga = Generator<
    CallEffect<UserCredential | undefined> | PutEffect<any>,
    void,
    UserCredential | undefined
>;
export type UserSnapShotSaga = BasicSaga<UserDocumentSnapshot | void>;
export type VoidSaga = BasicSaga<void>;
export type SagaGenerator<RT = void> = Generator<
    CallEffect<RT> | PutEffect<{ type: string; payload?: any }>,
    void,
    RT
>;
export type WatcherSagaGenerator = Generator<ForkEffect<never>, void, never>;
export type RootSagaGenerator = Generator<AllEffect<CallEffect<void>>, void, never>;
// export type UserSnapShotData = { id: string; [key: string]: any };
export type UserData = { email: string; displayName: string; createdAt: Date };
export type UserDocumentSnapshot = { id: string; data: () => UserData; exists: boolean };

// ===== Sagas =====
export function* getSnapShotFromUserAuth(
    userAuth: User, 
    additionalDetails?: AdditionalInformation
): UserSnapShotSaga {
    try {
        const userSnapShot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails);
        if (userSnapShot) {
            yield put(signInSuccess({ id: userSnapShot.id, ...userSnapShot.data() }));
        }
    } catch (error) {
        yield put(signInFailed(error as Error));
    }
}

export function* signInWithGoogle(): GoogleSignInSaga {
    try {
        const { user }: UserCredential = yield call(signInWithGooglePopup);
        yield call(getSnapShotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error as Error));
    }
}

export function* signInWithEmail(
    { payload: { email, password } }: EmailSignInStart
): AuthSaga {
    try {
        const userCredential = yield call(signInAuthUserWithEmailAndPassword, email, password)
        if (userCredential) {
            const { user } = userCredential;
            yield call(getSnapShotFromUserAuth, user);    
        }
    } catch (error) {
        yield put(signInFailed(error as Error));
    }
}

export function* isUserAuthenticated(): CurrentUserSaga {
    try {

        const userAuth: User | null = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapShotFromUserAuth, userAuth);
    } catch (error) {
        yield put(signInFailed(error as Error));
    }
}

export function* signUp({ payload: { email, password, displayName } }: SignUpStart): SignUpSaga {
    try {
        const userCredential = yield call(createAuthUserWithEmailAndPassword, email, password);
        if (userCredential) {
            const { user } = userCredential;
            yield put(signUpSuccess(user, { displayName }))
        }
    } catch (error) {
        yield put(signUpFailed(error as Error));
    }
}

export function* signOut() {
    try {
        yield call(signOutUser);
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailed(error as Error));
    }
}

export function* signInAfterSignUp({ payload: { user, additionalDetails } }: SignUpSuccess) {
    yield call(getSnapShotFromUserAuth, user, additionalDetails);
}

export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onSignUpStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_START, signUp)
}

export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_UP_SUCCESS, signInAfterSignUp);
}

export function* onSignOutStart() {
    yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signOut);
}

export function* userSagas() {
    yield all([
        call(onCheckUserSession), 
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart)
    ]);
}