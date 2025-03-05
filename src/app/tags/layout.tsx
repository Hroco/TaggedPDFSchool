import tags from "~/assets/taggsDB.json";
import Link from "next/link";
import { ScrollArea } from "~/components/ui/scroll-area";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="container flex max-w-screen-2xl">
      <aside className="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-72 border-r border-gray-800 bg-gray-900 lg:block">
        <ScrollArea className="h-full py-6 pl-8 pr-6">
          <nav className="relative">
            <div className="mb-4 text-lg font-bold text-orange-500">
              PDF Tags Reference
            </div>
            <ul className="space-y-2">
              {tags.map((tag) => (
                <li key={tag.name}>
                  <Link
                    href={`/tags/${tag.name}`}
                    className="block py-1 text-sm text-gray-400 transition-colors hover:text-orange-500"
                  >
                    {tag.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </ScrollArea>
      </aside>
      <main className="min-h-[calc(100vh-3.5rem)] w-full lg:pl-72">
        <div className="h-full px-4 py-6 lg:px-8">
          {children}
          <div className="mt-10 flex justify-between border-t border-gray-800 pt-4"></div>
        </div>
      </main>
    </div>
  );
}
