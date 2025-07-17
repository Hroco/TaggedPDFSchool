import tags from "@assets/tagsDB.json";
import Tag from "./Tag";
import { notFound } from "next/navigation";
import { getSample } from "~/lib/apiFunctions/main";
import attributes from "@assets/attributesDB.json";
import properties from "@assets/propertiesDB.json";
import checks from "@assets/matterhornProtocol.json";
import hierarchyData from "~/hierarchyGenerator/32005-main/sources/generated/structure-relationships.json";

export type attributesType = typeof attributes;
export type checksType = typeof checks;
export type propertiesType = typeof properties;
export type tagType = (typeof tags)[0];

export async function generateStaticParams() {
  return tags.map((tag) => ({
    tag: tag.name,
  }));
}

export default async function Page(props: {
  params: Promise<{ tag: string }>;
}) {
  const params = await props.params;

  const tag = tags.find((tag) => tag.name === params.tag);

  if (!tag) {
    notFound();
  }

  const {
    samples,
    checksForTag,
    attributesForTag,
    propertiesForTag,
    parrentTags,
    childTags,
  } = parseTag(tag);

  return (
    <Tag
      tag={tag}
      samples={samples}
      checksForTag={checksForTag}
      attributesForTag={attributesForTag}
      propertiesForTag={propertiesForTag}
      parrentTags={parrentTags}
      childTags={childTags}
    />
  );
}

function parseTag(tag: (typeof tags)[0]) {
  const checksForTag = checks.filter((check) => {
    return check.relatedTags.includes(tag.name);
  });

  const attributesForTag = attributes.filter((attribute) => {
    const relatedTags = attribute.relatedTags;
    return relatedTags.includes(tag.name);
  });

  const propertiesForTag = properties.filter((propertie) => {
    const relatedTags = propertie.relatedTags;
    return relatedTags.includes(tag.name);
  });

  const hierarchyForTag = hierarchyData.find((hierarchy) => {
    return hierarchy.name === tag.name;
  });

  const parrentTags = hierarchyForTag?.hierarchy.parents.map((item) => {
    const [tagName, occurrences] = item;

    let newTagName: string;
    let newOccurrences: string;

    if (typeof tagName === "number") {
      newTagName = tagName.toString();
    } else {
      newTagName = tagName ?? "";
    }

    if (typeof occurrences === "number") {
      newOccurrences = occurrences.toString();
    } else {
      newOccurrences = occurrences ?? "";
    }

    return [newTagName, newOccurrences];
  });

  const childTags = hierarchyForTag?.hierarchy.children.map((item) => {
    const [tagName, occurrences] = item;

    let newTagName: string;
    let newOccurrences: string;

    if (typeof tagName === "number") {
      newTagName = tagName.toString();
    } else {
      newTagName = tagName ?? "";
    }

    if (typeof occurrences === "number") {
      newOccurrences = occurrences.toString();
    } else {
      newOccurrences = occurrences ?? "";
    }

    return [newTagName, newOccurrences];
  });

  const samples = tag.useCases
    ? tag.useCases.map((useCase) => {
        const sample = getSample({
          useCasePath: useCase.sample,
        });

        return typeof sample !== "string" && sample.status === "success"
          ? sample.content
          : "";
      })
    : [];
  return {
    samples,
    checksForTag,
    attributesForTag,
    propertiesForTag,
    parrentTags,
    childTags,
  };
}
