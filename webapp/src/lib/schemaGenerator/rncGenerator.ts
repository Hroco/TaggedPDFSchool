import tagsCJS from "@assets/tagsDB";
// Define Tag interface for type safety
interface Tag {
  name: string;
  namespace: string[];
  type: string[];
}
// Unwrap CommonJS or ESM default to retrieve the tags array using unknown for safe casting
const rawTags =
  (tagsCJS as unknown as { default?: Tag[] }).default ??
  (tagsCJS as unknown as Tag[]);
const tags: Tag[] = Array.isArray(rawTags) ? rawTags : [];
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";

// Type definitions for the JSON data structures
interface AttributeValue {
  valueType: string;
  values: Array<{
    name: string;
    description: string;
  }>;
}

interface Attribute {
  name: string;
  description: string;
  source: string;
  owner: string;
  inheritable: boolean;
  type: string | null;
  defaultValue: string | null;
  values: AttributeValue[];
  relatedTags: string[];
}

interface Property {
  name: string;
  description: string;
  source: string;
  relatedTags: string[];
}

interface StructureElement {
  name: string;
  hierarchy: {
    children: Array<[string, string]>;
    parents: Array<[string, string]>;
  };
}

interface RNCGeneratorConfig {
  attributesFile: string;
  propertiesFile: string;
  structureFile: string;
  outputFile: string;
  namespaces: Record<string, string>;
  includeFiles?: string[];
}

class RNCSchemaGenerator {
  private attributes: Attribute[] = [];
  private properties: Property[] = [];
  private structures: StructureElement[] = [];
  private config: RNCGeneratorConfig;

  constructor(config: RNCGeneratorConfig) {
    this.config = config;
    this.loadData();
  }

  private loadData(): void {
    // Load attributes
    if (existsSync(this.config.attributesFile)) {
      const attributesData = readFileSync(this.config.attributesFile, "utf8");
      this.attributes = JSON.parse(attributesData) as Attribute[];
    }

    // Load properties
    if (existsSync(this.config.propertiesFile)) {
      const propertiesData = readFileSync(this.config.propertiesFile, "utf8");
      this.properties = JSON.parse(propertiesData) as Property[];
    }

    // Load structure relationships
    if (existsSync(this.config.structureFile)) {
      const structureData = readFileSync(this.config.structureFile, "utf8");
      this.structures = JSON.parse(structureData) as StructureElement[];
    }
  }

  private generateNamespaces(): string {
    let output = "";
    for (const [prefix, uri] of Object.entries(this.config.namespaces)) {
      if (prefix === "NoNS") {
        output += `namespace NoNS = ""\n`;
      } else {
        output += `namespace ${prefix} = "${uri}"\n`;
      }
    }
    return output + "\n";
  }

  private generateIncludes(): string {
    if (!this.config.includeFiles || this.config.includeFiles.length === 0) {
      return "";
    }

    let output = "";
    for (const includeFile of this.config.includeFiles) {
      output += `include "${includeFile}" {start |= notAllowed}\n`;
    }
    return output + "\n";
  }

