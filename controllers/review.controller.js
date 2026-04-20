const Review = require('../models/review.model');
const catchAsync = require('./../utils/catchAsync.utils');
const factory = require('./handler.controller');
const AppError = require('./../utils/AppError.utils');

exports.setTourUserIds = (req, res, next) => {
    // Allow nested routes
    if (!req.body.tour) req.body.tour = req.params.tourId;
    if (!req.body.user) req.body.user = req.user.id;
    next();
}

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);

exports.createReview = catchAsync(async (req, res, next) => {
    const existingReview = await Review.findOne({ tour: req.body.tour, user: req.body.user });
    if (existingReview) {
        return next(new AppError('You have already reviewed this tour.', 400));
    }
    const newReview = await Review.create(req.body);
    res.status(201).json({
        status: 'success',
        data: {
            review: newReview
        }
    });
});

exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);