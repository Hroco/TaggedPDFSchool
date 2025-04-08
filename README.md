# Tagged PDF School

Welcome to the Tagged PDF School project! This project aims to provide educational resources for creating and working with tagged PDFs. Tagged PDFs are essential for accessibility, ensuring that documents are readable by screen readers and other assistive technologies.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Assets Folder](#assets-folder)
- [Contributing](#contributing)
- [License](#license)
- [Contributors](#contributors)

## Introduction

Tagged PDF School is designed to help developers and content creators understand the importance of tagged PDFs and how to create them. This project includes tutorials, tools, and resources to make the process easier.

## Features

- Comprehensive tutorials on creating tagged PDFs
- Best practices for accessibility
- Tools for validating and generating tagged PDF structures
- Hierarchy generator for managing tag relationships

## Installation

To get started with Tagged PDF School, clone the repository and install the necessary dependencies:

```bash
git clone https://github.com/yourusername/tagged-pdf-school.git
cd tagged-pdf-school
npm install
```

## Usage

### Running the Development Server

To start the development server, run:

```bash
npm run dev
```

This will start the application on `http://localhost:3000`.

### Building for Production

To build the application for production, use:

```bash
npm run build
```

### Running the Production Server

After building, you can start the production server with:

```bash
npm start
```

### Docker Deployment

The application is dockerized for production. To build and run the Docker container locally:

```bash
docker build -t tagged-pdf-school .
docker run -p 3000:3000 tagged-pdf-school
```

## Technologies Used

### Development Framework
- The application is developed using the **Next.js** framework with **TypeScript**.

### User Interface
- The UI leverages **shadcn components** and **Tailwind CSS** for styling and component design.

### PDF Validation
- For PDF validation, the application uses a "C" code implementation of the **RNV validator**, which utilizes a schema developed by David Carlisle. The schema repository can be found here: [https://github.com/latex3/pdf_structure](https://github.com/latex3/pdf_structure).
- This code is built in a Docker container during the production deployment process.

### Hierarchy Generator
- A Python script named `mega-table.py` is used to generate JSON data containing each tag and its child and parent relationships from an Excel sheet.

### Deployment
- The application is deployed on Google Cloud in a Docker container under the account `samuel.hrotik@gmail.com`.
- When there is a push to the production branch, the application is automatically dockerized and deployed.

## Project Structure

The project is organized as follows:

- **src/**: Contains the main application code, including pages, components, and API routes.
- **assets/**: Includes static assets such as JSON databases and temporary files.
- **lib/**: Contains utility functions and the RNV validator implementation.
- **styles/**: Global CSS styles.
- **hierarchyGenerator/**: Scripts and resources for generating tag hierarchies.
- **public/**: Publicly accessible static files.

## Assets Folder

The `assets/` folder is a critical part of the Tagged PDF School project. It contains essential JSON files that act as the database for the application. Below is a detailed explanation of the JSON files and their data structures:

### JSON Files

#### 1. `attributesDB.json`
This file contains data related to attributes used in tagged PDFs. Each attribute is represented as an object with the following structure:

```json
{
  "name": "Attribute Name",
  "description": "Detailed description of the attribute",
  "source": "Source of the attribute (e.g., ISO standard section)",
  "owner": "Owner category of the attribute (e.g., Layout, List, Table)",
  "inheritable": true/false, // Indicates if the attribute is inheritable
  "type": "Type of the attribute (if applicable)",
  "defaultValue": "Default value of the attribute",
  "values": [
    {
      "valueType": "Type of the value (e.g., name, array, number)",
      "values": [
        {
          "name": "Value Name",
          "description": "Description of the value"
        }
      ]
    }
  ],
  "relatedTags": ["Tag1", "Tag2", ...] // Tags associated with the attribute
}
```


This file is essential for defining the attributes and their possible values, which are used throughout the application for tagged PDF generation and validation.

#### 2. `matterhornProtocol.json`
This file defines the Matterhorn protocol used for PDF validation. Each record in the JSON file represents a validation rule and is structured as follows:

```json
{
  "index": "Unique identifier for the rule (e.g., 01-002)",
  "failureCondition": "Description of the condition that causes the rule to fail",
  "section": "Reference to the relevant section in the standard (e.g., UA1:7.1-1)",
  "type": "Type of object the rule applies to (e.g., Object, Element)",
  "how": "Method of validation (e.g., Human, Automated)",
  "see": "Additional references or notes (if any)",
  "relatedTags": ["Tag1", "Tag2", ...] // Tags associated with the rule
}
```

This file is essential for defining the validation rules used to ensure compliance with accessibility standards. Each rule specifies the conditions under which a PDF element may fail validation, along with references to the relevant standards and associated tags.

#### 3. `propertiesDB.json`
This file contains data about properties used in tagged PDFs. Each property is represented as an object with the following structure:

```json
{
  "name": "Property Name",
  "description": "Detailed description of the property",
  "source": "Source of the property (e.g., ISO standard section)",
  "relatedTags": ["Tag1", "Tag2", ...] // Tags associated with the property
}
```

This file is essential for defining the properties and their relationships to tags, which are used throughout the application for tagged PDF generation and validation.

#### 4. `taggsDB.ts`
This file contains data about tags used in the application. Each tag is represented as an object with the following structure:

```typescript
{
  name: "Tag Name",
  description: "Detailed description of the tag",
  source: "Source of the tag (e.g., ISO standard section)",
  namespace: ["Namespace1", "Namespace2", ...], // Applicable namespaces
  type: ["Type1", "Type2", ...], // Types of the tag (e.g., grouping, structural)
  difference: {
    wellTaggedPDF: {
      description: "Description of the tag in Well-Tagged PDF context",
      requirements: "Requirements for using the tag in Well-Tagged PDF",
      source: "Source of the Well-Tagged PDF context"
    },
    pdfUA: {
      description: "Description of the tag in PDF/UA context",
      requirements: "Requirements for using the tag in PDF/UA",
      source: "Source of the PDF/UA context"
    }
  },
  useCases: [
    {
      description: "Description of the use case",
      sample: "Sample XML or code snippet demonstrating the use case"
    }
  ]
}
```

This file is essential for defining the tags and their contexts, which are used throughout the application for tagged PDF generation and validation.

### Importance

These JSON files are essential for the application's functionality. They provide the data required for:

- Generating and validating tagged PDFs.
- Managing attributes, properties, and tags.
- Ensuring compliance with accessibility standards.

Make sure to keep these files updated and backed up, as they are critical to the application's operation.

## Contributing

We welcome contributions from the community! If you have any ideas, suggestions, or improvements, please open an issue or submit a pull request.

### How to Contribute

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes and push the branch to your fork.
4. Open a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contributors

### Main Developer
- **Samuel Hrotik**: Lead developer and creator of the Tagged PDF School project. Responsible for the overall architecture, implementation, and deployment of the application.

### Main Contributor
- **Roman Toda**: PDF Expert and primary contributor. Provided expertise in PDF standards, accessibility, and validation processes.
