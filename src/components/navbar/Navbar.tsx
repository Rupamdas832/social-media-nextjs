import { FileEdit, Home, UserCircle } from "lucide-react";
import Link from "next/link";
import { ReactElement } from "react";

const pages = [
  {
    name: <Home />,
    value: "feed",
  },
  {
    name: <FileEdit />,
    value: "create-post",
  },
  {
    name: <UserCircle />,
    value: "profile",
  },
];

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4 fixed bottom-0 w-[350px] border-t-2 border-neutral-500 bg-neutral-900">
      {pages.map((page: { name: any; value: string }) => {
        return (
          <Link href={`/${page.value}`}>
            <p className="font-bold text-lg text-white">{page.name}</p>
          </Link>
        );
      })}
    </div>
  );
};

export default Navbar;
