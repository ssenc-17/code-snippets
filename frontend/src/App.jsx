import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

import './App.css'
import styles from "./styles.module.css";

import { auth } from "./firebase";
const provider = new GoogleAuthProvider();


function App() {
  const [provider, setProvider] = useState("google");

  return <>
    {
      provider === "email" ? <EmailForm /> : 
      provider === "google" ? <GoogleSSO /> : ""
    }
    <Toaster position="bottom-center" />
  </>
}

function GoogleSSO() {
  const [user, setUser] = useState(undefined);

  const signIn = async () => {
    const result = await signInWithPopup(auth, provider);
    console.log(result.user.email)
    toast.success("Logged in as: " + result.user.email)
    setUser(result.user)
  }

  return <>
    <div>{user?.email}</div>
    <button onClick={signIn}>Sign in</button>
    <button onClick={async () => {
      await signOut(auth);
      toast.success("Signed out successfully")
      setUser(undefined);
    }}>Sign out</button>
  </>
}

function EmailForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, username, password);
      toast.success("Logged in successfully");
    } catch (e) {
      if (e.code == "auth/invalid-email") {
        toast.error("Invalid email");
      } else if (e.code == "auth/invalid-credential") {
        toast.error("Invalid password");
      }
    }
  }

  return <div className="App">
    <div className={styles.container}>
      <Input value={username} onChange={setUsername} placeholder="Username..." />
      <Input value={password} onChange={setPassword} type="password" placeholder="Password..." />
      <button type="button" onClick={signIn}>Sign In</button>
    </div>
  </div>;
}

function Input({ type="text", value, onChange, ...props }) {
  return <input
    type={type}
    value={value}
    className={styles.input}
    onChange={(e) => onChange(e.target.value)}
    {...props}
  />
}

export default App;