  private generateAttributeDefinitions(): string {
    let output = "### Attribute Definitions\n\n";

    // Generate layout attributes
    const layoutAttributes = this.attributes.filter(
      (attr) => attr.owner === "Layout",
    );
    if (layoutAttributes.length > 0) {
      output += "layout-attributes =\n";
      output += "  # Layout attributes - PDF 2.0 Section 14.8.5.4\n";
      for (const attr of layoutAttributes) {
        const isLastItem =
          attr === layoutAttributes[layoutAttributes.length - 1];
        output += this.generateAttributeLine(attr, "Layout", isLastItem);
      }

      output += "\n";
    }

    // Generate list attributes
    const listAttributes = this.attributes.filter(
      (attr) => attr.owner === "List",
    );
    if (listAttributes.length > 0) {
      output += "list-attributes =\n";
      for (const attr of listAttributes) {
        const isLastItem = attr === listAttributes[listAttributes.length - 1];
        output += this.generateAttributeLine(attr, "List", isLastItem);
      }

      output += "\n";
    }

    // Generate table attributes
    const tableAttributes = this.attributes.filter(
      (attr) => attr.owner === "Table",
    );
    if (tableAttributes.length > 0) {
      output += "table-attributes =\n";
      for (const attr of tableAttributes) {
        const isLastItem = attr === tableAttributes[tableAttributes.length - 1];
        output += this.generateAttributeLine(attr, "Table", isLastItem);
      }

      output += "\n";
    }

    // Generate print field attributes
    const printFieldAttributes = this.attributes.filter(
      (attr) => attr.owner === "PrintField",
    );
    if (printFieldAttributes.length > 0) {
      output += "printfield-attributes =\n";
      for (const attr of printFieldAttributes) {
        const isLastItem =
          attr === printFieldAttributes[printFieldAttributes.length - 1];
        output += this.generateAttributeLine(attr, "PrintField", isLastItem);
      }

      output += "\n";
    }

    // Generate artifact attributes
    const artifactAttributes = this.attributes.filter(
      (attr) => attr.owner === "Artifact",
    );
    if (artifactAttributes.length > 0) {
      output += "artifact-attributes =\n";
      for (const attr of artifactAttributes) {
        const isLastItem =
          attr === artifactAttributes[artifactAttributes.length - 1];
        output += this.generateAttributeLine(attr, "Artifact", isLastItem);
      }

      output += "\n";
    }

    // Generate structure properties (no namespace)
    output += "structure-properties =\n";
    for (const prop of this.properties) {
      const isLastItem = prop === this.properties[this.properties.length - 1];
      const attrName = this.getAttributeName(prop.name);
      output += `  attribute ${attrName} {text}?`;

      if (!isLastItem) {
        output += ",";
      }

      if (prop.description) {
        output += ` # ${prop.description.split(".")[0]}`;
      }
      output += "\n";
    }
    output += "\n";

    return output;
  }

  private generateAttributeLine(
    attr: Attribute,
    namespace: string,
    isLastItem: boolean,
  ): string {
    let line = `  attribute ${namespace}:${attr.name}`;

    if (attr.values && attr.values.length > 0) {
      // Extract all possible values from the nested structure
      const allValues: string[] = [];
      for (const valueGroup of attr.values) {
        if (valueGroup.values && Array.isArray(valueGroup.values)) {
          for (const value of valueGroup.values) {
            if (value.name) {
              allValues.push(value.name);
            }
          }
        }
      }

      if (allValues.length > 0) {
        const values = allValues.map((v) => `"${v}"`).join(" | ");
        line += ` {${values}}`;
      } else {
        line += " {text}";
      }
    } else {
      line += " {text}";
    }

    line += "?";

    if (!isLastItem) {
      line += ",";
    }

    if (attr.description) {
      line += ` # ${attr.description.split(".")[0]}`;
    }

    return line + "\n";
  }

  private getAttributeName(propertyName: string): string {
    // Map property names to attribute names
    const mapping: Record<string, string> = {
      ID: "id",
      T: "title",
      Lang: "lang",
      Alt: "alt",
      E: "expanded",
      ActualText: "actualtext",
      PhoneticAlphabet: "phonetic-alphabet",
      Phoneme: "phoneme",
    };

    return mapping[propertyName] ?? propertyName.toLowerCase();
  }

