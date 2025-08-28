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

  const copyImageLink = (name) => {
    navigator.clipboard.writeText(window.location.href + "/images/" + name);
    document.getElementById(name).innerHTML = `Copied ${name}`
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
    <div className="mt-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-4">
            Your Emojis
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Click any emoji below to copy its link and use it in Discord!
          </p>
        </div>

        {/* Emoji Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {data.map((item) => (
            <div
              key={item.name}
              className="relative group"
              onMouseEnter={() => handleMouseEnter(item.name)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Tooltip */}
              {tooltipVisible === item.name && (
                <div
                  role="tooltip"
                  className="absolute z-20 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-slate-800 rounded-lg shadow-lg opacity-100 w-max tooltip dark:bg-slate-700"
                  style={{
                    top: "-50px",
                    left: "50%",
                    transform: "translateX(-50%)",
                  }}
                  id={`${item.name}`}
                >
                  Click to copy link
                  <div
                    className="tooltip-arrow"
                    data-popper-arrow
                    style={{
                      position: "absolute",
                      width: 0,
                      height: 0,
                      borderWidth: "5px",
                      borderStyle: "solid",
                      borderColor: "transparent transparent #334155 transparent",
                      top: "100%",
                      left: "50%",
                      transform: "translateX(-50%)",
                      transform: "rotate(180deg)",
                    }}
                  />
                </div>
              )}

              {/* Emoji Card */}
              <div
                className="relative bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer border border-blue-200/50 dark:border-blue-800/50 hover:border-blue-300 dark:hover:border-blue-700"
                onClick={() => copyImageLink(item.name)}
              >
                {/* Emoji Image */}
                <div className="aspect-square bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl mb-3 flex items-center justify-center overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Emoji Name */}
                <div className="text-center">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">
                    {item.name}
                  </p>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {data.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-blue-400 dark:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-5.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H1" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
              No emojis yet
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Upload your first emoji to get started!
            </p>
            <button
              onClick={() => document.getElementById('filesubmit')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Upload Your First Emoji
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
