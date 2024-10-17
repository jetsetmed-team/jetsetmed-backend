const { ResponseCodes } = require("../../constants");
const QNA = require("../models/QNA");
const { addQNAValidation, updateQNAValidation } = require("../validations/qna");

// Create a new qna
const addQNA = async (req, res) => {
  console.log("Received request to add QNA");
  
  return addQNAValidation(req.body)
    .then(async (data) => {
      try {
        console.log("Validation passed, creating QNA document");
        const qna = new QNA({
          qna: data.qna,
          userId: req.user ? req.user.user.id : null,
        });
        await qna.save();
        console.log("QNA document saved successfully");
        
        return res.status(ResponseCodes.CREATED).json({
          code: ResponseCodes.CREATED,
          success: true,
          message: "QNA added successfully",
          data: qna,
        });
      } catch (error) {
        console.error("Error in addQNA:", error);
        return res.status(ResponseCodes.BAD_REQUEST).json({
          code: ResponseCodes.BAD_REQUEST,
          success: false,
          message: "Something went wrong",
          error,
        });
      }
    })
    .catch((error) => {
      console.error("Validation error in addQNA:", error);
      return res.status(ResponseCodes.BAD_REQUEST).json({
        code: ResponseCodes.BAD_REQUEST,
        message: "Validation error",
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
