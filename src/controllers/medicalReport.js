// medicalReport route.js

const { ResponseCodes } = require("../../constants");
const MedicalReport = require("../models/MedicalReport");
const { addMedicalReportValidation } = require("../validations/medicalReport");

// Create a new medicalReport
const addMedicalReport = async (req, res) => {
  return addMedicalReportValidation(req.body)
    .then(async (data) => {
      try {
        if (req.file == undefined) {
          return res.status(ResponseCodes.BAD_REQUEST).json({
            code: ResponseCodes.BAD_REQUEST,
            success: false,
            message: "No file selected.",
          });
        } else {
          const newReport = new MedicalReport({
            title: data.title,
            description: data.description,
            filePath: `/uploads/${req.file.filename}`,
          });
    
          newReport
            .save()
            .then((report) =>
              res.status(ResponseCodes.CREATED).json({
                code: ResponseCodes.CREATED,
                success: true,
                message: "MedicalReport added successfully",
                data: report,
              })
            )
            .catch((err) =>
              res.status(ResponseCodes.BAD_REQUEST).json({
                code: ResponseCodes.BAD_REQUEST,
                success: false,
                message: "No file selected.",
              })
            );
        }
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

// Get all medicalReports
const getAllMedicalReports = async (req, res) => {
  try {
    const medicalReports = await MedicalReport.find();
    return res.status(ResponseCodes.OK).json({
      code: ResponseCodes.OK,
      success: true,
      message: "Get all medicalReports successfully",
      data: medicalReports,
    });
  } catch (error) {
    return res.status(ResponseCodes.INTERNAL_SERVER_ERROR).json({
      code: ResponseCodes.INTERNAL_SERVER_ERROR,
      success: false,
      message: "Internal server error",
      error,
    });
  }
};

// Delete a medicalReport by ID
const deleteMedicalReportById = async (req, res) => {
  try {
    const medicalReport = await MedicalReport.findByIdAndDelete(req.params.id);

    if (!medicalReport) {
      return res.status(ResponseCodes.NOT_FOUND).json({
        code: ResponseCodes.NOT_FOUND,
        message: "MedicalReport not found",
        success: false,
      });
    }

    return res.status(ResponseCodes.OK).json({
      code: ResponseCodes.OK,
      success: true,
      message: "MedicalReport deleted successfully",
      data: medicalReport,
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
  addMedicalReport,
  getAllMedicalReports,
  deleteMedicalReportById,
};
