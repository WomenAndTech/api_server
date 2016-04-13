module.exports = {
  security_salt: process.env.API_SECURITY_SALT || '3e4e4eb3caa8326becf564f04f086db671ef752ae3b09dfb2050d39086fa35543b977ebc32ab97a5507425be624060858247be1dfa429e2243f0b0cfbf771cff',
  db: {
    connection: process.env.WAAT_DATABASE
  }
}