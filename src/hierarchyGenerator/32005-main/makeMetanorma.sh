#!/bin/bash

# add x for debugging
set -eu

# which container tool to use...
DOCKER=docker
# DOCKER=podman 

# define the docker containers & file to be processed
# the first is the standard one, the second is the experimental one
MN_DOCKER_IMG=metanorma/metanorma
# MN_DOCKER_IMG=metanorma/metanorma:1.9.0
# MN_DOCKER_IMG=metanorma/mn


# OUTPUT_DIR=output
OUTPUT_DIR=_site

#detect platform that we're running on...
unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)     machine=Linux;;
    Darwin*)    machine=Mac;;
    CYGWIN*)    machine=Cygwin;;
    MINGW*)     machine=MinGw;;
    *)          machine="UNKNOWN:${unameOut}"
esac

# make sure we have an output dir
mkdir -p "${OUTPUT_DIR}"

# check the current path
curPath=`pwd`
# echo "curPath = ${curPath}"
# echo "home = ${HOME}"
if [ "${machine}" == "MinGw" ]; then
	curPath=/`pwd`
fi

# Check if Python is available
check_python() {
    if command -v python3 &> /dev/null; then
        return 0
    elif command -v python &> /dev/null; then
        # Check if python is at least version 3
        python_version=$(python --version 2>&1 | awk '{print $2}' | cut -d. -f1)
        if [ "$python_version" -ge 3 ]; then
            echo "Using 'python' as Python 3"
            return 0
        fi
    fi
    return 1
}

# Run the mega-table script with proper error handling
run_mega_table() {
    local script_path="scripts/mega-table.py"
    local excel_path="sources/megatable/Hierarchical Inclusion Rules.xlsx"
    local output_path="sources/generated"
    
    # Check if Python is available - if not, skip with a warning
    if ! check_python; then
        echo "Warning: Python 3 is not available. Skipping mega-table.py script."
        echo "This may result in missing content in the final document."
        echo "To generate complete content, install Python 3 and required dependencies (pandas, openpyxl)."
        return 0  # Return success so the script continues
    fi
    
    # Check if script exists
    if [ ! -f "$script_path" ]; then
        echo "Warning: $script_path does not exist. Skipping this step."
        return 0  # Return success so the script continues
    fi
    
    echo "Running mega-table.py script"
    # Try to run the script with python3, capture error output
    if ! python3 "$script_path" --input "$excel_path" --output "$output_path" 2> mega_table_error.log; then
        echo "Error running $script_path. See mega_table_error.log for details."
        echo "Common issues could be:"
        echo "  - Missing Python dependencies (pandas)"
        echo "  - File paths or permissions issues"
        echo "  - Excel file not found or in unexpected format"
        cat mega_table_error.log
        echo ""
        echo "Continuing with Metanorma processing despite this error..."
        return 0  # Return success so the script continues
    fi

    # Check if the error log is empty and remove it if so
    if [ -f "mega_table_error.log" ] && [ ! -s "mega_table_error.log" ]; then
        echo "Removing empty error log file"
        rm mega_table_error.log
    fi
    
    echo "Successfully ran $script_path"
    return 0
}

# Prune Docker containers that match our Metanorma image
prune_metanorma_containers() {
    echo "Cleaning up Metanorma containers..."
    
    # Find containers based on the Metanorma image
    local containers=$(${DOCKER} ps -a -q --filter ancestor=${MN_DOCKER_IMG})
    
    if [ -n "$containers" ]; then
        echo "Found containers to clean up: $containers"
        
        # Stop any running containers
        running_containers=$(${DOCKER} ps -q --filter ancestor=${MN_DOCKER_IMG})
        if [ -n "$running_containers" ]; then
            echo "Stopping running containers..."
            ${DOCKER} stop $running_containers
        fi
        
        # Remove the containers
        echo "Removing containers..."
        ${DOCKER} rm $containers
        
        echo "Container cleanup complete."
    else
        echo "No Metanorma containers found to clean up."
    fi
}

# this is the core routine to process one file...
convertOne() {
	# Run the mega-table.py script first (if Python is available)
	run_mega_table
	
	# make sure we have the docker images
	if [[ "$(${DOCKER} images -q "${MN_DOCKER_IMG}" 2> /dev/null)" == "" ]]; then
		echo "Pulling Metanorma Docker image"
		${DOCKER} pull "${MN_DOCKER_IMG}"
	fi

	# Create the PDF version
	echo "Running Metanorma"
	${DOCKER} run  -v "$(pwd)":/metanorma/ \
				-v "${HOME}/.fontist/fonts":/config/fonts \
				-w /metanorma \
				"${MN_DOCKER_IMG}" \
			metanorma site generate . \
			-o "${OUTPUT_DIR}" \
			-c metanorma.yml \
			--agree-to-terms
			
	# Clean up containers after processing
	prune_metanorma_containers
}

convertOne
