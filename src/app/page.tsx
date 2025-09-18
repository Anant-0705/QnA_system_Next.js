import Image from "next/image";
import loginpage from "./login/page";
export default function Home() {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main content area.</p>
      {/* <button onClick={() => window.location.href = '/login'}>Go to Login</button> */}
    </div>
  );
}
