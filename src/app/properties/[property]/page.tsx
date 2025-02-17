import data from "~/assets/taggedPDFSchoolDB.json";
import Property from "./Property";

export async function generateStaticParams() {
  return data.properties.map((prop) => ({
    property: prop.name,
  }));
}

export default async function Page(props: {
  params: Promise<{ property: string }>;
}) {
  const params = await props.params;
  return <Property currentProperty={params.property} />;
}
