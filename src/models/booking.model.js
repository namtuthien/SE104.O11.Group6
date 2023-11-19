/**
 * @file This file contains the Booking model which is responsible for handling database operations related to user authentication.
 * @name Booking Model
 * @requires ../config/db/connect
 * @exports Booking
 */
const db = require('../config/db/connect');
const index = require('../models/index.model')

function Booking() {}

Booking.postInfo = ({
    acco_id,
    au_user_id,
    book_datetime,
    book_start_datetime,
    book_end_datetime,
    book_num_adult,
    book_num_child,
    book_cost_before,
    book_cost_after,
    book_first_name,
    book_last_name,
    book_email,
    book_phone,
    book_note,
    pay_id,
    cancel,
    book_status,
    book_is_paid
}, callback) => {
    const sql = `
        INSERT INTO BOOKING (
            acco_id, au_user_id, book_datetime, book_start_datetime,
            book_end_datetime, book_num_adult, book_num_child, book_cost_before,
            book_cost_after, book_first_name, book_last_name, book_email,
            book_phone, book_note, pay_id, cancel, book_status, book_is_paid
        ) VALUES (
            ?, ?, ?, ?,
            ?, ?, ?, ?,
            ?, ?, ?, ?,
            ?, ?, ?, ?, ?
        );`;
    db.query(
        sql,
        [
            acco_id,
            au_user_id,
            book_datetime,
            book_start_datetime,
            book_end_datetime,
            book_num_adult,
            book_num_child,
            book_cost_before,
            book_cost_after,
            book_first_name,
            book_last_name,
            book_email,
            book_phone,
            book_note,
            pay_id,
            cancel,
            book_status,
            book_is_paid,
        ],
        (err, result) => {
            callback(err, result);
        }
    );
};

Booking.postInfoDetailByIds = ({
    book_id,
    room_id,
    book_room_cost_before,
    book_room_cost_after,
    book_num_room
}, callback) => {
    const sql = `
        INSERT INTO BOOKING_DETAIL (
            book_id, room_id, book_room_cost_before,
            book_room_cost_after, book_num_room
        ) VALUES (
            ?, ?, ?,
            ?, ?
        );`;
    db.query(
        sql,
        [
            book_id,
            room_id,
            book_room_cost_before,
            book_room_cost_after,
            book_num_room,
        ],
        (err, result) => {
            callback(err, result);
        }
    );
};

Booking.getDetail = function ({ id, book_id }, callback) {
    const getBooking = `
        SELECT *
        FROM view_booking_history
        WHERE book_id = ${book_id} AND au_user_id = ${id}`

    const getBookingDetails = `
        SELECT *
        FROM view_booking_detail
        WHERE book_id = ${book_id} AND au_user_id = ${id}`

    // const params = [req.query.book_id]
    // const params2 = [req.session.user.id]

    db.query(getBooking, (err, booking) => {
        if (err) {
            console.log({
                message: 'Lỗi truy vấn getBooking',
            });
            throw err;
        }

        if (!booking[0]) {
            callback(err, 0, 0)
        } else {

            booking.forEach((book) => {
                book.book_date_format = index.toXDDMMYYYY(new Date(book.book_datetime))
                book.book_start_date_format = index.toXDDMMYYYY(new Date(book.book_start_datetime))
                book.book_end_date_format = index.toXDDMMYYYY(new Date(book.book_end_datetime))

                book.book_time_format = index.toHHMM(new Date(book.book_datetime))
                book.book_start_time_format = index.toHHMM(new Date(book.book_start_datetime))
                book.book_end_time_format = index.toHHMM(new Date(book.book_end_datetime))

                book.book_time_count = new Date(book.book_datetime)
                book.book_time_count.setDate(book.book_time_count.getDate() + 7)
                book.book_time_count_format = index.toDDthangMMnamYYYY(new Date(book.book_time_count))

                book.book_time_left = new Date(book.book_time_count)
                if (book.book_time_left.getTime() > new Date().getTime) {
                    book.book_time_left.setDate(book.book_time_left.getDate() - new Date().getDate)
                    book.book_time_left_format = index.toDDMMYYYYHHMM(new Date(book.book_time_left))
                }
                book.book_cost_before_currency = index.toCurrency(Number(book.book_cost_before))
                book.book_cost_after_currency = index.toCurrency(Number(book.book_cost_after))
            })


            db.query(getBookingDetails, (err, bookingDetails) => {
                if (err) {
                    console.log({
                        message: 'Lỗi truy vấn getBooking',
                    });
                    throw err;
                }

                bookingDetails.forEach((bookingDetail) => {
                    bookingDetail.book_room_cost_before_currency = index.toCurrency(Number(bookingDetail.book_room_cost_before))
                    bookingDetail.book_room_cost_after_currency = index.toCurrency(Number(bookingDetail.book_room_cost_after))
                })

                callback(err, booking[0], bookingDetails)
            })
        }
    })
}

Booking.getAllBooking = function (req, res, callback) {
    // if (!req.session.user.au_user_email) {
    //     res.status(404).json({ message: 'Khong tim thay email!' })
    //     return
    // }
    req.session.book_id = 1;
    const sql = `SELECT acco_exac_location, city_name, book_start_datetime, 
    TIME_FORMAT(book_start_datetime, '%H:%i') AS book_start_hour,
        DAYOFWEEK(book_start_datetime) AS book_start_dayofweek,
        LPAD(EXTRACT(DAY FROM book_start_datetime), 2, '0') AS book_start_day,
        LPAD(EXTRACT(MONTH FROM book_start_datetime), 2, '0') AS book_start_month,
        YEAR(book_start_datetime) AS book_start_year,
        TIME_FORMAT(book_end_datetime, '%H:%i') AS book_end_hour,
        DAYOFWEEK(book_end_datetime) AS book_end_dayofweek,
        LPAD(EXTRACT(DAY FROM book_end_datetime), 2, '0') AS book_end_day,
        LPAD(EXTRACT(MONTH FROM book_end_datetime), 2, '0') AS book_end_month,
        YEAR(book_end_datetime) AS book_end_year,
        ABS(DATEDIFF(book_start_datetime, book_end_datetime)) AS book_num_day,
        acco_name, acco_star, 
    book_end_datetime, book_room_cost_after, book_cost_after, book_num_room, book_email, room_class, booking.book_id FROM booking, bookingdetail, roomtype, accommodation, city WHERE booking.book_id= bookingdetail.book_id AND bookingdetail.room_id=roomtype.room_id AND roomtype.acco_id=accommodation.acco_id AND city.city_id = accommodation.city_id AND booking.book_id = ${req.session.book_id} `;
    db.query(sql, async (err, result) => {
        callback(err, res, result);
    });
};

Booking.cancelBooking = function (req, res, callback) {
    req.session.book_id = 1;
    const option = req.body.option;
    let value;
    let sql = `UPDATE booking SET rea_id = ?, book_status = -1 WHERE book_id = ?`;
    if (option == "Tôi đã tìm được lựa chọn chỗ nghỉ thay thế") value = 1;
    if (option == "Chỗ nghỉ yêu cầu hủy") value = 2;
    if (option == "Số lượng hoặc nhu cầu của tôi có thay đổi") value = 3;
    if (option == "Đổi ngày hoặc điểm đến") value = 4;
    if (option == "Lý do cá nhân/chuyến đi bị hủy") value = 5;
    if (option == "Không phải các lý do trên") value = 6;
    db.query(sql, [value, req.session.book_id], async (err, result) => {
        callback(err, res, result);
    });
};

module.exports = Booking;