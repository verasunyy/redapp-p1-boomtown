const { AuthenticationError } = require('apollo-server-express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


function setCookie({ tokenName, token, res }) {
  res.cookie(tokenName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 1000 * 60 * 60 * 2 // 2h
  });
}

function generateToken(user, secret) {
  const { id, email, fullname, bio } = user;
  return jwt.sign({ id, email, fullname, bio }, secret, {
    expiresIn: '2h'
  });
}

module.exports = (app) => {
  return {
    async signup(parent, { user: { fullname, email, password } }, { req, pgResource }) {
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await pgResource.createUser({
          fullname: fullname,
          email: email,
          password: hashedPassword
        });

        setCookie({
          tokenName: app.get('JWT_COOKIE_NAME'),
          token: generateToken(user, app.get('JWT_SECRET')),
          res: req.res
        });

        return {
          id: user.id
        };
      } catch (e) {
        throw new AuthenticationError(e);
      }
    },

    async login(parent, { user: { email, password } }, { req, pgResource }) {
      try {
        const user = await pgResource.getUserAndPasswordForVerification(email);
        const valid = await bcrypt.compare(password, user.password);

        if (!valid || !user) throw 'User was not found.';
        setCookie({
          tokenName: app.get('JWT_COOKIE_NAME'),
          token: generateToken(user, app.get('JWT_SECRET')),
          res: req.res
        });
        return {
          id: user.id
        };
      } catch (e) {
        throw new AuthenticationError(e);
      }
    },

    logout(parent, args, { req }) {
      req.res.clearCookie(app.get('JWT_COOKIE_NAME'));
      return true;
    }
  };
};
