import Navbar from "@/components/navigation/Navbar";
import { TfiFaceSad } from "react-icons/tfi";

function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex items-center flex-col gap-4 justify-center flex-1">
        <TfiFaceSad className="text-4xl text-darkgrey" />
        <p className="text-grey">Sorry! This Page does not exist.</p>
      </main>
    </>
  );
}

export default NotFound;
