"use client";
import { useEffect, useState } from "react";
import { storage } from "../lib/firebaseConfig";
import { ref, listAll, getDownloadURL } from "firebase/storage";

export default function Emojis() {
  const [data, setData] = useState([]);
  const [tooltipVisible, setTooltipVisible] = useState(null);

  const handleMouseEnter = (name) => {
    setTooltipVisible(name);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(null);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const imagesRef = ref(storage, "images");

        const result = await listAll(imagesRef);

        // gets url from all
        const urls = await Promise.all(
          result.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);

            try {
              const response = await fetch(
                `/api/downloadImage?imageUrl=${encodeURIComponent(
                  url
                )}&imageName=${encodeURIComponent(itemRef.name)}`
              );
              if (!response.ok) {
                throw new Error("network not okay");
              }
              const data = await response.json();
              if (data.success) {
              } else {
                console.log("did not work");
              }
            } catch (error) {
              console.error("problem: ", error);
            }

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
      <div className="flex flex-row flex-wrap justify-center gap-5 mt-14">
        {data.map((item) => (
          <div
            key={item.name}
            className="relative"
            onMouseEnter={() => handleMouseEnter(item.name)}
            onMouseLeave={handleMouseLeave}
          >
            {tooltipVisible === item.name && (
              <div
                role="tooltip"
                className="absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-100 tooltip dark:bg-gray-700"
                style={{
                  top: "100%",
                  left: "50%",
                  transform: "translateX(-50%)",
                }}
              >
                {item.name}
                <div className="tooltip-arrow" />
              </div>
            )}

            <div
              className="relative p-2 text-center transition-all border-2 h-52 rounded-xl hover:scale-105 hover:cursor-pointer"
              key={item.name}
            >
              <img
                src={item.url}
                alt={item.name}
                className="w-32 h-auto pb-5"
              />
              <p className="absolute bottom-0 left-0 right-0 px-3 mx-auto text-center text-ellipsis overflow-clip">
                {item.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
