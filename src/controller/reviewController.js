const reviewModel = require('../models/reviewModel')
const bookModel = require('../models/booksModel')
const objectId = require('mongoose').Types.ObjectId


const isValid = function (value) {
    if (typeof value == 'undefined' || value === null) return false
    if (typeof value == 'string' && value.trim().length === 0) return false
    return true
}

const createReview = async function (req, res) {
    try {
        let bookId = req.params.bookId
        let reviewData = req.body


        if (!isValid(bookId)) {
            return res.status(400).send({ status: false, msg: "bookId is required" })

        }
        if (!objectId.isValid(bookId.trim())) {
            return res.status(400).send({ status: false, msg: "bookId is invalid" })

        }
        if (!isValid(reviewData.reviewedBy)) {
            return res.status(400).send({ status: false, msg: "reviewer name  is required" })

        }
        const bookData = await bookModel.findOne({ bookId: bookId })

        if (!bookData) {
            return res.status(404).send({ status: false, msg: "not found" })
        }
        if (bookData.isDeleted == true) {
            return res.status(400).send({ status: false, msg: "this bookId already deleted" })

        }


        if (!isValid(reviewedAt)) {
            return res.status(400).send({ status: false, msg: "date  is required" })

        }
        if (!isValid(reviewData.rating)) {
            return res.status(400).send({ status: false, msg: "rating is required" })

        }
        //min and max rating pending
        let creatReviewData = {bookId,reviewData}
        let data = await reviewModel.create(creatReviewData)
        let result = {
            _id: data._id,
            bookId: data.bookId,
            reviewedBy: data.reviewedBy,
            reviewedAt: data.reviewedAt,
            rating: data.rating,
            review: data.review


        }
        return res.status(201).send({ status: true, data: result })


    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}








module.exports.createReview = createReview