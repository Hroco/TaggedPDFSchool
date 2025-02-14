import data from "~/assets/taggedPDFSchoolDB.json";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const attributeList = data.attributes;

  //sort the attributes by owner in this order Layout,List,Table, PrintField, Artifact and throw error if the owner is not in the list
  const sortedAttributes = attributeList.sort((a, b) => {
    const ownerOrder = ["Layout", "List", "Table", "PrintField", "Artifact"];
    const aIndex = ownerOrder.indexOf(a.owner);
    const bIndex = ownerOrder.indexOf(b.owner);
    if (aIndex === -1 || bIndex === -1) {
      throw new Error(`Invalid owner: ${a.owner} or ${b.owner}`);
    }
    return aIndex - bIndex;
  });

  return (
    <div className="flex h-full w-full">
      <div className="h-screen overflow-y-auto bg-gray-800 text-white">
        <nav className="flex flex-col gap-4 p-4">
          <h1 className="text-2xl font-bold text-[hsl(22,100%,70%)]">
            Tagged PDF School Atributes
          </h1>
          {sortedAttributes.map((attr, index) => {
            const shouldShownOwner =
              index === 0 || attr.owner !== sortedAttributes[index - 1]?.owner;
            return (
              <>
                {shouldShownOwner && (
                  <h2 className="text-xl font-bold text-[#fbbf24]">
                    {attr.owner}
                  </h2>
                )}
                <a
                  key={index}
                  href={`#${attr.name}`}
                  className="hover:text-[#fbbf24]"
                >
                  {attr.name}
                </a>
              </>
            );
          })}
        </nav>
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
