import data from "~/assets/taggedPDFSchoolDB.json";
import Tag from "./Tag";

export async function generateStaticParams() {
  return data.pdfTags.map((tag) => ({
    tag: tag.tag,
  }));
}

export default async function Page(props: { params: Promise<{ tag: string }> }) {
  const params = await props.params;
  return <Tag currentTag={params.tag} />;
}
