const bcrypt = require('bcrypt');

const secret = process.env.SECRET || 'secret';

const getHashedText = (plainText, salt) => {
	return bcrypt.hashSync(plainText, salt);
}

const compareHash = (plainText, hash) => {
	return bcrypt.compareSync(plainText, hash);
}

const generateSalt = () => {
	return bcrypt.genSaltSync();
}



module.exports = {
	getHashedText,
	compareHash,
	generateSalt,
}