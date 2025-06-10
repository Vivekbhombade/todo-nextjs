import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <div>
       <div className="flex flex-col items-center justify-center mt-20">
        <h1 className="text-2xl mb-2">Hello Vivek Bhombade</h1> 
        <h2 className="text-2xl"> This is Todo App</h2>
        <h2 className="text-2xl"> For the user signup click on below button</h2>
       </div>
      <div className="flex flex-col items-center justify-center mt-5">
      <Link href="/signup" className="py-2 px-4 rounded-2xl border-[2px] border-[#D6DDEB] bg-[#4A42A3] hover:bg-[#5A53A9]">SignUP Form</Link>
      <Link href="/login" className="py-2 mt-3 px-4 rounded-2xl border-[2px] border-[#D6DDEB] bg-[#4A42A3] hover:bg-[#5A53A9]">Existing user Click Login</Link>
      </div>
    </div>
  );
}
