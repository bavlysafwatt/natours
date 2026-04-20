const catchAsync = require('../utils/catchAsync.utils');
const Booking = require('../models/booking.model');
const Tour = require('../models/tour.model');
const AppError = require('../utils/AppError.utils');
const handlerFactory = require('./handler.controller');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
    // 1) Get the currently booked tour
    const tour = await Tour.findById(req.params.tourId);
    if (!tour) {
        return next(new AppError('No tour found with that ID', 404));
    }

    const isBooked = await Booking.findOne({ tour: tour.id, user: req.user.id });
    if (isBooked) {
        return next(new AppError('You have already booked this tour', 400));
    }

    // 2) Create the booking
    const booking = await Booking.create({
        tour: tour.id,
        user: req.user.id,
        price: tour.price
    });

    // 3) Send response
    res.status(200).json({
        status: 'success',
        data: {
            booking
        }
    });
});

exports.getMyBookings = catchAsync(async (req, res, next) => {
    const bookings = await Booking.find({ user: req.user.id }).populate('tour');
    res.status(200).json({
        status: 'success',
        results: bookings.length,
        data: {
            bookings
        }
    });
});

exports.getAllBookings = handlerFactory.getAll(Booking);
exports.getBooking = handlerFactory.getOne(Booking, 'tour');
exports.createBooking = handlerFactory.createOne(Booking);
exports.updateBooking = handlerFactory.updateOne(Booking);
exports.deleteBooking = handlerFactory.deleteOne(Booking);