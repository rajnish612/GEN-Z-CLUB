import Feed from "@/components/home/Feed";
import Rightmenu from "@/components/home/Rightmenu";
import Stories from "@/components/home/Stories";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-end gap-10 px-10 overflow-x-scroll">
      <div className="flex flex-col items-center gap-4">
        <Stories/>
   <Feed/>
   </div>

   <Rightmenu/>
    </div>
  );
}
