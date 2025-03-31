# ISO/TS 32005

## Document management — Portable Document Format — PDF 1.7 and 2.0 structure namespace inclusion in ISO 32000-2

This repository contains the source files for ISO/TS 32005, a Technical Specification developed by ISO TC 171/SC 2/WG 9 (PDF universal accessibility).

## Project Overview

This Technical Specification defines the structure namespace inclusion for PDF 1.7 and 2.0 in ISO 32000-2. The document focuses on enabling better document accessibility and structural integrity in PDF documents.

## Document Structure

The document is organized into several sections:
- Foreword and Introduction
- Scope
- Normative References
- Terms and Definitions
- Notation
- Declaration
- Using Namespaces
- Attributes
- Parent Hierarchy
- Bibliography

## Building the Document

This project uses [Metanorma](https://www.metanorma.org/), an open-source framework for standards documents, to generate the final output formats.

### Prerequisites

- Docker (or Podman)
- Python 3 with pandas and openpyxl libraries
- Ruby (optional, for local development)

### Build Process

1. To build the document, run:
   ```
   ./makeMetanorma.sh
   ```

   This script:
   - Runs the mega-table.py script to generate relationship tables from Excel data
   - Pulls the Metanorma Docker image if needed
   - Generates HTML, DOC, and PDF output formats
   - Places the output files in the `_site` directory

2. If you encounter issues with the mega-table.py script, you can run it directly:
   ```
   python3 scripts/mega-table.py --input <path-to-excel-file> --output <output-directory>
   ```

## Project Tools

### makeMetanorma.sh

A shell script that orchestrates the document build process, including:
- Running the mega-table.py Python script
- Running the Metanorma container to generate the document

### mega-table.py

A Python script that:
- Processes an Excel file containing hierarchical inclusion rules
- Generates AsciiDoc tables showing parent-child relationships
- Creates reference lists for document structure elements

## Folder Structure

- `sources/`: Contains the main AsciiDoc source files
  - `sections/`: Individual document sections
  - `megatable/`: Excel files for structure relationships
  - `generated/`: Auto-generated AsciiDoc files
- `scripts/`: Utility scripts for document processing
- `_site/`: Output directory for the built documents
- `relaton/`: Bibliography data
- `iev/`: International Electrotechnical Vocabulary references

## Contributing

For information about contributing to this document, please contact the ISO TC 171/SC 2/WG 9 working group.

## License

Copyright © ISO, 2025. All rights reserved.