  private generateCommonAttributes(): string {
    return `
# Common attribute patterns
pdf2-attributes =
  structure-properties,
  layout-attributes,
  otherns-attributes,
  showtags-attributes

showtags-attributes =
  attribute af {text}?,
  attribute rolemapped-from {text}?,
  attribute referenced-as {text}?

# Standard Attribute Owner Namespaces apart from the ones listed here
otherns-attributes =
  attribute (* - (NoNS:*|Layout:*|PrintField:*|Table:*|List:*|Artifact:*)) {text}*

# Role mapping attributes for PDF1 compatibility
pdf1rolemap-Any = notAllowed?
pdf1rolemap-P = notAllowed?
pdf1rolemap-Span = notAllowed?
pdf1rolemap-Note = notAllowed?

`;
  }

  private generateElementDefinitions(): string {
    let output = "### Element Definitions\n\n";

    // Generate start definition
    output += `# UA-2 Single Document element root.\nstart = Document | DocumentFragment\n\n`;

    // Generate helper patterns first
    output += `# Share with pdf1.7 version\ntextorHTML &= (Link|Lbl)*\n\n`;

    for (const element of this.structures) {
      //Skip StructTreeRoot
      if (element.name === "StructTreeRoot") {
        continue;
      }

      output += this.generateElementDefinition(element);
    }

    return output;
  }

  private generateElementDefinition(structure: StructureElement): string {
    const elementName = structure.name;
    const tagData = tags.find((tag) => tag.name === elementName);

    if (!tagData) {
      console.warn(`Tag data not found for ${elementName}`);
      return "";
    }

    const isPDF1Element =
      tagData.namespace.length === 1 && tagData.namespace[0] === "1.7";

    let output = `${elementName} = element ${
      isPDF1Element ? "pdf1" : "pdf2"
    }:${elementName} {\n`;

    // Add role mapping if needed
    if (this.needsRoleMapping(elementName)) {
      output += `pdf1rolemap-${this.getRoleMappingType(elementName)},\n`;
    }

    // Add attributes
    output += "pdf2-attributes";

    // Add specific attribute groups based on element type
    const specificAttrs = this.getSpecificAttributes(elementName);
    if (specificAttrs.length > 0) {
      output += `,\n${specificAttrs.join(",\n")}`;
    }

    output += ",\n";

    // Add content model
    const contentModel = this.generateContentModel(structure);
    output += contentModel;

    output += "\n}\n\n";

    return output;
  }

  private needsRoleMapping(elementName: string): boolean {
    // Elements that need role mapping for PDF1 compatibility
    const roleMappedElements = [
      "DocumentFragment",
      "H7",
      "Aside",
      "Em",
      "Strong",
      "FENote",
      "Title",
    ];
    return roleMappedElements.includes(elementName);
  }

  private getRoleMappingType(elementName: string): string {
    const mappings: Record<string, string> = {
      DocumentFragment: "Any",
      H7: "Any",
      Aside: "Any",
      Em: "Span",
      Strong: "Span",
      FENote: "Note",
      Title: "P",
    };
    return mappings[elementName] ?? "Any";
  }

  private getSpecificAttributes(elementName: string): string[] {
    const attributes: string[] = [];

    // Add specific attribute groups based on element type
    if (["L", "LI"].includes(elementName)) {
      attributes.push("list-attributes");
    }

    if (
      ["Table", "TR", "TH", "TD", "THead", "TBody", "TFoot"].includes(
        elementName,
      )
    ) {
      attributes.push("table-attributes");
    }

    if (["Form"].includes(elementName)) {
      attributes.push("printfield-attributes");
    }

    if (["Artifact"].includes(elementName)) {
      attributes.push("artifact-attributes");
    }

    // Add fenote-attributes for FENote
    if (elementName === "FENote") {
      attributes.push("fenote-attributes");
    }

    return attributes;
  }

