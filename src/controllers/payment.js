const { ResponseCodes } = require("../../constants");
const Payment = require("../models/Payment");
const {
  addPaymentValidation,
  updatePaymentValidation,
} = require("../validations/payment");

// Create a new payment
const addPayment = async (req, res) => {
  return addPaymentValidation(req.body)
    .then(async (data) => {
      try {
        const payment = new Payment(data);
        await payment.save();
        return res.status(ResponseCodes.CREATED).json({
            code: ResponseCodes.CREATED,
            success: true,
            message: "Payment added successfully",
            data: payment,
          });
      } catch (error) {
        return res.status(ResponseCodes.BAD_REQUEST).json({
          code: ResponseCodes.BAD_REQUEST,
          success: false,
          message: "Something went wrong",
          error,
        });
      }
    })
    .catch((error) => {
      return res.status(ResponseCodes.INTERNAL_SERVER_ERROR).json({
        code: ResponseCodes.INTERNAL_SERVER_ERROR,
        message: "Schema validation error",
        error: error,
        success: false,
      });
    });
};

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("appointmentId", "appointmentDate")
      .populate("userId", "name email");
    return res.status(ResponseCodes.OK).json({
      code: ResponseCodes.OK,
      success: true,
      message: "Get all payments successfully",
      data: payments,
    });
  } catch (error) {
    return res.status(ResponseCodes.INTERNAL_SERVER_ERROR).json({
        code: ResponseCodes.INTERNAL_SERVER_ERROR,
        message: "Schema validation error",
        error: error,
        success: false,
      });
  }
};

// Get a payment by ID
const getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("appointmentId", "appointmentDate")
      .populate("userId", "name email");
    if (!payment) {
      return res.status(ResponseCodes.NOT_FOUND).json({
        code: ResponseCodes.NOT_FOUND,
        message: "Payment not found",
        success: false,
      });
    }
    return res.status(ResponseCodes.OK).json({
      code: ResponseCodes.OK,
      success: true,
      message: "Get payment successfully",
      data: payment,
    });
  } catch (error) {
    return res.status(ResponseCodes.INTERNAL_SERVER_ERROR).json({
        code: ResponseCodes.INTERNAL_SERVER_ERROR,
        message: "Schema validation error",
        error: error,
        success: false,
      });
  }
};

// Update a payment by ID
const updatePaymentById = async (req, res) => {
  return updatePaymentValidation(req.body)
    .then(async (data) => {
      const updates = Object.keys(data);
      try {
        const payment = await Payment.findById(req.params.id);

        if (!payment) {
          return res.status(ResponseCodes.NOT_FOUND).json({
            code: ResponseCodes.NOT_FOUND,
            message: "Payment not found",
            success: false,
          });
        }

        updates.forEach((update) => (payment[update] = req.body[update]));
        await payment.save();
        return res.status(ResponseCodes.OK).json({
          code: ResponseCodes.OK,
          success: true,
          message: "Payment updated successfully",
          data: payment,
        });
      } catch (error) {
        return res.status(ResponseCodes.BAD_REQUEST).json({
          code: ResponseCodes.BAD_REQUEST,
          success: false,
          message: "Something went wrong",
          error,
        });
      }
    })
    .catch((error) => {
      return res.status(ResponseCodes.INTERNAL_SERVER_ERROR).json({
        code: ResponseCodes.INTERNAL_SERVER_ERROR,
        message: "Schema validation error",
        error: error,
        success: false,
      });
    });
};

// Delete a payment by ID
const deletePaymentById = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);

    if (!payment) {
      return res.status(ResponseCodes.NOT_FOUND).json({
        code: ResponseCodes.NOT_FOUND,
        message: "Payment not found",
        success: false,
      });
    }

    return res.status(ResponseCodes.OK).json({
      code: ResponseCodes.OK,
      success: true,
      message: "Payment deleted successfully",
      data: payment,
    });
  } catch (error) {
    return res.status(ResponseCodes.INTERNAL_SERVER_ERROR).json({
        code: ResponseCodes.INTERNAL_SERVER_ERROR,
        message: "Schema validation error",
        error: error,
        success: false,
      });
  }
};

module.exports = {
  addPayment,
  getPaymentById,
  getAllPayments,
  updatePaymentById,
  deletePaymentById,
};
