import tags from "~/assets/taggsDB.json";
import Tag from "./Tag";

export async function generateStaticParams() {
  return tags.map((tag) => ({
    tag: tag.name,
  }));
}

export default async function Page(props: {
  params: Promise<{ tag: string }>;
}) {
  const params = await props.params;
  return <Tag currentTag={params.tag} />;
}
