const API_KEY = "AIzaSyC7Wqv6r9S1Le-fn-o-Zi2Yu3H3ZIxyXXU";

export const firebaseLoginURL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
export const firebaseSignupURL = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`;
export const updateProfileURL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;

export const getUserDataURL = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`;

export const emailVerificationMail = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`;

export const resetPasswordEmail = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API_KEY}`;

