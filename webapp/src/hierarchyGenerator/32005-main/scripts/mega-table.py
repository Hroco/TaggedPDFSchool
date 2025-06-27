#!/usr/bin/env python3

import pandas as pd
import os
import argparse
from pathlib import Path
import json

def gather_relationships(parent_name, df):
    """Gather both parent-child and child-parent relationships for a given parent."""
    # Get child relationships (what children are allowed in this parent)
    child_relationships = []
    for child in df.index:
        child_occurrences = df.loc[child, parent_name]
        if pd.notna(child_occurrences) and child_occurrences != "∅":
            child_relationships.append((child, child_occurrences))
    
    # Get parent relationships (what parents are allowed for this parent)
    parent_relationships = []
    if parent_name in df.index:
        for col in df.columns:
            parent_occurrences = df.loc[parent_name, col]
            if pd.notna(parent_occurrences) and parent_occurrences != "∅":
                parent_relationships.append((col, parent_occurrences))

    return child_relationships, parent_relationships

def create_json_output(parent_name, child_relationships, parent_relationships):
    """Create an Json entry for a given parent structure element."""
    
    json_output = {
        "name": parent_name,
        "hierarchy": {
            "children": [],
            "parents": []
        }
    }

    # Determine the longer list to iterate over
    max_rows = max(len(child_relationships), len(parent_relationships))
    
    # Create rows, using empty strings when either list is exhausted
    for i in range(max_rows):
        # Get child relationship if available, otherwise use empty strings
        if i < len(child_relationships):
            child_occ, child = child_relationships[i]
        else:
            child_occ, child = "", ""
            
        # Get parent relationship if available, otherwise use empty strings
        if i < len(parent_relationships):
            parent_occ, parent = parent_relationships[i]
        else:
            parent_occ, parent = "", ""
            
        # Add child relationship to JSON output
        if child:
            json_output["hierarchy"]["children"].append([
                    child_occ,
                    child
                ])

        # Add parent relationship to JSON output
        if parent:
            json_output["hierarchy"]["parents"].append(
                [
                    parent_occ,
                    parent
                ]
            )
    
    print(f"json_output {json_output}")

    return json_output

def create_asciidoc_table(parent_name, child_relationships, parent_relationships):
    """Create an AsciiDoc table for a given parent structure element."""
    table = f"[[{parent_name}-relationships]]\n.The parent-child relationships for the **{parent_name}** structure element\n"
    table += '[width="100%",cols="25%,25%,25%,25%",options="header",]\n'
    table += "|===\n"
    table += "|Child Occurrences |Child Structure Type |Parent Occurrences |Parent Structure Type\n"
    
    # Determine the longer list to iterate over
    max_rows = max(len(child_relationships), len(parent_relationships))
    
    # Create rows, using empty strings when either list is exhausted
    for i in range(max_rows):
        # Get child relationship if available, otherwise use empty strings
        if i < len(child_relationships):
            child_occ, child = child_relationships[i]
        else:
            child_occ, child = "", ""
            
        # Get parent relationship if available, otherwise use empty strings
        if i < len(parent_relationships):
            parent_occ, parent = parent_relationships[i]
        else:
            parent_occ, parent = "", ""
            
        table += f"|{child} |{child_occ} |{parent} |{parent_occ}\n"
    
    table += "|===\n\n"
    return table

def create_asciidoc_list_elems(parent_elements):
    """Create an AsciiDoc table of contents with links to each parent structure element's relationship table."""
    list_elems = ""
  
    for parent in parent_elements:
        list_elems += f"* {parent}, <<{parent}-relationships>>\n"
    
    list_elems += "\n"
    return list_elems

def process_excel(input_path, output_dir):
    """
    Process the Excel file and generate AsciiDoc tables showing relationships.
    
    Args:
        input_path: Path to the input Excel file
        output_dir: Directory to write the generated AsciiDoc files
    """
    # Create output directory if it doesn't exist
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Read the Excel file - specifically the "Tags-MegaTable" tab
    excel_path = Path(input_path)
    if not excel_path.exists():
        raise FileNotFoundError(f"Input file not found: {excel_path}")
        
    df = pd.read_excel(excel_path, sheet_name="Tags-MegaTable", header=0, index_col=0)
    
    # Get all parent structure elements (column headers)
    parent_elements = df.columns.tolist()
    
    # Create the main AsciiDoc document
    output = ""
    jsonOutput = []
    
    # Process each parent structure element
    for parent in parent_elements:
        # Gather both sets of relationships
        child_relationships, parent_relationships = gather_relationships(parent, df)
        
        # Create table for this parent if it has any child relationships
        if child_relationships:
            output += create_asciidoc_table(parent, child_relationships, parent_relationships)
            jsonOutput.append(create_json_output(parent, child_relationships, parent_relationships))

    # Pretty print the JSON output
    json_formatted_str = json.dumps(jsonOutput, indent=2)
    
    # Write the output file
    output_path = output_dir / "structure-relationships.adoc"
    with open(output_path, "w") as f:
        f.write(output)
    print(f"Generated AsciiDoc document at {output_path}")

    # Write the JSON output file
    json_output_path = output_dir / "structure-relationships.json"
    with open(json_output_path, "w") as f:
        f.write(str(json_formatted_str))
    print(f"Generated JSON document at {json_output_path}")

    # Create a table of contents file with links to each parent structure element
    toc_output = create_asciidoc_list_elems(parent_elements)
    toc_path = output_dir / "parent-list.adoc"
    with open(toc_path, "w") as f:
        f.write(toc_output)
    
    print(f"Generated parent list document at {toc_path}")

def parse_arguments():
    """Parse command line arguments."""
    parser = argparse.ArgumentParser(
        description='Generate AsciiDoc tables from Excel megatable'
    )
    parser.add_argument(
        '-i', '--input',
        default='../sources/megatable/Hierarchical Inclusion Rules.xlsx',
        help='Path to the input Excel file (default: %(default)s)'
    )
    parser.add_argument(
        '-o', '--output',
        default='../sources/generated',
        help='Path to the output directory (default: %(default)s)'
    )
    return parser.parse_args()

if __name__ == "__main__":
    args = parse_arguments()
    process_excel(args.input, args.output)
