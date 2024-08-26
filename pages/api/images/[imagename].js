import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../src/lib/firebaseConfig";

export default async function handler(req, res) {
  const { imagename } = req.query;

  if (!imagename) {
    return res.status(400).json({ error: "Image name is required" });
  }

  try {
    const fileRef = ref(storage, `images/${imagename}`);
    const url = await getDownloadURL(fileRef);
    res.redirect(url);
  } catch (error) {
    console.error("Error fetching image URL:", error);
    res.status(404).json({ error: "Image not found" });
  }
}
