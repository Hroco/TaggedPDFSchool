import Link from "next/link";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 mx-auto flex items-center justify-between border-b border-gray-800 bg-gray-900/95 px-4 py-3 pl-5 backdrop-blur supports-[backdrop-filter]:bg-gray-900/75">
      <h1 className="hidden text-2xl font-bold text-orange-500 sm:block">
        Tagged PDF School
      </h1>
      <nav className="flex items-center space-x-4">
        <Link href="/" className="transition-colors hover:text-orange-500">
          Home
        </Link>
        <Link href="/tags" className="transition-colors hover:text-orange-500">
          Tags
        </Link>
        <Link
          href="/properties"
          className="transition-colors hover:text-orange-500"
        >
          Properties
        </Link>
        <Link
          href="/attributes"
          className="transition-colors hover:text-orange-500"
        >
          Attributes
        </Link>
        <Link href="/about" className="transition-colors hover:text-orange-500">
          About
        </Link>
      </nav>
    </header>
  );
};
