const express = require('express');
const router = express.Router();
const catchAsync = require('../helpers/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middlewares');
const campgroundController = require('../controllers/campgrounds');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
    .get(catchAsync(campgroundController.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgroundController.createCampground));

router.get('/new', isLoggedIn, campgroundController.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgroundController.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgroundController.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgroundController.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgroundController.renderEditForm));


module.exports = router;