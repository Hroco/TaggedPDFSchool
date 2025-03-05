import properties from "~/assets/propertiesDB.json";
import Property from "./Property";

export async function generateStaticParams() {
  return properties.map((prop) => ({
    property: prop.name,
  }));
}

export default async function Page(props: {
  params: Promise<{ property: string }>;
}) {
  const params = await props.params;
  return <Property currentProperty={params.property} />;
}
