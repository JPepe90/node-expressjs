const bcrypt = require('bcrypt');

// const myPassword = 'lalala 123 889!';

async function passwordCheck(password) {
  const pwHash = '$2b$10$WzXXSkx6Z6qtaDSGgOuwC.AWNz4cjHtSY87Qkn7gzJV13v3BWIxvm';
  const isMatch = await bcrypt.compare(password, pwHash);
  console.log(isMatch);
}

module.exports = { passwordCheck };


