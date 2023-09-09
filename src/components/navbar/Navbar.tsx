import Link from "next/link";

const pages = [
  {
    name: "FEED",
    value: "feed",
  },
  {
    name: "CREATE-POST",
    value: "create-post",
  },
  {
    name: "PROFILE",
    value: "profile",
  },
];

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4 fixed bottom-0 w-[350px] border-t-2 border-neutral-500 bg-neutral-900">
      {pages.map((page: { name: string; value: string }) => {
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
