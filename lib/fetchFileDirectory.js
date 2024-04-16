const path = require('path');
const fs = require('fs');

// const directoryPath = path.join('home/ftpgrse/po');
const directoryPath = path.join(__dirname, '..', '..', '..', '..', '..', 'ftpgrse', 'po');
// Asynchronous function to filter files by ID and return the most recent files
const POfileFilter = async (id) => {
  try {
	const files = await fs.promises.readdir(directoryPath); // Use promise-based readdir for async handling
 
	// Filter files by unique IDs
	const uniqueIds = [...new Set(files.map(file => parseInt(file.split('_')[0])))];

	const filterId = uniqueIds.filter((u_id) => u_id == id);

	if (filterId.length === 0) {
  	// return `No files found for ID ${id}`;
  	throw new Error(`No files found for ID ${id}`);
	}

	// Find the most recent file for each unique ID
	const filteredFiles = filterId.map(id => {
  	const filteredFilesById = files.filter(file => parseInt(file.split('_')[0]) === id);

  	if (filteredFilesById.length === 0) {
    	// return `No files found for ID by filter ${id}`;
    	throw new Error(`No files found for ID By filter ${id}`)
  	}

  	const incrementNumbers = filteredFilesById.map(file => parseInt(file.split('_')[1]+file.split('_')[2]));
  	const mostRecentIndex = incrementNumbers.indexOf(Math.max(...incrementNumbers));

  	return filteredFilesById[mostRecentIndex];
	});

	return { success: true, msg: "file fetched", data: filteredFiles }; // Return the array of most recent files

  } catch (err) {
	return { success: false, msg: err.message, data: null }; // Return an empty array on error
  }
};

const POfileFilterOrderBy = async (id) => {
  try {
	const files = await fs.promises.readdir(directoryPath); // Use promise-based readdir for async handling
	// Filter files by unique IDs
	const uniqueIds = [...new Set(files.map(file => parseInt(file.split('_')[0])))];

	const filterId = uniqueIds.filter((u_id) => u_id == id);

	if (filterId.length === 0) {
  	// return `No files found for ID ${id}`;
  	throw new Error(`No files found for ID ${id}`);
	}

	// Find the most recent file for each unique ID
	const filteredFiles = filterId.map(id => {
  	const filteredFilesById = files.filter(file => parseInt(file.split('_')[0]) === id);

  	if (filteredFilesById.length === 0) {
    	// return `No files found for ID by filter ${id}`;
    	throw new Error(`No files found for ID By filter ${id}`)
  	}

  	return filteredFilesById;
	});

	return { success: true, msg: "file fetched", data: filteredFiles[0] }; // Return the array of most recent files

  } catch (err) {
	return { success: false, msg: err.message, data: null }; // Return an empty array on error
  }
};



module.exports = { POfileFilter, POfileFilterOrderBy }


// Example usage:
// POfileFilter('1001')
//   .then(filteredFiles => console.log("fileFilter", filteredFiles))
//   .catch(error => console.error("Error:", error));
