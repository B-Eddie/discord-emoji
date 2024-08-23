import FileUpload from "@/components/FileUpload";
import Emojis from "@/components/Emojis";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col text-center items-center">
      <Emojis />

      <div>
        <h1>Uplaod an image</h1>
        <FileUpload />
      </div>
    </main>
  );
}
