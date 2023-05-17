import { db } from "@/app/firebase/firebase";
import { getDoc, doc, collection, deleteDoc } from "firebase/firestore";

async function retrieveFromCode(code: string) {
  if (validateFormat(code)) {
    try {
      const docRef = doc(db, "encrypted-messages", code);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const message = docSnap.data().message as string;
        deleteDoc(doc(db, "encrypted-messages", code));
        return message;
      } else {
        return "404" as string;
      }
    } catch (error) {
      console.error(error);
      return "303" as string;
    }
  } else {
    return "101" as string;
  }
}

function validateFormat(code: string) {
  const segments = code.split("-");

  segments.forEach((segment) => {
    if (segment.length !== 5) {
      return false;
    }
  });

  if (code.length === 41 && segments.length === 7) {
    return true;
  } else {
    return false;
  }
}

export default retrieveFromCode;
