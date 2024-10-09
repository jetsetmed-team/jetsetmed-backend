const { ResponseCodes, UserResponseCodes } = require("../../constants");
const Doctor = require("../models/Doctor");
const {
  addDoctorValidation,
  updateDoctorValidation,
} = require("../validations/doctor");

// Create a new doctor
const addDoctor = async (req, res) => {
  return addDoctorValidation(req.body)
    .then(async (data) => {
      try {
        const doctor = new Doctor(data);
        await doctor.save();
        return res.status(ResponseCodes.CREATED).json({
          code: ResponseCodes.CREATED,
          success: true,
          message: "Doctor added successfully",
          data: doctor,
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

// Get all doctors
const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    return res.status(ResponseCodes.OK).json({
      code: ResponseCodes.OK,
      success: true,
      message: "Get all doctors successfully",
      data: doctors,
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

// Get a doctor by ID
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(ResponseCodes.NOT_FOUND).json({
        code: ResponseCodes.NOT_FOUND,
        message: "Doctor not found",
        success: false,
      });
    }
    return res.status(ResponseCodes.OK).json({
      code: ResponseCodes.OK,
      success: true,
      message: "Get doctor successfully",
      data: doctor,
    });
  } catch (error) {
    return res.status(ResponseCodes.BAD_REQUEST).json({
      code: ResponseCodes.BAD_REQUEST,
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

// Update a doctor by ID
const updateDoctorById = async (req, res) => {
  return updateDoctorValidation(req.body)
    .then(async (data) => {
      const updates = Object.keys(data);
      try {
        const doctor = await Doctor.findById(req.params.id);

        if (!doctor) {
          return res.status(ResponseCodes.NOT_FOUND).json({
            code: ResponseCodes.NOT_FOUND,
            message: "Doctor not found",
            success: false,
          });
        }

        updates.forEach((update) => (doctor[update] = req.body[update]));
        await doctor.save();
        return res.status(ResponseCodes.OK).json({
          code: ResponseCodes.OK,
          success: true,
          message: "Doctor updated successfully",
          data: doctor,
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

// Delete a doctor by ID
const deleteDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, { isActive: false });

    if (!doctor) {
      return res.status(ResponseCodes.NOT_FOUND).json({
        code: ResponseCodes.NOT_FOUND,
        message: "Doctor not found",
        success: false,
      });
    }

    return res.status(ResponseCodes.OK).json({
      code: ResponseCodes.OK,
      success: true,
      message: "Doctor deleted successfully",
    });
  } catch (error) {
    return res.status(ResponseCodes.BAD_REQUEST).json({
      code: ResponseCodes.BAD_REQUEST,
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

module.exports = {
  addDoctor,
  getDoctorById,
  getAllDoctors,
  updateDoctorById,
  deleteDoctorById,
};
