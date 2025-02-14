import data from "~/assets/taggedPDFSchoolDB.json";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  console.log(data);
  return (
    <div className="flex h-full w-full">
      <div className="h-screen overflow-y-auto bg-gray-800 text-white">
        <nav className="flex flex-col gap-4 p-4">
          <h1 className="text-2xl font-bold text-[hsl(22,100%,70%)]">
            Tagged PDF School Tags
          </h1>
          {data.pdfTags.map((tag) => (
            <a
              key={tag.tag}
              href={`#${tag.tag}`}
              className="hover:text-[#fbbf24]"
            >
              {tag.tag}
            </a>
          ))}
        </nav>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
