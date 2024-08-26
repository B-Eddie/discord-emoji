import FileUpload from "@/components/FileUpload";
import Emojis from "@/components/Emojis";
import Use from "@/components/Use";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center text-center">
      <Emojis />

      <FileUpload />
      <Use />
      <Footer />
    </main>
  );
}
