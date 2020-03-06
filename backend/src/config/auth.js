// crypto jwt and sha2
// import to SessionController

export default {
  secret: process.env.APP_SECRET,
  expiresIn: '7d',
};
