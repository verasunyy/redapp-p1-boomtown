const { AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// const { tokenConfig } = require("../config");

function setCookie({ tokenName, token, res }) {
  res.cookie(tokenName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 2 // 2h
  });
}

function generateToken(user, secret) {
  const { id, email } = user; // Omit the password from the token

  /**
   *  @TODO: Authentication - Server
   *
   *  This helper function is responsible for generating the JWT token.
   *  Here, we'll be taking a JSON object representing the user (the 'J' in JWT)
   *  and cryptographically 'signing' it using our app's 'secret'.
   *  The result is a cryptographic hash representing out JSON user
   *  which can be decoded using the app secret to retrieve the stateless session.
   */
  // Refactor this return statement to return the cryptographic hash (the Token)
  return jwt.sign({ id, email }, secret, {
    expiresIn: '2h'
  });
  // -------------------------------
}

module.exports = (app) => {
  return {
    async signup(parent, { user: { fullname, email, password } }, { req, pgResource }) {
      try {
        /**
         * @TODO: Authentication - Server
         *
         * Storing passwords in your project's database requires some basic security
         * precautions. If someone gains access to your database, and passwords
         * are stored in 'clear-text' your users accounts immediately compromised.
         *
         * The solution is to create a cryptographic hash of the password provided,
         * and store that instead. The password can be decoded using the original password.
         */
        // @TODO: Use bcrypt to generate a cryptographic hash to conceal the user's password before storing it.
        const hashedPassword = await bcrypt.hash(password, 10);
        // -------------------------------

        const user = await pgResource.createUser({
          fullname: fullname,
          email: email,
          password: hashedPassword
        });
        console.log(user)

        setCookie({
          tokenName: app.get('JWT_COOKIE_NAME'),
          token: generateToken(user, app.get('JWT_SECRET')),
          res: req.res
        });

        return {
          id: user.id
        };
      } catch (e) {
        console.log(e);
        throw new AuthenticationError(e);
      }
    },

    async login(parent, args, context) {
      try {
        const user = await context.pgResource.getUserAndPasswordForVerification(
          args.user.email
        );

        /**
         *  @TODO: Authentication - Server
         *
         *  To verify the user has provided the correct password, we'll use the provided password
         *  they submitted from the login form to decrypt the 'hashed' version stored in out database.
         */
        // Use bcrypt to compare the provided password to 'hashed' password stored in your database.
        const valid = false;
        // -------------------------------
        if (!valid || !user) throw 'User was not found.';

        setCookie({
          tokenName: app.get('JWT_COOKIE_NAME'),
          token: generateToken(user, app.get('JWT_SECRET')),
          res: context.req.res
        });

        return {
          id: user.id
        };
      } catch (e) {
        throw new AuthenticationError(e);
      }
    },

    logout(parent, args, context) {
      context.req.res.clearCookie(app.get('JWT_COOKIE_NAME'));
      return true;
    }
  };
};
