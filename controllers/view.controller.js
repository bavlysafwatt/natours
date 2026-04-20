const Tour = require('../models/tour.model');
const catchAsync = require('../utils/catchAsync.utils');
const AppError = require('../utils/AppError.utils');
const Booking = require('../models/booking.model');

exports.getOverview = catchAsync(async (req, res, next) => {
    // 1) Get tour data from collection
    const tours = await Tour.find();
    // 2) Build template
    // 3) Render that template using tour data from 1)
    res.status(200).render('overview', {
        title: 'All Tours',
        tours
    });
});


exports.getTour = catchAsync(async (req, res, next) => {
    // 1) Get the tour data from the database
    const tour = await Tour.findOne({ slug: req.params.slug }).populate({ path: 'reviews', select: 'review rating user -tour' });

    if (!tour) {
        return next(new AppError('No tour found with that slug.', 404));
    }

    // 2) Build template
    // 3) Render template using tour data from 1)
    res.status(200).render('tour', {
        title: tour.name,
        tour
    });
});

exports.getLoginForm = catchAsync(async (req, res, next) => {
    res.status(200).set(
        'Content-Security-Policy',
        "connect-src 'self' http://127.0.0.1:3000 https://cdnjs.cloudflare.com"
    ).render('login', {
        title: 'Log into your account'
    });
});

exports.getAccount = catchAsync(async (req, res, next) => {
    res.status(200).render('account', {
        title: 'Your account'
    });
});

exports.getMyTours = catchAsync(async (req, res, next) => {
    // 1) Find all bookings
    const bookings = await Booking.find({ user: req.user.id }).populate('tour');
    // 2) Find tours with the returned IDs
    const tours = bookings.map(el => el.tour);

    res.status(200).render('overview', {
        title: 'My Tours',
        tours
    });
});

