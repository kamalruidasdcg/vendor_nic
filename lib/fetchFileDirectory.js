const path = require('path');
const fs = require('fs');
const Message = require('../utils/messages');

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

			const incrementNumbers = filteredFilesById.map(file => parseInt(file.split('_')[1] + file.split('_')[2]));
			const mostRecentIndex = incrementNumbers.indexOf(Math.max(...incrementNumbers));

			return filteredFilesById[mostRecentIndex];
		});

		return { success: true, msg: Message.FILE_FETCH_SUCCESSFULLY, data: filteredFiles }; // Return the array of most recent files

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


		console.log("filesss", files);

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
		const sortedFiles = filteredFiles[0].sort(customSort);

		console.log("sortedFiles", filteredFiles[0]);
		console.log("sortedFilessortedFiles", sortedFiles);
		sortedFiles.shift();
		return { success: true, msg: "file fetched", data: sortedFiles}; // Return the array of most recent files

	} catch (err) {
		return { success: false, msg: err.message, data: null }; // Return an empty array on error
	}
};

function customSort(a, b) {
	// Extract date and time from filenames
    // var dateA = a.substring(2, 10); // Extracts YYYYMMDD from filename
    var dateA = a.split("_")[1] // Extracts YYYYMMDD from filename
    var timeA = a.split("_")[2].split(".")[0]; // Extracts HHMMSS from filename
    var dateB = b.split("_")[1];
    var timeB = b.split("_")[2].split(".")[0]

    // Concatenate date and time strings for comparison
    var dateTimeA = parseInt(dateA + timeA);
    var dateTimeB = parseInt(dateB + timeB);

	// Compare the concatenated strings
	if (dateTimeA > dateTimeB) return -1;
	if (dateTimeA < dateTimeB) return 1;
	return 0; // If equal
}


const paymentAdviceFiles = async (id) => {
	try {
		const pymtDirPath = path.join(__dirname, '..', '..', '..', '..', '..', 'ftpgrse', 'pymtadvice');
		console.log("pymtDirPath", pymtDirPath);
		const files = await fs.promises.readdir(pymtDirPath); // Use promise-based readdir for async handling
		
		return { success: true, msg: "file fetched", data: files}; // Return the array of most recent files

	} catch (err) {
		return { success: false, msg: err.message, data: null }; // Return an empty array on error
	}
};


module.exports = { POfileFilter, POfileFilterOrderBy, paymentAdviceFiles }


// Example usage:
// POfileFilter('1001')
//   .then(filteredFiles => console.log("fileFilter", filteredFiles))
//   .catch(error => console.error("Error:", error));
