const tags = [
  {
    name: "StructTreeRoot",
    description: "",
    source: "",
    namespace: ["1.7", "2.0"],
    type: [],
  },
  {
    name: "Document",
    description:
      "Represents the root element of a PDF's logical structure tree. It serves as the [container](https://pdfa.org/glossary-of-accessibility-terminology-in-pdf/#container) for all content elements, defining the primary organizational hierarchy of the document.",
    source: "ISO 32000-2:2020, Section 14.8.4.3",
    namespace: ["1.7", "2.0"],
    type: ["document", "grouping"],
    differences: {
      wellTaggedPDF: {
        description:
          "Well-Tagged PDF provides detailed guidelines for document structure elements—such as Document, Part, Art, Sect, Div, and others—to ensure semantic clarity and reusability. It emphasizes clear nesting and explicit tagging of structural elements.",
        requirements:
          "Requires a well-defined structure tree with proper role mapping, explicit tagging for headings and sections, and consistent application of element boundaries to support both reusability and accessibility.",
        source: "Well-Tagged PDF Specification, v1.0.0 (February 2024)",
      },
      pdfUA: {
        description:
          "PDF/UA (PDF/UA-1 and PDF/UA-2) mandates a complete and accessible logical structure tree. It ensures that all document structure elements are tagged in a way that assistive technologies can interpret, enhancing the document’s accessibility.",
        requirements:
          "Mandates inclusion of all essential structural elements with correct role mapping, proper tagging of headings, lists, tables, and alternative descriptions where needed, ensuring content is accessible to users with disabilities.",
        source: "PDF/UA-1 (ISO 14289-1:2014) and PDF/UA-2 (ISO 14289-2:2024)",
      },
    },
    examples: [
      {
        description:
          "A mail merge PDF typically contains a number of letters to different recipients. This implies that the PDF at the top level is one document, containing multiple documents at its child level where each such document is a letter to a recipient.",
        source: "ISO 32000-2:2020, Section 14.8.4.3",
      },
      {
        description:
          "A mail merge PDF typically contains a number of letters to different recipients. This implies that the PDF at the top level is one document, containing multiple documents at its child level where each such document is a letter to a recipient.",
        source: "ISO 32000-2:2020, Section 14.8.4.3",
      },
    ],
  },
  {
    name: "DocumentFragment",
    description:
      "Encapsulates a fragment of a logical document extracted from another source. It is used to preserve content from an external document while maintaining its logical structure.",
    source: "ISO 32000 Section 14.8.4.3",
    namespace: ["2.0"],
    type: ["document"],
  },
  {
    name: "Part",
    description:
      "Defines a grouping element for content that has a semantic purpose unrelated to the document’s heading hierarchy, allowing segmentation of content into distinct parts.",
    source: "ISO 32000 Section 14.8.4.4",
    namespace: ["1.7", "2.0"],
    type: ["grouping"],
    differences: {
      wellTaggedPDF: {
        description:
          "The 'Part' element in Well-Tagged PDF is used to mark a major subdivision of a document—often representing a volume or large section—to enhance reusability and interoperability. It groups related content that can be independently extracted or reflowed.",
        requirements:
          "For Well-Tagged PDF, the 'Part' element should be clearly defined with a consistent role and logical boundaries. It must be integrated within a comprehensive structure tree, enabling precise content extraction and reflow without necessarily requiring additional accessibility metadata beyond a clear grouping.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'Part' element denotes a primary division of the document that is essential for accessibility. It helps users navigate large documents by breaking them into semantically distinct segments.",
        requirements:
          "PDF/UA mandates that the 'Part' element is used in a semantically meaningful way, typically accompanied by a title or alternate text. This ensures that assistive technologies can correctly interpret and navigate the document’s hierarchy. The element must be part of a fully tagged, accessible structure tree where each 'Part' is clearly delineated.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
    useCases: [
      {
        description: "",
        sample: `<Part><!-- e.g. category of a magazine -->
  <Art><!-- one article in a category -->
    <H1>[main content of the article]</H1>
    <P>text</P>
      <Sect><!-- info box content -->
        <P>text</P>
        <Div lang="de-DE"><!-- passage of foreign language content, where a Lang attribute is assigned to &lt;Div&gt; -->
          <P>text</P>
          <P>text</P>
        </Div>
      </Sect>
  </Art>
  <!-- More <Art> elements can be added here -->
</Part>`,
      },
    ],
  },
  {
    name: "Sect",
    description:
      "Denotes a section of a document, grouping together related content under a common thematic heading to organize the document’s overall structure.",
    source: "ISO 32000 Section 14.8.4.4",
    namespace: ["1.7", "2.0"],
    type: ["grouping"],
    differences: {
      wellTaggedPDF: {
        description:
          "The 'Sect' element in Well-Tagged PDF represents a distinct section within a document. It is used to logically group related content that belongs together, facilitating efficient content extraction and reflow for reuse purposes.",
        requirements:
          "For Well-Tagged PDF, the 'Sect' element should be clearly defined and properly nested within the overall structure tree. Role mapping must be consistent, ensuring that each section is identifiable and can be independently processed for layout and content reuse.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'Sect' element is used to denote a semantically meaningful section of the document that aids accessibility. It helps users navigate the document by breaking it into manageable, clearly defined parts.",
        requirements:
          "PDF/UA mandates that the 'Sect' element is employed in a semantically correct manner, typically accompanied by a heading or title. It must be integrated into a fully tagged structure tree to ensure that assistive technologies can accurately interpret and navigate the document’s sections.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
    useCases: [
      {
        description: "",
        sample: `<Part><!-- e.g. category of a magazine -->
  <Art><!-- one article in a category -->
    <H1>[main content of the article]</H1>
    <P>text</P>
      <Sect><!-- info box content -->
        <P>text</P>
        <Div lang="de-DE"><!-- passage of foreign language content, where a Lang attribute is assigned to &lt;Div&gt; -->
          <P>text</P>
          <P>text</P>
        </Div>
      </Sect>
  </Art>
  <!-- More <Art> elements can be added here -->
</Part>`,
      },
    ],
  },
  {
    name: "Div",
    description:
      "A generic [container](https://pdfa.org/glossary-of-accessibility-terminology-in-pdf/#container) used to group content that shares common attributes or properties, without imparting any specific semantic meaning.",
    source: "ISO 32000 Section 14.8.4.4",
    namespace: ["1.7", "2.0"],
    type: ["grouping"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'Div' element in Well-Tagged PDF is a generic [container](https://pdfa.org/glossary-of-accessibility-terminology-in-pdf/#container) used to group content when no more specific semantic element applies. It supports content reusability and logical grouping without imposing strict semantic meaning.",
        requirements:
          "For Well-Tagged PDF, the 'Div' element should be used to enclose related content elements, ensuring that they are grouped logically in the structure tree. Consistent tagging and proper nesting are essential for enabling effective content extraction and reflow.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'Div' element serves as a fallback [container](https://pdfa.org/glossary-of-accessibility-terminology-in-pdf/#container) when no specific semantic role is applicable. It helps maintain the document’s structure and supports navigation by [assistive technologies](https://pdfa.org/glossary-of-accessibility-terminology-in-pdf/#assistive-technology).",
        requirements:
          "PDF/UA requires that when a 'Div' element is used, it is integrated within a fully tagged structure tree and, where possible, accompanied by appropriate alternate text or headings to clarify its purpose.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
    useCases: [
      {
        description: "",
        sample: `<Part><!-- e.g. category of a magazine -->
  <Art><!-- one article in a category -->
    <H1>[main content of the article]</H1>
    <P>text</P>
      <Sect><!-- info box content -->
        <P>text</P>
        <Div lang="de-DE"><!-- passage of foreign language content, where a Lang attribute is assigned to &lt;Div&gt; -->
          <P>text</P>
          <P>text</P>
        </Div>
      </Sect>
  </Art>
  <!-- More <Art> elements can be added here -->
</Part>`,
      },
    ],
  },
  {
    name: "Aside",
    description:
      "Represents content that is tangentially related to the main content, such as side notes or additional commentary.",
    source: "ISO 32000 Section 14.8.4.4",
    namespace: ["2.0"],
    type: ["grouping"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'Aside' element in Well-Tagged PDF denotes content that is related but secondary to the main content. It is used to present supplementary information, such as side notes or tangential details.",
        requirements:
          "For Well-Tagged PDF, the 'Aside' element should be clearly marked and appropriately nested within the structure tree. Its use should enhance the document’s reusability by clearly separating supplementary content from the primary narrative.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'Aside' element is intended for content that supports but is not essential to the main text. It aids in accessibility by allowing users to bypass non-critical information if needed.",
        requirements:
          "PDF/UA mandates that the 'Aside' element is tagged with clear semantics, often including a title or description, to ensure that assistive technologies can correctly interpret its purpose as supplementary information.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
  },
  {
    name: "NonStruct",
    description:
      "Denotes content that is not assigned a semantic structure, typically used for content that should be ignored in logical reading order.",
    source: "ISO 32000 Section 14.8.4.4",
    namespace: ["1.7", "2.0"],
    type: ["grouping"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'NonStruct' element in Well-Tagged PDF is used for content that does not have a defined semantic structure or does not fit into the standard structure elements. It provides a way to include content without imposing artificial structure.",
        requirements:
          "For Well-Tagged PDF, the 'NonStruct' element should be minimized and only used when necessary. It must be clearly marked to indicate that the content does not conform to a specific semantic role, aiding content reusability.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the use of 'NonStruct' is discouraged because it undermines accessibility. However, if unavoidable, it must be supplemented with appropriate alternative text or annotations.",
        requirements:
          "PDF/UA requires that any content marked as 'NonStruct' be accompanied by compensatory information to ensure that assistive technologies can convey the content’s purpose. Its use should be limited to non-essential or decorative content.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
  },
  {
    name: "P",
    description:
      "Represents a paragraph, grouping together block-level text content and establishing a basic unit of prose.",
    source: "ISO 32000 Section 14.8.4.5",
    namespace: ["1.7", "2.0"],
    type: ["block"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'P' element represents a paragraph in Well-Tagged PDF. It is fundamental for organizing text content into readable blocks and supports content extraction and reflow.",
        requirements:
          "For Well-Tagged PDF, the 'P' element must be used to enclose blocks of text that constitute a paragraph. Proper nesting within higher-level structure elements is required to maintain logical reading order and facilitate reusability.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'P' element is crucial for denoting paragraphs and ensuring that text is accessible. It plays a key role in defining the document’s reading order.",
        requirements:
          "PDF/UA mandates that each paragraph is encapsulated within a 'P' element that is properly tagged and nested. It must include appropriate language and alternative text where necessary to support screen readers and other assistive technologies.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
    useCases: [
      {
        description: "",
        sample: `<P>content of the paragraph</P>`,
      },
    ],
  },
  {
    name: "Hn",
    description:
      "A generic heading element used when a specific heading level (such as H1–H6) is not applicable, often role-mapped to standard headings.",
    source: "ISO 32000 Section 14.8.4.5",
    namespace: ["2.0"],
    type: ["block"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'Hn' element in Well-Tagged PDF is used as a generic heading element where 'n' represents the level. It provides a flexible mechanism to denote hierarchical headings without being restricted to fixed levels.",
        requirements:
          "For Well-Tagged PDF, 'Hn' should be used with a clear level indicator, ensuring that the document’s structure tree correctly reflects the hierarchy of content. The level number should accurately represent the logical importance and nesting of the heading.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, headings are critical for navigation by assistive technologies. 'Hn' is used to indicate headings at various levels, helping to establish the document’s outline and reading order.",
        requirements:
          "PDF/UA requires that each heading tagged with 'Hn' is assigned a level that reflects its position in the hierarchy, and that it is accompanied by associated text (such as a title) that clearly describes the section. This ensures that screen readers can effectively navigate and announce the heading structure.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
    useCases: [
      {
        description: "In a single paragraph",
        sample: `<H1>The Mothers [e.g. huge, bold typeface <Span>Fillmore East - June 1971</Span></H1>`,
      },
      {
        description: "In two paragraphs",
        sample: `<Document>
  <H1>The Mothers</H1>
  <P>Fillmore East - June 1971</P>
</Document>
        `,
      },
    ],
  },
  {
    name: "H",
    description:
      "A generic heading element used to label sections of a document. Specific heading levels (H1–H6) provide hierarchical context.",
    source: "ISO 32000 Section 14.8.4.5",
    namespace: ["1.7", "2.0"],
    type: ["block"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'H' element in Well-Tagged PDF serves as a general heading element when a specific level is not defined. It groups header content without enforcing a particular hierarchy.",
        requirements:
          "For Well-Tagged PDF, 'H' should be used when the heading level is either unknown or irrelevant to the document’s reuse. It must still be properly nested within the structure tree to maintain logical content grouping.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, precise heading levels are preferred to support accessibility. However, if a heading does not have a defined level, the generic 'H' element may be used as a fallback.",
        requirements:
          "PDF/UA recommends that authors use specific heading levels (e.g., H1, H2, etc.), but if 'H' is used, it should be accompanied by additional metadata or context to ensure that assistive technologies can interpret its role within the document structure.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
  },
  {
    name: "Title",
    description:
      "Specifies a title for an article, section, or the entire document, serving as a concise descriptor of the content.",
    source: "ISO 32000 Section 14.8.4.5",
    namespace: ["2.0"],
    type: ["grouping", "block"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'Title' element in Well-Tagged PDF identifies the title of a section or the document as a whole. It is used to enhance the reusability and clarity of content by explicitly marking title information.",
        requirements:
          "For Well-Tagged PDF, the 'Title' element should be clearly associated with the content it describes, and be placed in an appropriate location within the structure tree. It must be unambiguous and consistent across the document to support content extraction and repurposing.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'Title' element is essential for accessibility as it provides a concise and descriptive label for sections or the entire document. This aids users in quickly understanding the content’s focus.",
        requirements:
          "PDF/UA mandates that every significant section should have a 'Title' element that is properly tagged and clearly conveys the purpose or subject of the section. The title should be presented in a way that is easily accessible by assistive technologies.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
  },
  {
    name: "FENote",
    description:
      "Denotes a note associated with form elements, providing additional instructions or context for form fields.",
    source: "ISO 32000 Section 14.8.4.5",
    namespace: ["2.0"],
    type: ["grouping", "block", "inline"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'FENote' element in Well-Tagged PDF is used to represent footnotes or endnotes that provide additional commentary or references related to the main content.",
        requirements:
          "For Well-Tagged PDF, 'FENote' should be clearly linked to the corresponding reference points within the text. It must be properly integrated into the structure tree to allow for accurate extraction and reflow of both the main content and the notes.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'FENote' element supports accessibility by ensuring that supplementary information, such as footnotes or endnotes, is available in a structured and navigable format.",
        requirements:
          "PDF/UA requires that 'FENote' elements are tagged with appropriate associations to the content they annotate, including clear labels and, if necessary, alternate text. This enables assistive technologies to correctly present the notes in relation to the main content.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
  },
  {
    name: "Sub",
    description:
      "Specifies subscript text, used in expressions like mathematical formulas or chemical notations where text is set below the baseline.",
    source: "ISO 32000 Section 14.8.4.6",
    namespace: ["2.0"],
    type: ["inline"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'Sub' element is used to denote subscript text in Well-Tagged PDF. It indicates that the enclosed text should be rendered lower than the baseline, typically for scientific, mathematical, or chemical notations.",
        requirements:
          "It must be properly nested within the inline structure and should clearly convey its role as subscript, ensuring that content extraction and reflow processes recognize the altered baseline.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'Sub' element signifies subscript text, which is important for accurately representing content like formulas or annotations in an accessible manner.",
        requirements:
          "Each 'Sub' element must be tagged so that assistive technologies can interpret it correctly, preserving the semantic relationship between the subscript and its associated content.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
  },
  {
    name: "Lbl",
    description:
      "Represents a label within a list item, used to denote or number the item, such as a bullet or numeric identifier.",
    source: "ISO 32000 Section 14.8.4.7",
    namespace: ["1.7", "2.0"],
    type: ["inline"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'Lbl' element in Well-Tagged PDF is used to define label text that typically serves as a descriptor for form controls or other interactive elements.",
        requirements:
          "It should be clearly associated with the element it labels and correctly nested in the structure tree to maintain logical relationships for content extraction and reflow.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, 'Lbl' is essential for providing accessible labels that help users identify and understand the purpose of associated interactive elements.",
        requirements:
          "Labels must be explicitly tagged with 'Lbl' and include alternative text or descriptions if needed, ensuring assistive technologies can convey the correct meaning to the user.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
    useCases: [
      {
        description: "Bullet list",
        sample: `<L>
  <LI>
      <Lbl>bullet</Lbl>
      <LBody>content</LBody>
  </LI>
</L>`,
      },
      {
        description: "Numbered list",
        sample: `<L>
  <LI>
      <Lbl>list item number</Lbl>
      <LBody>content</LBody>
  </LI>
</L>`,
      },
      {
        description: "Table of Contents",
        sample: `<TOC>
  <TOCI>
  <Lbl>chapter number</Lbl>
  <P>content</P>
  </TOCI>
</TOC>`,
      },
      {
        description: "Labels in notes",
        sample: `<P>
  <Reference>
    <Lbl>bullet</Lbl>
  </Reference>
  <Note>
    <Lbl>bullet</Lbl>
    <P>content</P>
  </Note>
</P>`,
      },
    ],
  },
  {
    name: "Span",
    description:
      "A generic inline [container](https://pdfa.org/glossary-of-accessibility-terminology-in-pdf/#container) that groups text or other inline elements without imparting any additional semantic meaning.",
    source: "ISO 32000 Section 14.8.4.7",
    namespace: ["1.7", "2.0"],
    type: ["inline"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'Span' element serves as a generic inline [container](https://pdfa.org/glossary-of-accessibility-terminology-in-pdf/#container) in Well-Tagged PDF for grouping text or other inline elements that do not have a more specific semantic role.",
        requirements:
          "It should be used when no other specialized element is appropriate, ensuring that all inline content is properly encapsulated and logically structured.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, 'Span' provides a fallback for inline grouping when no other semantic element is applicable, supporting a coherent reading order.",
        requirements:
          "Usage of 'Span' should be minimized in favor of more specific tags, but when used, it must be clearly defined within the structure tree to maintain accessibility.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
    useCases: [
      {
        description: "",
        sample: `<P>
  This is the 
  <Span expanded="National Aeronautics and Space Administration">NASA</Span>
  press release.
</P>`,
      },
    ],
  },
  {
    name: "Em",
    description:
      "Marks text that should be emphasized, conveying a stress or subtle change in meaning from the surrounding content.",
    source: "ISO 32000 Section 14.8.4.7",
    namespace: ["2.0"],
    type: ["inline"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'Em' element indicates emphasized text in Well-Tagged PDF, often rendered in italics to denote a change in tone or to highlight important information.",
        requirements:
          "It should be used to enclose text that requires emphasis, ensuring that its semantic meaning is preserved during content extraction and reflow.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'Em' element is critical for conveying emphasis in a way that assistive technologies can interpret, thus enhancing content accessibility.",
        requirements:
          "All emphasized text should be wrapped in an 'Em' element and properly nested within the structure tree, allowing screen readers to convey the intended emphasis.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
  },
  {
    name: "Strong",
    description:
      "Denotes text that requires strong emphasis, typically indicating important or high-impact content.",
    source: "ISO 32000 Section 14.8.4.7",
    namespace: ["2.0"],
    type: ["inline"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'Strong' element in Well-Tagged PDF denotes text of strong importance, often rendered in bold, to signal a high degree of emphasis.",
        requirements:
          "It must be used to clearly distinguish critical or important text within the document. The element should be correctly nested within the structure tree to support accurate reflow and extraction.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, 'Strong' conveys strong emphasis or importance and plays a vital role in structuring content for accessibility.",
        requirements:
          "The 'Strong' element must be consistently applied to important text to ensure that assistive technologies can effectively communicate the significance of the content to users.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
  },
  {
    name: "Link",
    description:
      "Defines a hyperlink or reference to other content, either within the document or to an external resource.",
    source: "ISO 32000 Section 14.8.4.7",
    namespace: ["1.7", "2.0"],
    type: ["grouping", "block", "inline"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'Link' element in Well-Tagged PDF represents interactive hypertext links. It is used to associate clickable areas with actions or destinations within the document or external resources.",
        requirements:
          "Links must include clearly defined actions or destinations, and be accurately embedded within the structure tree to ensure they function properly during content extraction and reflow.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'Link' element is crucial for accessibility, as it provides interactive navigation for users. It ensures that links are both visible and operable by assistive technologies.",
        requirements:
          "Each 'Link' element must have an associated action or destination, and include alternate text or descriptions if necessary, to facilitate navigation for users with disabilities.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
    useCases: [
      {
        description: "",
        sample: ``,
      },
    ],
  },
  {
    name: "Annot",
    description:
      "Represents an annotation that adds interactive features such as comments, links, or multimedia elements to the document.",
    source: "ISO 32000 Section 14.8.4.7",
    namespace: ["1.7", "2.0"],
    type: ["grouping", "block", "inline"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'Annot' element in Well-Tagged PDF is used to represent annotations attached to the document content, such as comments, highlights, or other interactive notes.",
        requirements:
          "Annotations should be clearly linked to the content they reference and properly nested within the structure tree to allow for accurate content extraction and reflow.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'Annot' element ensures that annotations are accessible by providing additional context or interactive features in a structured manner.",
        requirements:
          "Annotations must include alternative text and be tagged so that assistive technologies can read and interpret them, ensuring non-disruptive supplemental information.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
    useCases: [
      {
        description: "",
        sample: ``,
      },
    ],
  },
  {
    name: "Form",
    description:
      "Encapsulates interactive form elements, allowing for user input and data collection within the PDF.",
    source: "ISO 32000 Section 14.8.4.7",
    namespace: ["1.7", "2.0"],
    type: ["grouping", "block", "inline"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'Form' element in Well-Tagged PDF represents interactive form fields and related objects, grouping them into a cohesive structure.",
        requirements:
          "Form elements should be properly grouped and associated with corresponding labels and actions. They must be accurately reflected in the structure tree to support interactivity and content reuse.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'Form' element is crucial for accessibility in interactive documents, ensuring that form controls are identifiable and operable by assistive technologies.",
        requirements:
          "All form fields must be tagged with clear labels and interactive actions defined, with additional metadata provided where necessary to guide users with disabilities.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
  },
  {
    name: "Ruby",
    description:
      "Represents a ruby annotation that provides pronunciation or other linguistic hints alongside the base text, commonly used in East Asian typography.",
    source: "ISO 32000 Section 14.8.4.7",
    namespace: ["1.7", "2.0"],
    type: ["inline"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'Ruby' element in Well-Tagged PDF is used for ruby annotations, typically providing phonetic guides or supplementary pronunciation information for base text in East Asian languages.",
        requirements:
          "Ruby annotations should be clearly associated with the base text and correctly nested within the text flow to support proper content extraction and reflow.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'Ruby' element ensures that supplementary reading aids, such as furigana, are accessible, clarifying pronunciation and meaning for users.",
        requirements:
          "Ruby elements must be properly tagged and include associated metadata to allow assistive technologies to present the annotations in context.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
  },
  {
    name: "RB",
    description:
      "Defines the base text element within a ruby annotation, representing the main text to which the annotation applies.",
    source: "ISO 32000 Section 14.8.4.7",
    namespace: ["1.7", "2.0"],
    type: ["inline"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'RB' (Ruby Base) element in Well-Tagged PDF identifies the base text that is being annotated with ruby text.",
        requirements:
          "It should encapsulate the main text to which the ruby annotation applies, and must be clearly nested within the corresponding Ruby element.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'RB' element is essential for linking the primary text with its ruby annotation, ensuring that the relationship is clear to assistive technologies.",
        requirements:
          "The 'RB' element must be tagged in conjunction with its corresponding 'RT' element, clearly distinguishing the base text for accessible rendering.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
  },
  {
    name: "RT",
    description:
      "Specifies the ruby text element that provides supplementary pronunciation or annotation information for the associated base text.",
    source: "ISO 32000 Section 14.8.4.7",
    namespace: ["1.7", "2.0"],
    type: ["inline"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'RT' (Ruby Text) element in Well-Tagged PDF contains the annotation text that provides phonetic or supplementary information related to the base text.",
        requirements:
          "It should be properly nested within a Ruby element and clearly linked to its corresponding RB element to support accurate reflow and extraction.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'RT' element delivers essential supplementary information for ruby annotations, enhancing the accessibility of the content by clarifying pronunciation or meaning.",
        requirements:
          "The 'RT' element must be clearly associated with its corresponding 'RB' element and include alternative text where necessary to support assistive technologies.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
  },
  {
    name: "RP",
    description:
      "Provides fallback punctuation or parentheses for ruby annotations when the ruby text cannot be rendered.",
    source: "ISO 32000 Section 14.8.4.7",
    namespace: ["1.7", "2.0"],
    type: ["inline"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'RP' (Ruby Parenthesis) element in Well-Tagged PDF is used to enclose fallback characters (such as parentheses) that may be rendered if the ruby text is not displayed.",
        requirements:
          "It should be used in conjunction with Ruby annotations to indicate grouping of fallback punctuation, ensuring visual consistency during content extraction.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'RP' element supports accessibility by providing fallback cues for ruby annotations, ensuring that the relationship between base text and annotation is maintained.",
        requirements:
          "The 'RP' element must be tagged with appropriate alternative text if needed, so that assistive technologies can convey its function when ruby annotations are not directly rendered.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
  },
  {
    name: "Warichu",
    description:
      "Denotes inline annotations or side comments that appear in a smaller type, typically used to offer additional explanation or commentary, especially in Japanese typography.",
    source: "ISO 32000 Section 14.8.4.7",
    namespace: ["1.7", "2.0"],
    type: ["inline"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'Warichu' element in Well-Tagged PDF is used to denote interlinear annotations typically found in East Asian texts. It provides supplemental commentary or pronunciation guides in a reduced size, positioned adjacent to the main text.",
        requirements:
          "It should be clearly associated with the corresponding base text and properly nested within the structure tree to ensure accurate content extraction and reflow.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'Warichu' element ensures that supplementary annotations are accessible, allowing users to access additional information, such as pronunciation or commentary, in a structured manner.",
        requirements:
          "It must be tagged with clear associations to its base text and include alternative text if needed, so that assistive technologies can interpret and relay the annotation effectively.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
  },
  {
    name: "WT",
    description:
      "Represents the primary text content within a warichu annotation, conveying the main annotation message.",
    source: "ISO 32000 Section 14.8.4.7",
    namespace: ["1.7", "2.0"],
    type: ["inline"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'WT' element in Well-Tagged PDF encapsulates the annotation text of a Warichu, delivering the actual content of the interlinear note.",
        requirements:
          "It should be nested within a 'Warichu' element and clearly defined to maintain the relationship between the base text and the annotation, ensuring consistent reflow.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'WT' element provides the accessible annotation text for Warichu annotations, enabling assistive technologies to present supplementary information accurately.",
        requirements:
          "The element must be directly associated with its corresponding 'Warichu' element and include any necessary alternative descriptions for clarity.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
  },
  {
    name: "WP",
    description:
      "Specifies punctuation or separators within a warichu annotation, used to delineate different parts of the annotation.",
    source: "ISO 32000 Section 14.8.4.7",
    namespace: ["1.7", "2.0"],
    type: ["inline"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'WP' element in Well-Tagged PDF denotes the parenthetical characters or markers associated with a Warichu annotation, acting as visual cues.",
        requirements:
          "It should be used in conjunction with Warichu annotations to group fallback punctuation, ensuring visual consistency if the annotation text is not rendered.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'WP' element supports accessibility by providing additional contextual markers for Warichu annotations.",
        requirements:
          "It must be tagged appropriately, with any necessary alternative text, to allow assistive technologies to convey its function alongside the main annotation content.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
  },
  {
    name: "L",
    description:
      "Represents a list structure that groups together a sequence of semantically related items.",
    source: "ISO 32000 Section 14.8.4.8",
    namespace: ["1.7", "2.0"],
    type: ["block", "inline"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'L' element in Well-Tagged PDF represents the [container](https://pdfa.org/glossary-of-accessibility-terminology-in-pdf/#container) for a list. It groups together all list items, establishing the overall structure of a list.",
        requirements:
          "It must enclose all 'LI' elements and be correctly nested within the document's structure tree to maintain the logical grouping and order of list content.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'L' element is used to denote a list, providing a clear and navigable structure for a sequence of items.",
        requirements:
          "It should be tagged to accurately represent the list structure and may be supplemented with descriptive metadata to aid assistive technologies.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
    useCases: [
      {
        description: "A simple list",
        sample: `<L>
  <Caption>text</Caption>
  <LI>text</LI>
  <LI>
    <Lbl>bullet</Lbl>
    <LBody>text</LBody>
  </LI>
</L>`,
      },
      {
        description: "A canonical multilevel list)",
        sample: `<L>
  <LI>
    <Lbl>text</Lbl>
    <LBody>text</LBody>
  </LI>
  <LI>
    <Lbl>text</Lbl>
    <LBody>text</LBody>
  </LI>
  <L>
    <LI>
      <Lbl>text</Lbl>
      <LBody>text</LBody>
    </LI>
    <LI>
      <Lbl>text</Lbl>
      <LBody>text</LBody>
    </LI>
    <LI>
      <Lbl>text</Lbl>
      <LBody>text</LBody>
    </LI>
  </L>
</L>`,
      },
      {
        description: "A list containing another, semantically unrelated list",
        sample: `<L>
  <LI>
    <Lbl>text</Lbl>
    <LBody>text</LBody>
  </LI>
  <LI>
    <Lbl>text</Lbl>
    <LBody>
      <P>text</P>
      <P>text</P>
      <L>
        <LI>
          <Lbl>text</Lbl>
          <LBody>text</LBody>
        </LI>
        <LI>
          <Lbl>text</Lbl>
          <LBody>text</LBody>
        </LI>
      </L>
      <P>text</P>
    </LBody>
  </LI>
  <LI>
    <Lbl>text</Lbl>
    <LBody>text</LBody>
  </LI>
</L>`,
      },
    ],
  },
  {
    name: "LI",
    description:
      "Defines an individual list item within a list, containing specific content or a discrete entry.",
    source: "ISO 32000 Section 14.8.4.8",
    namespace: ["1.7", "2.0"],
    type: ["block", "inline"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'LI' element in Well-Tagged PDF denotes an individual list item within a list. It encapsulates the content of each item.",
        requirements:
          "Each 'LI' should be clearly tagged and maintain its sequential order within the list [container](https://pdfa.org/glossary-of-accessibility-terminology-in-pdf/#container) to support correct content reflow and extraction.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'LI' element ensures that each item in a list is accessible and presented in the correct reading order.",
        requirements:
          "It must be tagged with any necessary alternative text or descriptors to clarify its content for assistive technologies.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
    useCases: [
      {
        description: "A simple list",
        sample: `<L>
  <Caption>text</Caption>
  <LI>text</LI>
  <LI>
    <Lbl>bullet</Lbl>
    <LBody>text</LBody>
  </LI>
</L>`,
      },
      {
        description: "A canonical multilevel list)",
        sample: `<L>
  <LI>
    <Lbl>text</Lbl>
    <LBody>text</LBody>
  </LI>
  <LI>
    <Lbl>text</Lbl>
    <LBody>text</LBody>
  </LI>
  <L>
    <LI>
      <Lbl>text</Lbl>
      <LBody>text</LBody>
    </LI>
    <LI>
      <Lbl>text</Lbl>
      <LBody>text</LBody>
    </LI>
    <LI>
      <Lbl>text</Lbl>
      <LBody>text</LBody>
    </LI>
  </L>
</L>`,
      },
      {
        description: "A list containing another, semantically unrelated list",
        sample: `<L>
  <LI>
    <Lbl>text</Lbl>
    <LBody>text</LBody>
  </LI>
  <LI>
    <Lbl>text</Lbl>
    <LBody>
      <P>text</P>
      <P>text</P>
      <L>
        <LI>
          <Lbl>text</Lbl>
          <LBody>text</LBody>
        </LI>
        <LI>
          <Lbl>text</Lbl>
          <LBody>text</LBody>
        </LI>
      </L>
      <P>text</P>
    </LBody>
  </LI>
  <LI>
    <Lbl>text</Lbl>
    <LBody>text</LBody>
  </LI>
</L>`,
      },
    ],
  },
  {
    name: "LBody",
    description:
      "Encapsulates the body content of a list item, providing detailed descriptive content associated with the label.",
    source: "ISO 32000 Section 14.8.4.8",
    namespace: ["1.7", "2.0"],
    type: ["block", "inline"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'LBody' element in Well-Tagged PDF serves as a [container](https://pdfa.org/glossary-of-accessibility-terminology-in-pdf/#container) for the main content of a list, grouping all list items together.",
        requirements:
          "It should be used to enclose the 'LI' elements within a list, ensuring that the overall list structure is maintained for content extraction and reflow.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'LBody' element supports accessibility by organizing the body of a list, allowing assistive technologies to navigate the list as a coherent unit.",
        requirements:
          "It must be properly tagged and associated with the list [container](https://pdfa.org/glossary-of-accessibility-terminology-in-pdf/#container) to preserve the logical reading order of list items.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
    useCases: [
      {
        description: "A simple list",
        sample: `<L>
  <Caption>text</Caption>
  <LI>text</LI>
  <LI>
    <Lbl>bullet</Lbl>
    <LBody>text</LBody>
  </LI>
</L>`,
      },
      {
        description: "A canonical multilevel list)",
        sample: `<L>
  <LI>
    <Lbl>text</Lbl>
    <LBody>text</LBody>
  </LI>
  <LI>
    <Lbl>text</Lbl>
    <LBody>text</LBody>
  </LI>
  <L>
    <LI>
      <Lbl>text</Lbl>
      <LBody>text</LBody>
    </LI>
    <LI>
      <Lbl>text</Lbl>
      <LBody>text</LBody>
    </LI>
    <LI>
      <Lbl>text</Lbl>
      <LBody>text</LBody>
    </LI>
  </L>
</L>`,
      },
      {
        description: "A list containing another, semantically unrelated list",
        sample: `<L>
  <LI>
    <Lbl>text</Lbl>
    <LBody>text</LBody>
  </LI>
  <LI>
    <Lbl>text</Lbl>
    <LBody>
      <P>text</P>
      <P>text</P>
      <L>
        <LI>
          <Lbl>text</Lbl>
          <LBody>text</LBody>
        </LI>
        <LI>
          <Lbl>text</Lbl>
          <LBody>text</LBody>
        </LI>
      </L>
      <P>text</P>
    </LBody>
  </LI>
  <LI>
    <Lbl>text</Lbl>
    <LBody>text</LBody>
  </LI>
</L>`,
      },
    ],
  },
  {
    name: "Table",
    description:
      "Represents a table structure that organizes content into rows and columns, facilitating tabular presentation.",
    source: "ISO 32000 Section 14.8.4.8",
    namespace: ["1.7", "2.0"],
    type: ["block"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'Table' element in Well-Tagged PDF is used to represent tabular data as a cohesive unit. It organizes rows, columns, and cells to support content extraction and reflow for reuse.",
        requirements:
          "It must encapsulate table components (such as rows and cells) within a clearly defined structure tree. Row and column definitions should be explicit to maintain logical reading order.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'Table' element ensures that tabular data is accessible and navigable by assistive technologies. It plays a critical role in conveying the relationships between cells.",
        requirements:
          "The table must be tagged with clear associations between header and data cells, and any table summary or caption must be provided to support user navigation.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
    useCases: [
      {
        description: "Simple data table, without Headers and IDs",
        sample: `<Table>
  <TR>
    <TD>text</TD>
    <TD>text</TD>
  </TR>
  <TR>
    <TD>text</TD>
    <TD>text</TD>
  </TR>
</Table>`,
      },
      {
        description:
          "More complex table, with headers, additionally structured",
        sample: `<Table>
  <THead>
    <TR>
      <TH xmlns:Table="http://iso.org/pdf/ssn/Table" id="R1C1_Table" Table:Scope="Column">text</TH>
      <TH xmlns:Table="http://iso.org/pdf/ssn/Table" id="R1C2_Table" Table:Scope="Column">text</TH>
    </TR>
  </THead>
  <TBody>
    <TR>
      <TD>text</TD>
      <TD>text</TD>
    </TR>
    <TR>
      <TD xmlns:Table="http://iso.org/pdf/ssn/Table" Table:ColSpan="2">text</TD>
    </TR>
  </TBody>
  <TFoot>
    <TR>
      <TD>text</TD>
      <TD>text</TD>
    </TR>
  </TFoot>
</Table>`,
      },
    ],
  },
  {
    name: "TR",
    description:
      "Defines a table row that groups together table cells in a horizontal line within a table.",
    source: "ISO 32000 Section 14.8.4.8",
    namespace: ["1.7", "2.0"],
    type: ["block"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'TR' element denotes a table row in Well-Tagged PDF, grouping cells horizontally.",
        requirements:
          "Each table row should be enclosed within a 'TR' element, and rows must be maintained in the proper sequential order to preserve the table’s logical structure.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'TR' element defines the boundaries of a table row, which is essential for assistive technologies to interpret the table structure accurately.",
        requirements:
          "Rows must be clearly tagged and linked with their respective header information to support accurate navigation and reading order.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
    useCases: [
      {
        description: "Simple data table, without Headers and IDs",
        sample: `<Table>
  <TR>
    <TD>text</TD>
    <TD>text</TD>
  </TR>
  <TR>
    <TD>text</TD>
    <TD>text</TD>
  </TR>
</Table>`,
      },
      {
        description:
          "More complex table, with headers, additionally structured",
        sample: `<Table>
  <THead>
    <TR>
      <TH xmlns:Table="http://iso.org/pdf/ssn/Table" id="R1C1_Table" Table:Scope="Column">text</TH>
      <TH xmlns:Table="http://iso.org/pdf/ssn/Table" id="R1C2_Table" Table:Scope="Column">text</TH>
    </TR>
  </THead>
  <TBody>
    <TR>
      <TD>text</TD>
      <TD>text</TD>
    </TR>
    <TR>
      <TD xmlns:Table="http://iso.org/pdf/ssn/Table" Table:ColSpan="2">text</TD>
    </TR>
  </TBody>
  <TFoot>
    <TR>
      <TD>text</TD>
      <TD>text</TD>
    </TR>
  </TFoot>
</Table>`,
      },
    ],
  },
  {
    name: "TH",
    description:
      "Represents a table header cell that contains descriptive information for the table’s columns or rows.",
    source: "ISO 32000 Section 14.8.4.8",
    namespace: ["1.7", "2.0"],
    type: ["block"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'TH' element in Well-Tagged PDF represents a table header cell, used to designate header information within a table.",
        requirements:
          "Header cells should be tagged using 'TH' and clearly identified as headers. They should be appropriately nested within a 'TR' and table structure.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'TH' element is critical for conveying the purpose of header cells in a table, which assists users with navigation and comprehension.",
        requirements:
          "Each header cell must include scope or association information to link it with corresponding data cells, ensuring that screen readers can deliver proper context.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
    useCases: [
      {
        description: "Simple data table, without Headers and IDs",
        sample: `<Table>
  <TR>
    <TD>text</TD>
    <TD>text</TD>
  </TR>
  <TR>
    <TD>text</TD>
    <TD>text</TD>
  </TR>
</Table>`,
      },
      {
        description:
          "More complex table, with headers, additionally structured",
        sample: `<Table>
  <THead>
    <TR>
      <TH xmlns:Table="http://iso.org/pdf/ssn/Table" id="R1C1_Table" Table:Scope="Column">text</TH>
      <TH xmlns:Table="http://iso.org/pdf/ssn/Table" id="R1C2_Table" Table:Scope="Column">text</TH>
    </TR>
  </THead>
  <TBody>
    <TR>
      <TD>text</TD>
      <TD>text</TD>
    </TR>
    <TR>
      <TD xmlns:Table="http://iso.org/pdf/ssn/Table" Table:ColSpan="2">text</TD>
    </TR>
  </TBody>
  <TFoot>
    <TR>
      <TD>text</TD>
      <TD>text</TD>
    </TR>
  </TFoot>
</Table>`,
      },
    ],
  },
  {
    name: "TD",
    description:
      "Defines a table data cell containing content that is part of the table’s body.",
    source: "ISO 32000 Section 14.8.4.8",
    namespace: ["1.7", "2.0"],
    type: ["block"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'TD' element denotes a standard table data cell in Well-Tagged PDF, holding the primary content of a table.",
        requirements:
          "Data cells should be correctly nested within a 'TR' element and aligned with their respective header cells to maintain a coherent structure.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'TD' element represents a data cell that must be accessible. It is essential for conveying the table’s content in a way that assistive technologies can interpret.",
        requirements:
          "TD elements must be tagged with proper associations to header cells and include alternative text where necessary to support accessible navigation.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
    useCases: [
      {
        description: "Simple data table, without Headers and IDs",
        sample: `<Table>
  <TR>
    <TD>text</TD>
    <TD>text</TD>
  </TR>
  <TR>
    <TD>text</TD>
    <TD>text</TD>
  </TR>
</Table>`,
      },
      {
        description:
          "More complex table, with headers, additionally structured",
        sample: `<Table>
  <THead>
    <TR>
      <TH xmlns:Table="http://iso.org/pdf/ssn/Table" id="R1C1_Table" Table:Scope="Column">text</TH>
      <TH xmlns:Table="http://iso.org/pdf/ssn/Table" id="R1C2_Table" Table:Scope="Column">text</TH>
    </TR>
  </THead>
  <TBody>
    <TR>
      <TD>text</TD>
      <TD>text</TD>
    </TR>
    <TR>
      <TD xmlns:Table="http://iso.org/pdf/ssn/Table" Table:ColSpan="2">text</TD>
    </TR>
  </TBody>
  <TFoot>
    <TR>
      <TD>text</TD>
      <TD>text</TD>
    </TR>
  </TFoot>
</Table>`,
      },
    ],
  },
  {
    name: "THead",
    description:
      "Defines the header section of a table, containing cells that label the columns or rows and provide context for the table data.",
    source: "ISO 32000 Section 14.8.4.8",
    namespace: ["1.7", "2.0"],
    type: ["block"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'THead' element in Well-Tagged PDF is used to group header rows in a table, providing a clear separation from the table body.",
        requirements:
          "It should enclose all header rows and be distinctly separated from the body ('TBody') and footer ('TFoot') sections to preserve table semantics.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'THead' element enhances accessibility by clearly delineating the header section of a table, which is essential for establishing context.",
        requirements:
          "The header group must be tagged and associated with corresponding data cells, ensuring that assistive technologies can reliably convey the table's structure.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
    useCases: [
      {
        description: "Simple data table, without Headers and IDs",
        sample: `<Table>
  <TR>
    <TD>text</TD>
    <TD>text</TD>
  </TR>
  <TR>
    <TD>text</TD>
    <TD>text</TD>
  </TR>
</Table>`,
      },
      {
        description:
          "More complex table, with headers, additionally structured",
        sample: `<Table>
  <THead>
    <TR>
      <TH xmlns:Table="http://iso.org/pdf/ssn/Table" id="R1C1_Table" Table:Scope="Column">text</TH>
      <TH xmlns:Table="http://iso.org/pdf/ssn/Table" id="R1C2_Table" Table:Scope="Column">text</TH>
    </TR>
  </THead>
  <TBody>
    <TR>
      <TD>text</TD>
      <TD>text</TD>
    </TR>
    <TR>
      <TD xmlns:Table="http://iso.org/pdf/ssn/Table" Table:ColSpan="2">text</TD>
    </TR>
  </TBody>
  <TFoot>
    <TR>
      <TD>text</TD>
      <TD>text</TD>
    </TR>
  </TFoot>
</Table>`,
      },
    ],
  },
  {
    name: "TBody",
    description:
      "Represents the main body of a table, grouping together the rows that contain the primary data entries.",
    source: "ISO 32000 Section 14.8.4.8",
    namespace: ["1.7", "2.0"],
    type: ["block"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'TBody' element groups the main content rows of a table in Well-Tagged PDF. It organizes the bulk of the table’s data.",
        requirements:
          "It must be clearly separated from the header and footer sections, and should encapsulate all standard rows ('TR') containing data cells.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'TBody' element is critical for accessibility as it defines the primary area where data is presented.",
        requirements:
          "It should be tagged distinctly and associated with the table header and footer elements to ensure a consistent reading order for assistive technologies.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
    useCases: [
      {
        description: "Simple data table, without Headers and IDs",
        sample: `<Table>
  <TR>
    <TD>text</TD>
    <TD>text</TD>
  </TR>
  <TR>
    <TD>text</TD>
    <TD>text</TD>
  </TR>
</Table>`,
      },
      {
        description:
          "More complex table, with headers, additionally structured",
        sample: `<Table>
  <THead>
    <TR>
      <TH xmlns:Table="http://iso.org/pdf/ssn/Table" id="R1C1_Table" Table:Scope="Column">text</TH>
      <TH xmlns:Table="http://iso.org/pdf/ssn/Table" id="R1C2_Table" Table:Scope="Column">text</TH>
    </TR>
  </THead>
  <TBody>
    <TR>
      <TD>text</TD>
      <TD>text</TD>
    </TR>
    <TR>
      <TD xmlns:Table="http://iso.org/pdf/ssn/Table" Table:ColSpan="2">text</TD>
    </TR>
  </TBody>
  <TFoot>
    <TR>
      <TD>text</TD>
      <TD>text</TD>
    </TR>
  </TFoot>
</Table>`,
      },
    ],
  },
  {
    name: "TFoot",
    description:
      "Represents the footer section of a table, grouping together table rows that contain summary information, totals, or additional annotations related to the table's content.",
    source: "ISO 32000 Section 14.8.4.8",
    namespace: ["1.7", "2.0"],
    type: ["block"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'TFoot' element in Well-Tagged PDF is used to group footer rows in a table, often containing summary or total information.",
        requirements:
          "Footer rows must be distinctly enclosed within a 'TFoot' element and properly linked to the rest of the table structure.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'TFoot' element aids accessibility by clearly marking the footer portion of a table, which may contain important summary data.",
        requirements:
          "It should be tagged with clear associations and, if applicable, include alternative descriptions to assist users in navigating table summaries.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
    useCases: [
      {
        description: "Simple data table, without Headers and IDs",
        sample: `<Table>
  <TR>
    <TD>text</TD>
    <TD>text</TD>
  </TR>
  <TR>
    <TD>text</TD>
    <TD>text</TD>
  </TR>
</Table>`,
      },
      {
        description:
          "More complex table, with headers, additionally structured",
        sample: `<Table>
  <THead>
    <TR>
      <TH xmlns:Table="http://iso.org/pdf/ssn/Table" id="R1C1_Table" Table:Scope="Column">text</TH>
      <TH xmlns:Table="http://iso.org/pdf/ssn/Table" id="R1C2_Table" Table:Scope="Column">text</TH>
    </TR>
  </THead>
  <TBody>
    <TR>
      <TD>text</TD>
      <TD>text</TD>
    </TR>
    <TR>
      <TD xmlns:Table="http://iso.org/pdf/ssn/Table" Table:ColSpan="2">text</TD>
    </TR>
  </TBody>
  <TFoot>
    <TR>
      <TD>text</TD>
      <TD>text</TD>
    </TR>
  </TFoot>
</Table>`,
      },
    ],
  },
  {
    name: "Caption",
    description:
      "Specifies a caption or title for an element such as a figure or table, providing a brief description of its content.",
    source: "ISO 32000 Section 14.8.4.8",
    namespace: ["1.7", "2.0"],
    type: ["grouping", "block"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'Caption' element in Well-Tagged PDF provides a title or summary for a table, offering context and a brief description.",
        requirements:
          "It must be clearly linked to the table it describes and be positioned appropriately within the structure tree to support content extraction.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'Caption' element is essential for accessibility as it gives users an overview of the table's purpose and content.",
        requirements:
          "Each table should include a 'Caption' element that is clearly tagged and associated with the table, ensuring that assistive technologies can present this summary to users.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
    useCases: [
      {
        description:
          "<Caption> including substructure, i.e. a single caption including two paragraphs",
        sample: `<Document>
  <Figure>
    <Caption>
    <P>content</P>
    <P>content</P>
    </Caption>
  </Figure>
</Document>`,
      },
      {
        description:
          "<Caption> for a table where the <Caption> occurs logically prior to the table itself",
        sample: `<Document>
  <Table>
    <Caption>
      content
    </Caption>
    <TR>
     <TH>
      Header
     </TH>
    </TR>
  </Table>
</Document>`,
      },
      {
        description:
          "<Caption> for a table where the <Caption> occurs logically following the table itself",
        sample: `<Document>
  <Table>
  <TR>
  <TH>
  Header
  </TH>
  </TR>
    <Caption>
      content
    </Caption>
  </Table>
</Document>`,
      },
      {
        description: "<Caption> for a list",
        sample: `<Document>
  <L>
    <Caption>
      content
    </Caption>
    <LI></LI>
    <LI></LI>
  </L>
</Document>`,
      },
    ],
  },
  {
    name: "Figure",
    description:
      "Represents visual content like images, graphs, or charts in a PDF document.",
    source: "ISO 32000 Section 14.8.4.8",
    namespace: ["1.7", "2.0"],
    type: ["grouping", "block", "inline"],
    differences: {
      wellTaggedPDF: {
        description:
          "Includes required structural tagging for figures, plus appropriate alternative or replacement text to support basic reuse and accessibility needs in a PDF. Purely decorative figures are artifacted rather than tagged.",
        requirements:
          "As per Well-Tagged PDF (WTPDF) 1.0, any figure conveying meaning must be enclosed in a Figure structure element with at least one of the following: an Alt property (ISO 32000-2:2020, 14.9.3) or an ActualText property representing the figure’s content. If the figure is decorative or background-only, it should be artifacted. Where captions are used, they shall be tagged with the Caption structure element and placed as the first or last child of the figure’s parent element. All figure content (including background imagery deemed essential) should be enclosed in a single Figure element to accurately represent the real content.",
        source: "Well-Tagged PDF (WTPDF) 1.0, Sections 8.2.5.28 & 8.5",
      },
      pdfUA: {
        description:
          "Strict adherence to PDF/UA-2 requirements for Figures, ensuring meaningful images are fully accessible through text-based descriptions.",
        requirements:
          "Under ISO 14289-2, each Figure structure element must have at least one of the following: an Alt property or an ActualText property representing the image’s content. Purely decorative (background-only) images should be artifacted instead of tagged as Figures. If ActualText is used, the Figure must be enclosed within an appropriate block-level element. ISO 14289-2 also requires that any integral substructure be contained within the same Figure element, so that assistive technologies can programmatically access all visual content and its text equivalents. Additional requirements in Section 8.5 mandate text-based equivalents for all non-text objects, ensuring end-users relying on assistive technologies can interpret the intended meaning or function of each figure.",
        source: "ISO 14289-2:2024 (PDF/UA-2), Sections 8.2.5.28 & 8.5",
      },
    },
    examples: [
      {
        description: "An image",
        source: "ISO 32000 Section 14.8.4.8.5, Table 373",
      },
      {
        description: "A drawing",
        source: "ISO 32000 Section 14.8.4.8.5, Table 373",
      },
      {
        description:
          "A chart, including the text that denotes values on each axis",
        source: "ISO 32000 Section 14.8.4.8.5, Table 373",
      },
      {
        description:
          "An organization chart enclosed by a single Figure structure element that itself contains substructure to describe each subunit of the chart.",
        source: "ISO-14289-2-2024-sponsored.pdf (PDF/UA-2) Section 8.2.5.28.1",
      },
      {
        description:
          "A background image intersecting an image which the author considers to be an intrinsic part of the figure is artifact content in this case",
        source: "ISO-14289-2-2024-sponsored.pdf (PDF/UA-2) Section 8.2.5.28.1",
      },
    ],
    useCases: [
      {
        description: "A <Figure> with a <Caption> following the <Figure>",
        sample: `<Figure>
  [A structure element enclosing an actual image]
  {CONTENT} [The actual image or illustration]
  <Caption>[The Figure’s caption]</Caption>
</Figure>`,
      },
      {
        description: "A <Figure> with a <Caption> preceding the <Figure>",
        sample: ``,
      },
      {
        description: "Multiple <Figure> elements with <Caption>elements",
        sample: ``,
      },
      {
        description: "<Figure> without <Caption>",
        sample: `<Figure>
{CONTENT} [The actual image or illustration]
</Figure>`,
      },
    ],
  },
  {
    name: "Formula",
    description:
      "Encapsulates mathematical expressions or equations, preserving the semantics of technical or scientific formulas.",
    source: "ISO 32000 Section 14.8.4.8",
    namespace: ["1.7", "2.0"],
    type: ["grouping", "block", "inline"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'Formula' element in Well-Tagged PDF represents mathematical expressions or equations within a document, ensuring that they are distinctly identified.",
        requirements:
          "It should include notations or metadata to indicate that the enclosed content is a formula, thereby supporting accurate reflow and extraction of technical content.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'Formula' element makes mathematical content accessible by providing semantic cues and, where necessary, alternative text descriptions for complex expressions.",
        requirements:
          "Formulas must be tagged with additional metadata or alternate representations to ensure that assistive technologies can convey their meaning correctly.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
    useCases: [
      {
        description: "Formula as Text",
        sample: `<Formula> {2 + 2 = 4}</Formula>`,
      },
      {
        description: "Formula as a Figure",
        sample: ``,
      },
    ],
  },
  {
    name: "Artifact",
    description:
      "Denotes content that is non-structural or decorative, such as background graphics or other content not intended to be read in the logical order.",
    source: "ISO 32000 Section 14.8.4.8",
    namespace: ["2.0"],
    type: ["grouping", "block", "inline"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'Artifact' element in Well-Tagged PDF is used for content that is decorative or non-essential to the logical structure. It marks items that should be ignored in content extraction and reflow.",
        requirements:
          "Artifacts must be clearly marked to distinguish them from meaningful content. They should be excluded from the logical reading order to prevent interference with content reusability.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'Artifact' element is critical for accessibility by identifying content that does not contribute to the semantic meaning, such as decorative images or layout markers.",
        requirements:
          "Artifacts must be properly tagged and excluded from the primary reading order, ensuring that assistive technologies can skip them and focus on meaningful content.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
  },
  {
    name: "Art",
    description:
      "Represents an article or self-contained narrative within a larger document. It often includes its own headings and substructure to distinguish it as an independent unit.",
    source: "",
    namespace: ["1.7"],
    type: ["grouping"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'Art' element in Well-Tagged PDF is used to delineate an article or a self-contained narrative unit within a document. It groups content that belongs together as an independent article.",
        requirements:
          "It should be clearly defined and nested within the structure tree with a consistent role, allowing content extraction and reflow of individual articles.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'Art' element marks a distinct article segment, facilitating navigation for users of assistive technologies by grouping related content logically.",
        requirements:
          "Each 'Art' element must be tagged with a clear title or label and properly integrated into the document's hierarchical structure to ensure that assistive technologies can identify and navigate individual articles.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
    useCases: [
      {
        description: "",
        sample: `<Part><!-- e.g. category of a magazine -->
  <Art><!-- one article in a category -->
    <H1>[main content of the article]</H1>
    <P>text</P>
      <Sect><!-- info box content -->
        <P>text</P>
        <Div lang="de-DE"><!-- passage of foreign language content, where a Lang attribute is assigned to &lt;Div&gt; -->
          <P>text</P>
          <P>text</P>
        </Div>
      </Sect>
  </Art>
  <!-- More <Art> elements can be added here -->
</Part>`,
      },
    ],
  },
  {
    name: "BlockQuote",
    description:
      "Identifies a block of content that is quoted from another source, providing both visual and logical separation from the main text.",
    source: "",
    namespace: ["1.7"],
    type: ["grouping"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'BlockQuote' element in Well-Tagged PDF is used to represent extended quotations that are set off from the main text, typically indented or styled differently.",
        requirements:
          "It should be clearly nested within the structure tree and include citation or source information when applicable, ensuring that the quoted material is distinct from the surrounding content.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, 'BlockQuote' facilitates accessibility by clearly marking extended quotations so that users can distinguish them from the main text.",
        requirements:
          "Block quotations must be tagged with clear boundaries and accompanied by attribution details if available, enabling assistive technologies to convey the separation and source of the quoted content.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
    useCases: [
      {
        description: "A block-level quote used as a block level element",
        sample: `<Document>
  <P>content</P>
  <BlockQuote>content</BlockQuote>
  <P>content</P>
</Document>`,
      },
      {
        description:
          "A block-level quote – used as a grouping element – including substructure",
        sample: `<Document>
  <P>content</P>
  <BlockQuote>
    <P>content</P>
    <P>content</P>
  </BlockQuote>
  <P>content</P>
</Document>`,
      },
    ],
  },
  {
    name: "BibEntry",
    description:
      "Represents a bibliographic entry within a list of references, detailing citation information for a source.",
    source: "",
    namespace: ["1.7"],
    type: ["inline"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'BibEntry' element in Well-Tagged PDF denotes a single bibliographic entry, typically used within a bibliography or reference list.",
        requirements:
          "It should include all relevant bibliographic details and be correctly linked within the structure tree to support accurate content extraction and reflow.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'BibEntry' element is essential for making bibliographic information accessible, providing clear and structured citation data for assistive technologies.",
        requirements:
          "Each bibliographic entry must be tagged with descriptive metadata and linked to a reference list or index, ensuring that users can easily navigate and understand citation relationships.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
  },
  {
    name: "Code",
    description:
      "Encapsulates a fragment of computer program text, preserving formatting and indicating that the content is intended as code.",
    source: "",
    namespace: ["1.7"],
    type: ["inline"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'Code' element in Well-Tagged PDF is used to encapsulate programming code or code snippets. It distinguishes code from regular text.",
        requirements:
          "It must preserve formatting and be rendered in a monospaced font, ensuring that indentation and syntax are maintained for accurate content extraction and reflow.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'Code' element ensures that code segments are accessible by providing clear semantic identification, which aids in maintaining the correct reading order.",
        requirements:
          "Code blocks should be tagged with additional metadata or alternative text if necessary, to assist users in understanding the programming content through assistive technologies.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
  },
  {
    name: "Index",
    description:
      "Defines an index that lists terms or topics along with references to their occurrences in the document, facilitating quick lookup.",
    source: "",
    namespace: ["1.7"],
    type: ["grouping"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'Index' element in Well-Tagged PDF is used to represent an index that organizes key terms and topics for easy reference.",
        requirements:
          "It should be structured logically within the document's structure tree, allowing for clear association between index terms and corresponding content locations.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'Index' element helps users navigate documents by providing an accessible list of terms linked to relevant sections.",
        requirements:
          "Indexes must be tagged with clear hierarchical relationships and include alternative text if necessary, ensuring assistive technologies can interpret the navigational structure.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
    useCases: [
      {
        description:
          "Index with a nested list as contents, giving more information about relationships",
        sample: `<Index>
  <L><!--index as a list-->
    <LI><!--index topic-->
      <Lbl>[section identifier, e.g. “B”]</Lbl>
      <LBody>
        <L><!--list containing entries relating the topic “B”-->
          <LI>
            <Lbl>[first entry, e.g. “Beer”]</Lbl>
            <LBody>[containing all references]
              <Reference>[first page number, e.g. 20]</Reference>
              <Reference>[second page number, e.g. 22-24]</Reference>
              <Reference>[see also Food]</Reference>
            </LBody>
          </LI>
          <LI>
            <Lbl>[numbering, if available, e.g. “Boy”]</Lbl>
            <LBody>[containing all references]
              <Reference>[first page number, e.g. 28]</Reference>
              <Reference>[second page number, e.g. 29]</Reference>
              <Reference>[see also Girl]</Reference>
            </LBody>
          </LI>
          <LI>[index topic]
            <Lbl>[section identifier, e.g. “C”]</Lbl>
            <LBody>
              <L><!--list containing entries relating the topic “C”-->
                <LI>{…}</LI>
              </L>
            </LBody>
          </LI>
        </L>
      </LBody>
    </LI>
  </L>
</Index>`,
      },
      {
        description: "Without alphabetical structure",
        sample: `<Index>
  <L><!--index as a list-->
    <LI><!--index topic-->
      <Lbl>[section identifier, e.g. “B”]</Lbl>
      <LBody>
        <L><!--list containing entries relating the topic “B”-->
          <LI>
            <Lbl>[first entry, e.g. “Beer”]</Lbl>
            <LBody>[containing all references]
              <Reference>[first page number, e.g. 20]</Reference>
              <Reference>[second page number, e.g. 22-24]</Reference>
              <Reference>[see also Food]</Reference>
            </LBody>
          </LI>
          <LI>
            <Lbl>[numbering, if available, e.g. “Boy”]</Lbl>
            <LBody>[containing all references]
              <Reference>[first page number, e.g. 28]</Reference>
              <Reference>[second page number, e.g. 29]</Reference>
              <Reference>[see also Girl]</Reference>
            </LBody>
          </LI>
          <LI>[index topic]
            <Lbl>[section identifier, e.g. “C”]</Lbl>
            <LBody>
              <L><!--list containing entries relating the topic “C”-->
                <LI>{…}</LI>
              </L>
            </LBody>
          </LI>
        </L>
      </LBody>
    </LI>
  </L>
</Index>`,
      },
    ],
  },
  {
    name: "Note",
    description:
      "Contains supplementary or explanatory information such as footnotes or endnotes, adding context to the main content.",
    source: "",
    namespace: ["1.7"],
    type: ["inline"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'Note' element in Well-Tagged PDF is used for annotations or side comments that provide additional information about the main text.",
        requirements:
          "Notes should be clearly connected to the relevant content and properly nested within the structure tree, enabling them to be excluded from the primary reading order if required.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'Note' element is crucial for making supplementary commentary accessible, ensuring that extra information is available to users through assistive technologies.",
        requirements:
          "Each note must include alternative text or descriptive metadata to explain its purpose, and be clearly associated with the related content within the structure tree.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
    useCases: [
      {
        description: "Footnote tagged inline",
        sample: `<P>
  <Reference>
    <Lbl>bullet</Lbl>
  </Reference>
  <Note>
    <Lbl>bullet</Lbl>
    <P>content</P>
  </Note>
</P>`,
      },
    ],
  },
  {
    name: "Private",
    description:
      "A grouping element for content specific to the producing application. Its semantic significance is undefined and may be ignored by processors.",
    source: "",
    namespace: ["1.7"],
    type: ["grouping"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'Private' element in Well-Tagged PDF is used for custom or proprietary content that does not conform to standard semantic elements. It allows for the inclusion of non-standard content.",
        requirements:
          "Its use should be minimized and clearly documented. When employed, it must be encapsulated within the structure tree with explicit definitions to prevent interference with content extraction.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, 'Private' elements are discouraged because they can hinder accessibility. If used, they must be supplemented with standard tags or alternative descriptions.",
        requirements:
          "Any private elements must include compensatory information to ensure that assistive technologies can interpret the content accurately.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
  },
  {
    name: "Quote",
    description:
      "Encapsulates a block or inline quotation, preserving the exact wording of text taken from another source.",
    source: "",
    namespace: ["1.7"],
    type: ["inline"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'Quote' element in Well-Tagged PDF is used to designate inline or block quotations, distinguishing them from the main text.",
        requirements:
          "It should be clearly marked with proper nesting to separate quoted content from the surrounding text. Attribution may be included where applicable.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'Quote' element ensures that quotations are accessible by providing clear boundaries and, if needed, additional descriptive text to indicate the source.",
        requirements:
          "Quotations must be tagged with appropriate associations and alternative text, ensuring that users can distinguish quoted material from the main content.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
    useCases: [
      {
        description: "A quote within a paragraph",
        sample: `<P>
  some text
  <Quote>quoted text</Quote>
  more text
</P>`,
      },
    ],
  },
  {
    name: "Reference",
    description:
      "Denotes a cross-reference element that links to related content within the document or to external sources for additional information.",
    source: "",
    namespace: ["1.7"],
    type: ["inline"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'Reference' element in Well-Tagged PDF is used for citations and cross-references within a document. It links text to bibliographic entries or external resources.",
        requirements:
          "It should be clearly defined and associated with the related bibliographic or external content, maintaining a coherent structure for content extraction.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'Reference' element enhances accessibility by providing clear navigational cues to cited materials or related content.",
        requirements:
          "References must be tagged with descriptive metadata and linked accurately within the structure tree to facilitate navigation by assistive technologies.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
    useCases: [
      {
        description: "Usage within a paragraph",
        sample: `<P>
  [content]
  <Reference>[content of reference, e.g. "1"]</Reference>
  possible more content
</P>`,
      },
      {
        description: "Usage within a <TOC>)",
        sample: `<TOC>
  <TOCI>
    <Reference>The content of a headline</Reference>
  </TOCI>
</TOC>`,
      },
    ],
  },
  {
    name: "TOC",
    description:
      "Represents a table of contents that lists the major sections or topics of the document, serving as an entry point for navigation.",
    source: "",
    namespace: ["1.7"],
    type: ["grouping"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'TOC' element in Well-Tagged PDF represents a Table of Contents, outlining the major sections of the document.",
        requirements:
          "It must be structured with links or references to corresponding sections and integrated within the overall structure tree to support content reflow and extraction.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'TOC' element is critical for navigation, providing an accessible summary of the document's structure.",
        requirements:
          "The table of contents must include clear headings, navigational links, and alternative text descriptions so that assistive technologies can easily guide users through the document.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
    useCases: [
      {
        description:
          "Top-level structures usage of <TOC> & <TOCI> in a multilevel table of contents",
        sample: `<TOC>
  <TOCI><P>Chapter 1</P></TOCI>
  <TOCI><P>Chapter 2</P></TOCI>
  <TOC>
    <TOCI><P>Chapter 2.1</P></TOCI>
    <TOCI><P>Chapter 2.2</P></TOCI>
  </TOC>
</TOC>`,
      },
      {
        description:
          "Substructures in a <TOC> & <TOCI> context containing <Reference> without a link",
        sample: `<TOC>
  <TOCI>
    <P>
      <Reference>
        <Lbl>[In cases where the TOCI is numbered] 1.</Lbl>
        <Span>Introduction .................. page 5</Span>
      </Reference>
    </P>
  </TOCI>
</TOC>`,
      },
      {
        description:
          "Substructures in a <TOC> & <TOCI> context containing <Reference> & <Link>",
        sample: ``,
      },
    ],
  },
  {
    name: "TOCI",
    description:
      "Denotes an individual entry within a table of contents, linking to a specific section or topic in the document.",
    source: "",
    namespace: ["1.7"],
    type: ["grouping"],
    difference: {
      wellTaggedPDF: {
        description:
          "The 'TOCI' element in Well-Tagged PDF is an interactive Table of Contents that not only lists document sections but also provides clickable links for navigation.",
        requirements:
          "It should be fully integrated into the structure tree with active, clearly defined links that allow for dynamic navigation and content reflow.",
        source: "Well-Tagged PDF (WTPDF) 1.0",
      },
      pdfUA: {
        description:
          "In PDF/UA, the 'TOCI' element ensures that the interactive table of contents is accessible. It must support keyboard navigation and be fully tagged so that assistive technologies can activate the links.",
        requirements:
          "Interactive TOC entries must include descriptive labels and proper associations to the corresponding sections, ensuring a seamless navigational experience for users with disabilities.",
        source: "PDF/UA-1 and PDF/UA-2 Standards",
      },
    },
  },
];

export default tags;
