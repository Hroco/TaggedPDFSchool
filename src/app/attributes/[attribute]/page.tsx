import data from "~/assets/taggedPDFSchoolDB.json";
import Attribute from "./Attribute";

export async function generateStaticParams() {
  return data.attributes.map((attr) => ({
    attribute: attr.name,
  }));
}

export default async function Page(props: {
  params: Promise<{ attribute: string }>;
}) {
  const params = await props.params;
  return <Attribute currentAttribute={params.attribute} />;
}
