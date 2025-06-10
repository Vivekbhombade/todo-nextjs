// import { login, signup } from './actions'
import { login } from "./action"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="w-[500px] mx-auto mt-20">
      <form
          className="flex flex-col items-center justify-between w-full gap-y-4 p-9 rounded-2xl border-[5px] border-[#D6DDEB]"
          
        >
          <h2 className="text-[#c6cedd] mb-6 text-[26px] font-[600]">Login Form</h2>
          <label className="w-full block gap-y-2">  
            <span className="text-[#c6cedd] text-[16px] font-[600] after:ml-0.5 after:text-red-500 after:content-['*'] ...">
              Email Address
            </span>
            <input
              type="email"
              name="email"
              className="rounded-full focus:outline-none mt-[4px] bg-[#fff] border-[1px] border-[#D6DDEB] px-4 py-3 w-full text-[#000] placeholder:text-[#000] placeholder:text-[16px] placeholder:font-[400]" 
              placeholder="Enter Email Address"
            />
          </label>
          <label className="w-full block gap-y-2">
            <span className="text-[#c6cedd] text-[16px] font-[600] after:ml-0.5 after:text-red-500 after:content-['*'] ...">
              Password
            </span>
            <input
              type="password"
              name="password"
              className="rounded-full focus:outline-none mt-[4px]  bg-[#fff] border-[1px] border-[#D6DDEB] px-4 py-3 w-full text-[#000] placeholder:text-[#000] placeholder:text-[16px] placeholder:font-[400]"
              placeholder="Enter Password"
            />
          </label>
          <label className="flex flex-row items-center justify-between w-full"><div><input className="mr-2" type="checkbox"/><span className="text-[#4A42A3] font-normal text-[16px]">Remember Me</span></div><Link className="text-[#4A42A3] font-normal text-[16px] underline underline-[0.5px]" href={"/"}>Forgot Password?</Link></label>
          <button formAction={login} className="btn btn-block py-3 text-white w-full rounded-full bg-[#4A42A3] hover:bg-[#5A53A9]">
            Login
          </button>
      </form>
    </div>
  )
}