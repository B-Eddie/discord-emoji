"use client";
export default function Use() {
  return (
    <div id="filesubmit" className="mt-10">
      <h1 className="text-4xl font-bold">How to use</h1>
      <div className="mt-5">
        <ol className="px-20 list-decimal">
          <li className="mt-5">Discord turns links into images, which can be used as emojis. This will let you use the "emojis" anywhere you want, no matter what type of image!</li>
          <li className="mt-5">In discord, type in this url, then add a /discord/(nameofemoji) to the end. Eg. domain.com/images/yay.gif</li>
          <li className="mt-5">Instead of manually typing out the link, you can click the emojis on top to copy the link, which you can paste in discord.</li>
          <li className="mt-5">You can add your own emoji by using the upload emoji section on top!</li>
        </ol>
      </div>
    </div>
  );
}
