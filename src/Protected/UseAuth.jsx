import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  clearUserData,
  selectUserData,
  setUserData,
  setPhoneUser,
} from "../redux/slice";
import { doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase/config";
const UseAuth = () => {
  const userData = useSelector(selectUserData);
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userId = user.uid;
        const userRef = doc(db, "users", userId);
        if (userRef) {
          setLoggedIn(true);
          setLoading(false);
          dispatch(setPhoneUser(user));
        } else {
          setLoggedIn(false);
        }

        const unsubscribeFirestore = onSnapshot(userRef, (doc) => {
          if (doc.exists()) {
            dispatch(setUserData(doc.data()));
            setLoading(false);
          } else {
            console.log("User document does not exist");
            setLoggedIn(false);
          }
        });

        return () => unsubscribeFirestore();
      } else {
        dispatch(clearUserData());
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return { loggedIn, loading, userData };
};

export default UseAuth;
