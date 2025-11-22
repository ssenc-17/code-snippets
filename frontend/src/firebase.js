import { getAuth } from "firebase/auth";

import { initializeApp } from "firebase/app";
import firebaseConfig from "../firebaseConfig";

const app = initializeApp(firebaseConfig);
const auth = await getAuth(app);

export default app;
export { auth };