  private generateContentModel(structure: StructureElement): string {
    if (structure.hierarchy.children.length === 0) {
      return "(text)*";
    }

    let output = "";

    const elementName = structure.name;
    const children = structure.hierarchy.children.map((child) => {
      if (child[0] === "content item") {
        return ["text", child[1]];
      }
      return [child[0], child[1]];
    });
    const tagData = tags.find((tag) => tag.name === elementName);
    const isGroupingAndBlockElement =
      (tagData?.type.includes("grouping") && tagData?.type.includes("block")) ??
      false;

    const cardinalityZeroToN: string[][] = children.filter(
      (child) => child[1] === "0..n",
    );

    const cardinalityZeroToOne: string[][] = children.filter(
      (child) => child[1] === "0..1",
    );

    const cardinalityUnequal: string[][] = children.filter(
      (child) => child[1] === "\u2021",
    );

    const cardinalityGroupingSpecific: string[][] = children.filter(
      (child) => child[1] === "\u2205*",
    );

    let cardinalityRest: string[][] = children.filter(
      (child) =>
        child[1] !== "0..1" &&
        child[1] !== "0..n" &&
        child[1] !== "\u2021" &&
        child[1] !== "\u2205*",
    );

    let specialCasesOutput: string | null = null;

    //Handle specific cases like Ruby or Warichu
    if (elementName === "Ruby") {
      //remove from cardinalityRest RB RT RP
      cardinalityRest = cardinalityRest.filter(
        (child) => child[0] !== "RB" && child[0] !== "RT" && child[0] !== "RP",
      );
      specialCasesOutput = " & (RB,(RT|(RB,RT,RP)))";
    }

    if (elementName === "Warichu") {
      //remove from cardinalityRest WT WP
      cardinalityRest = cardinalityRest.filter(
        (child) => child[0] !== "WT" && child[0] !== "WP",
      );
      specialCasesOutput = " & (WP,WT,WP)";
    }

    if (specialCasesOutput) {
      output += "(";
    }

    if (isGroupingAndBlockElement) {
      output += "(\n";

      if (cardinalityZeroToOne.length > 0) {
        output += "(";

        for (const [childName] of cardinalityZeroToOne) {
          output += `${childName}?&`;
        }

        output += " ";
      }

      output += "(";

      for (const [childName] of cardinalityZeroToN) {
        const tagData = tags.find((tag) => tag.name === childName);

        if (!tagData) {
          if (childName === "text") {
            continue; //Skip showin console.log for text
          }
          console.log(`Tag data not found for ${childName} in ${elementName}`);
          continue;
        } else {
          if (tagData.type.length === 1 && tagData.type[0] === "inline") {
            /*console.log(
              `We are procesing grouping element ${elementName} so pure inline ${childName} should not be here`
            );*/
            continue;
          }
        }

        output += `${childName}|`;
      }

      for (const [childName] of cardinalityUnequal) {
        output += `${childName}|`;
      }

      for (const [childName] of cardinalityGroupingSpecific) {
        output += `${childName}|`;
      }

      //Remove the last pipe character
      if (output.endsWith("|")) {
        output = output.slice(0, -1);
      }

      output += ")*";

      if (cardinalityZeroToOne.length > 0) {
        output += ")";
      }

      output += " # Grouping\n";

      output += "|\n";

      if (cardinalityZeroToOne.length > 0) {
        output += "(";

        for (const [childName] of cardinalityZeroToOne) {
          output += `${childName}?&`;
        }

        output += " ";
      }

      output += "(";

      for (const [childName] of cardinalityZeroToN) {
        output += `${childName}|`;
      }

      //Remove the last pipe character
      if (output.endsWith("|")) {
        output = output.slice(0, -1);
      }

      output += ")*";

      if (cardinalityZeroToOne.length > 0) {
        output += ")";
      }

      output += " # Block";

      output += "\n)";
    } else {
      if (cardinalityZeroToOne.length > 0) {
        output += "(";

        for (const [childName] of cardinalityZeroToOne) {
          output += `${childName}?&`;
        }

        output += " ";
      }

      output += "(";

      for (const [childName] of cardinalityUnequal) {
        output += `${childName}|`;
      }

      for (const [childName] of cardinalityZeroToN) {
        output += `${childName}|`;
      }

      //Remove the last pipe character
      if (output.endsWith("|")) {
        output = output.slice(0, -1);
      }

      output += ")*";

      if (specialCasesOutput) {
        output += specialCasesOutput;
        output += ")";
      }

      if (cardinalityZeroToOne.length > 0) {
        output += ")";
      }
    }

    for (const [childName, cardinality] of cardinalityRest) {
      console.log(
        `${childName} have unsupported cardinality ${cardinality} in ${elementName}`,
      );
    }

    return output;
  }

