const { ResponseCodes } = require("../../constants");
const QNA = require("../models/QNA");
const { addQNAValidation, updateQNAValidation } = require("../validations/qna");

// Create a new qna
const addQNA = async (req, res) => {
  return addQNAValidation(req.body)
    .then(async (data) => {
      try {
        const qna = new QNA(data);
        await qna.save();
        return res.status(ResponseCodes.CREATED).json({
          code: ResponseCodes.CREATED,
          success: true,
          message: "QNA added successfully",
          data: qna,
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

// Get all qnas
const getAllQNA = async (req, res) => {
  try {
    const qnas = await QNA.find();
    return res.status(ResponseCodes.OK).json({
      code: ResponseCodes.OK,
      success: true,
      message: "Get all qnas successfully",
      data: qnas,
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

// Get an qna by ID
const getQNAById = async (req, res) => {
  try {
    const qna = await QNA.findById(req.params.id);
    if (!qna) {
      return res.status(ResponseCodes.NOT_FOUND).json({
        code: ResponseCodes.NOT_FOUND,
        message: "QNA not found",
        success: false,
      });
    }
    return res.status(ResponseCodes.OK).json({
      code: ResponseCodes.OK,
      success: true,
      message: "Get qna successfully",
      data: qna,
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

// Update an qna by ID
const updateQNAById = async (req, res) => {
  return updateQNAValidation(req.body)
    .then(async (data) => {
      const updates = Object.keys(data);
      try {
        const qna = await QNA.findById(req.params.id);

        if (!qna) {
          return res.status(ResponseCodes.NOT_FOUND).json({
            code: ResponseCodes.NOT_FOUND,
            message: "QNA not found",
            success: false,
          });
        }

        updates.forEach((update) => (qna[update] = data[update]));
        await qna.save();
        return res.status(ResponseCodes.OK).json({
          code: ResponseCodes.OK,
          success: true,
          message: "QNA updated successfully",
          data: qna,
        });
      } catch (error) {
        res.status(400).send(error);
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

// Delete an qna by ID
const deleteQNAById = async (req, res) => {
  try {
    const qna = await QNA.findByIdAndUpdate(req.params.id, { isActive: false });

    if (!qna) {
      return res.status(ResponseCodes.NOT_FOUND).json({
        code: ResponseCodes.NOT_FOUND,
        message: "QNA not found",
        success: false,
      });
    }

    return res.status(ResponseCodes.OK).json({
      code: ResponseCodes.OK,
      success: true,
      message: "QNA deleted successfully",
      data: qna,
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
  addQNA,
  getQNAById,
  getAllQNA,
  updateQNAById,
  deleteQNAById,
};
