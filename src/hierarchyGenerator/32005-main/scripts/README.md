# Mega-Table Relationship Converter

A Python utility for converting hierarchical structure element relationships from Excel to AsciiDoc format.

## Overview

The `mega-table.py` script transforms a relationship matrix from an Excel spreadsheet into AsciiDoc tables showing parent-child relationships for structure elements. It reads a compact grid/table that describes structure element types and their hierarchical inclusion rules.

## How It Works

1. The script reads an Excel spreadsheet (`Hierarchical Inclusion Rules.xlsx`) from the `../sources/megatable/` folder (one level above the script root), specifically looking for the "Tags-MegaTable" tab.
2. It interprets the Excel table as a relationship matrix where:
   - Row A (starting from the second column) defines parent structure element names
   - Column 1 (starting from the second row) defines child structure element names
   - The intersection cells define the relationship between parents and children
   - Cells containing "∅" indicate disallowed relationships
3. For each parent structure element, the script generates an AsciiDoc table showing:
   - What children are allowed in that parent (Child Occurrences and Child Structure Type)
   - What parents are allowed for that parent (Parent Occurrences and Parent Structure Type)

## Outputs

The script generates two files in the `../sources/generated/` directory (one level above the script root):

1. `structure-relationships.adoc` - Contains the formatted AsciiDoc tables for each parent structure element
2. `parent-list.adoc` - Contains a list of all parent structure elements with links to their respective tables

## Usage

1. Ensure the Excel file (`Hierarchical Inclusion Rules.xlsx`) is placed in the `../sources/megatable/` folder
2. Run the script:
   ```
   python mega-table.py
   ```
3. The resulting AsciiDoc files will be available in the `../sources/generated/` folder (one level above where the script is executed)

## Requirements

- Python 3.6+
- pandas
- openpyxl

To install dependencies:
```
pip install -r requirements.txt
```
