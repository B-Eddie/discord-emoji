"use client";
import { useEffect, useState } from "react";
import { storage } from "../lib/firebaseConfig";
import { ref, listAll, getDownloadURL } from "firebase/storage";

export default function Emojis() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const imagesRef = ref(storage, "images");

        const result = await listAll(imagesRef);
        
        // gets url from all
        const urls = await Promise.all(
          result.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return { name: itemRef.name, url };
          })
        );

        setData(urls);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="mt-16">
      <h1 className="text-4xl font-bold">Emojis</h1>
      <div className="flex flex-row mt-14 gap-5 flex-wrap justify-center items-start">
        {data.map((item) => (
          <div className="border-black border-2 rounded-xl p-2 transition-all hover:scale-105 hover:cursor-pointer" key={item.name}>
            <img src={item.url} alt={item.name} className="w-32 h-auto" />
            <p className="h-auto">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}