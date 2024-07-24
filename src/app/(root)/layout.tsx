import Navbar from "@/components/navigation/Navbar";

function CommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col">
      <Navbar />
      {children}
    </div>
  );
}

export default CommonLayout;
