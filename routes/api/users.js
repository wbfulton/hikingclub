// require('resource') imports resource

const express = require('express');
const router = express.Router();

// Import password encryption
const bcrypt = require('bcryptjs');

// Import Gravatar for profile
const gravatar = require('gravatar');

// Import Validation and Authentication
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

// @route  POST api/users
// @desc   Register user (register). Returns jsonwebtoken with user payload
// @access Public
router.post(
  '/',
  [
    // checks required fields
    check('name', 'Name is required')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('phone', 'Please include a valid phone number')
      .not()
      .isEmpty()
      .isMobilePhone(),
    check(
      'password',
      'Please enter a password with more than 6 characters'
    ).isLength({ min: 6 })
  ], // handles routing and database validation
  async (req, res) => {
    // sends errors if they exist
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, password } = req.body; // pull variables out

    try {
      // Sees if user exists
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      // Get users gravatar
      const avatar = gravatar.url(email, {
        s: '200', // default size
        r: 'pg', // rating
        d: 'mm' // default photo
      });

      // creates new instance of user with model
      user = new User({
        name,
        email,
        phone,
        avatar,
        password
      });

      // Encrypt password
      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      // saves user to the database
      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id
        }
      };

      // signs jwt for auth, change time to 360000 before deployment
      // returns jwt
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
