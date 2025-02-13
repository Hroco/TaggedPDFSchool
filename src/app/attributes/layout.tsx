import data from "~/assets/taggedPDFSchoolDB.json";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex w-full h-full">
      <div className="h-screen overflow-y-auto bg-gray-800 text-white">
      <nav className="flex flex-col gap-4 p-4">
          <h1 className="text-2xl font-bold text-[hsl(22,100%,70%)]">Tagged PDF School Atributes</h1>
          {
            data.attributes.map((attr) => (
              <a
                key={attr.name}
                href={`#${attr.name}`}
                className="hover:text-[#fbbf24]"
              >
                {attr.name}
              </a>
            ))
          }
        </nav>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
