const { createUserWithEmailAndPassword, signInWithEmailAndPassword } = require("firebase/auth");
const {auth} = require('../firebase-config')


const useAuth = () => {

    createUserWithEmailAndPassword(auth, email, password);

    signInWithEmailAndPassword(auth, email, password);

}

function AuthProvider ({children}) {

    const user = {
        login: true,
    };
}

module.exports = {
    useAuth,
    AuthProvider
}