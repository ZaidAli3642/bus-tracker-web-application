import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, database } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const validateImage = (image) => {
  if (!image) return "";
  const { type } = image[0];

  if (type === "image/jpeg" || type === "image/jpg" || type === "image/png")
    return true;

  return false;
};

const storeImage = async (collectionName, image) => {
  try {
    const result = validateImage(image);
    let downloadedUrl = "";
    if (result === true) {
      const imageRef = ref(storage, collectionName + image[0].name);

      const snapShot = await uploadBytes(imageRef, image[0]);
      downloadedUrl = await getDownloadURL(snapShot.ref);
      return downloadedUrl;
    }
    return false;
  } catch (error) {
    console.log(error);
    toast.error("Error occured while saving image.");
  }
};

export const addData = async (data, collectionName, image) => {
  const result = await storeImage(collectionName, image);
  if (result === false) return;

  const collectionRef = collection(database, collectionName);

  const response = await addDoc(collectionRef, {
    ...data,
    image: result,
  });

  return response;
};
