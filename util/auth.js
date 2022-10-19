import axios from "axios";

const API_KEY = "AIzaSyB9AFO2apyVV8RoeTyxm1ngSPpNt5VTWcQ";

async function authenticate(mode, email, password) {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  // const token = response.data.idToken;
  const userResponse = {
    token: response.data.idToken,
    userUid: response.data.idToken,
  };

  // return token;
  return userResponse;
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}
