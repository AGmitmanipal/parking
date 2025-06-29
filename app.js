// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA1ztW1hSI5NhJ3LtVE4JcrelAJvvQnHI4",
  authDomain: "users-parking.firebaseapp.com",
  projectId: "users-parking",
  storageBucket: "users-parking.firebasestorage.app",
  messagingSenderId: "1092103778752",
  appId: "1:1092103778752:web:0ff9693f402c6f6d73d825",
  measurementId: "G-WR7EP6ZREW"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore(); // ✅ initialize Firestore correctly

// Sign Up
function signUp() {
  const username = document.getElementById('signup-username').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const confirm = document.getElementById('signup-confirm').value;

  if (password !== confirm) {
    alert("Passwords do not match");
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;

      // ✅ Save user info in Firestore
      return db.collection("users").doc(user.uid).set({
        username: username,
        email: email,
        created_at: new Date()
      });
    })
    .then(() => {
      console.log("User data saved to Firestore");
      alert("Sign-up successful!");
    })
    .catch((error) => {
      alert(error.message);
    });


    auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // Save user data in Firestore
      return db.collection("users").doc(user.uid).set({
        email: user.email,
        username: username,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    })
    .then(() => {
      // Redirect to parking page
      window.location.href = "https://agmitmanipal.github.io/parking_users/";
    })
    .catch((error) => {
      alert(error.message);
    });


}

  
// Log In
function logIn() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      console.log("Logged in:", userCredential.user);
      alert("Login successful!");
    })
    .then(() => {
        // Redirect to parking page
        window.location.href = "https://agmitmanipal.github.io/parking_users/";
})
    .catch((error) => {
      alert(error.message);
    });

    auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "https://agmitmanipal.github.io/parking_users/";
    })
    .catch((error) => {
      alert(error.message);
    });
}

// Google Login
function googleLogin() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;

      // Optional: save user to Firestore if new
      const userRef = db.collection("users").doc(user.uid);
      userRef.get().then((docSnapshot) => {
        if (!docSnapshot.exists) {
          userRef.set({
            username: user.displayName || "Google User",
            email: user.email,
            created_at: new Date()
          });
        }
      });

      console.log("Google Sign-in successful:", user);
      alert("Logged in with Google!");
    })
    .catch((error) => {
      alert(error.message);
    });
}
