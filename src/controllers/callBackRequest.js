const { ResponseCodes } = require("../../constants");
const CallBackRequest = require("../models/CallBackRequest");
const {
  updateCallBackRequestValidation,
  addCallBackRequestValidation,
} = require("../validations/callBackRequest");

const addCallBackRequest = async (req, res) => {
  return addCallBackRequestValidation(req.body)
    .then(async (data) => {
      try {
        const callBackRequest = new CallBackRequest(data);
        await callBackRequest.save();
        return res.status(ResponseCodes.CREATED).json({
          code: ResponseCodes.CREATED,
          success: true,
          message: "CallBackRequest added successfully",
          data: callBackRequest,
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

const getCallBackRequestById = async (req, res) => {
    try {
        const callBackRequest = await CallBackRequest.findById(req.params.id);;
        if (!callBackRequest) {
          return res.status(ResponseCodes.NOT_FOUND).json({
            code: ResponseCodes.NOT_FOUND,
            message: "callBackRequest not found",
            success: false,
          });
        }
        return res.status(ResponseCodes.OK).json({
          code: ResponseCodes.OK,
          success: true,
          message: "Get callBackRequest successfully",
          data: callBackRequest,
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

const getAllCallBackRequest = async (req, res) => {
    try {
        const callBackRequests = await CallBackRequest.find();
        return res.status(ResponseCodes.OK).json({
          code: ResponseCodes.OK,
          success: true,
          message: "Get all callbackrequests successfully",
          data: callBackRequests,
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

const updateCallBackRequestById = async (req, res) => {
  return updateCallBackRequestValidation(req.body)
    .then(async (data) => {
      try {
        console.log("data in call update ", data);
        const callBackRequest = await CallBackRequest.findByIdAndUpdate(req.params.id, { haveTalk: data.haveTalk });

        if (!callBackRequest) {
          return res.status(ResponseCodes.NOT_FOUND).json({
            code: ResponseCodes.NOT_FOUND,
            message: "CallBackRequest not found",
            success: false,
          });
        }

        return res.status(ResponseCodes.OK).json({
          code: ResponseCodes.OK,
          success: true,
          message: "CallBackRequest updated successfully",
          data: callBackRequest,
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

// Delete an callBackRequest by ID
const deleteCallBackRequestById = async (req, res) => {
  try {
    const callBackRequest = await CallBackRequest.findByIdAndUpdate(req.params.id, {
      isActive: false,
    });

    if (!callBackRequest) {
      return res.status(ResponseCodes.NOT_FOUND).json({
        code: ResponseCodes.NOT_FOUND,
        message: "CallBackRequest not found",
        success: false,
      });
    }

    return res.status(ResponseCodes.OK).json({
      code: ResponseCodes.OK,
      success: true,
      message: "CallBackRequest deleted successfully",
      data: callBackRequest,
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
  addCallBackRequest,
  getCallBackRequestById,
  getAllCallBackRequest,
  updateCallBackRequestById,
  deleteCallBackRequestById,
};
