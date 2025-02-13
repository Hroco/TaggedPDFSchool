import data from "~/assets/taggedPDFSchoolDB.json";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex w-full h-full">
      <div>
        <nav className="flex flex-col gap-4 p-4 bg-gray-800 text-white h-screen">
          <h1 className="text-2xl font-bold">Tagged PDF School</h1>
          {
            data.pdfTags.map((tag) => (
              <a
                key={tag.tag}
                href={`#${tag.tag}`}
                className="hover:text-[#fbbf24]"
              >
                {tag.tag}
              </a>
            ))
          }
        </nav>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