  private generateSpecialDefinitions(): string {
    return `
# Special definitions
fenote-attributes = notAllowed?

figure-attributes =
  attribute actualtext {text}?&   # ActualText
  attribute alt {text}?           # Alt

sechead.content =
  pdf2-attributes,
  (Art?&Sect?&(text|NonStruct|Private|Note|Code|Sub|Lbl|Em|Strong|Span|Quote|Link|Reference|Annot|Form|Ruby|Warichu|FENote|BibEntry|Figure|Formula|Artifact)*)

# Text or HTML content helper
textorHTML &= (Link|Lbl)*

`;
  }

  public generateSchema(): string {
    let schema = "";

    // Add header comment
    schema += "# Generated RNC Schema for PDF Structure Elements\n";
    schema += `# Generated on: ${new Date().toISOString()}\n\n`;

    // Add namespaces
    schema += this.generateNamespaces();

    // Add includes
    schema += this.generateIncludes();

    // Add extensions and modifications
    schema += this.generateExtensions();

    // Add attribute definitions
    schema += this.generateAttributeDefinitions();

    // Add common attribute patterns
    schema += this.generateCommonAttributes();

    // Add special definitions
    schema += this.generateSpecialDefinitions();

    // Add element definitions
    schema += this.generateElementDefinitions();

    return schema;
  }

  private generateExtensions(): string {
    return `# Extensions

## MathML Namespace extensions
mo.attributes &= attribute actualtext {text}?

mpadded-length-percentage |= xsd:string {
  pattern = '\\s*(([\\\-+]?[0-9]*([0-9]\\.?|\\.[0-9])[0-9]*(r?em|ex|in|cm|mm|p[xtc]|Q|v[hw]|vmin|vmax|%))|0)\\s*'
}

`;
  }

  public writeToFile(): void {
    const schema = this.generateSchema();
    writeFileSync(this.config.outputFile, schema, "utf8");
    console.log(`RNC schema generated successfully: ${this.config.outputFile}`);
  }
}

// Main execution
function main() {
  const currentDir = process.cwd();
  const config: RNCGeneratorConfig = {
    attributesFile: join(currentDir, "../assets/attributesDB.json"),
    propertiesFile: join(currentDir, "../assets/propertiesDB.json"),
    structureFile: join(
      currentDir,
      "./src/hierarchyGenerator/32005-main/sources/generated/structure-relationships.json",
    ),
    outputFile: join(currentDir, "./src/lib/rnv/generated-schema.rnc"),
    namespaces: {
      NoNS: "",
      pdf1: "http://iso.org/pdf/ssn",
      pdf2: "http://iso.org/pdf2/ssn",
      mml: "http://www.w3.org/1998/Math/MathML",
      Layout: "http://iso.org/pdf/ssn/Layout",
      PrintField: "http://iso.org/pdf/ssn/PrintField",
      Table: "http://iso.org/pdf/ssn/Table",
      List: "http://iso.org/pdf/ssn/List",
      Artifact: "http://iso.org/pdf/ssn/Artifact",
      h: "http://www.w3.org/1999/xhtml",
    },
    includeFiles: ["latex-mathml.rnc"],
  };

  const generator = new RNCSchemaGenerator(config);
  generator.writeToFile();
}

// Execute main when this script is run directly
main();

export { RNCSchemaGenerator };
export type { RNCGeneratorConfig };
