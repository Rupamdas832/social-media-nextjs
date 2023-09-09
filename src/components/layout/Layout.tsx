import "../../app/globals.css";
import Navbar from "../navbar/Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full items-center justify-center mb-8">
      <Navbar />
      <div style={{ width: "640px" }}>{children}</div>
    </div>
  );
}
