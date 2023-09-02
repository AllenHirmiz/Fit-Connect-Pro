const router = require('express').Router();
const sequelize = require('../config/connection');
const { Activity, User } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // Get all activitiess and JOIN with user data
    const activityData = await Activity.findAll({
      include: [
        {
          model: User,
          attributes: ['email'],
        },
      ],
    });

    // Serialize data so the template can read it
    const activities = activityData.map((activity) => activity.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      activities, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

router.get('/activity', async (req, res) => {
  try {
    // Get all activitiess and JOIN with user data
    const activityData = await Activity.findAll({
      include: [
        {
          model: User,
          attributes: ['email'],
        },
      ],
    });

    // Serialize data so the template can read it
    const activities = activityData.map((activity) => activity.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('activity', { 
      activities, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Activity }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }

});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('signup');
});

router.get('/calendar', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{
        model: Activity,
        attributes: [
          'id',
          'name',
          [
            sequelize.fn(
              "DATE_FORMAT",
              sequelize.col("date_start"),
              "%Y-%m-%d"
            ),
            "date_start",
          ],
          [
            sequelize.fn(
              "DATE_FORMAT",
              sequelize.col("date_end"),
              "%Y-%m-%d"
            ),
            "date_end",
          ]

        ]
      }],
    });

    const user = userData.get({ plain: true });

    res.render('calendar', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }

})

module.exports = router;
