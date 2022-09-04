import { useState, useEffect, useContext } from "react";
import { auth, database } from "../../firebase/firebaseConfig";
import { collection, where, query, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import AuthContext from "../authContext";

export default function useParentAuth() {
  const [parentAuthUser, setParentAuthUser] = useState();
  const { parent, setParent } = useContext(AuthContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (parent) => {
      setParentAuthUser(parent ?? false);
      if (parent) {
        const parentRef = collection(database, "parent");
        const q = query(parentRef, where("parent_id", "==", parent.uid));
        const docSnap = await getDocs(q);

        const parentUser = docSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setParent(parentUser[0]);
      }
    });
    return () => unsubscribe();
  }, [parent, setParent]);
  return { parent, parentAuthUser };
}
