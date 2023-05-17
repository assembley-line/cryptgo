import { db } from "../app/firebase/firebase";
import { collection, setDoc, doc } from "firebase/firestore";

async function addNewEncryptedMessage(slug: string, encryptedMessage: string) {
  await setDoc(doc(db, "encrypted-messages", slug), {
    message: encryptedMessage,
  });
  return slug;
}

export default addNewEncryptedMessage;
