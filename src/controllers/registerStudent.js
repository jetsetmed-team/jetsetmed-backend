const { ResponseCodes } = require("../../constants");
const RegisterStudent = require("../models/RegisterStudent");
const { addRegisterStudentValidation, updateRegisterStudentValidation } = require("../validations/regitsterStudent");

// Create a new registerStudent
const addRegisterStudent = async (req, res) => {
  return addRegisterStudentValidation(req.body)
    .then(async (data) => {
      try {
        const registerStudent = new RegisterStudent(data);
        await registerStudent.save();
        return res.status(ResponseCodes.CREATED).json({
          code: ResponseCodes.CREATED,
          success: true,
          message: "Student register successfully",
          data: registerStudent,
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

// Get all registerStudents
const getAllRegisterStudent = async (req, res) => {
  try {
    const registerStudents = await RegisterStudent.find();
    return res.status(ResponseCodes.OK).json({
      code: ResponseCodes.OK,
      success: true,
      message: "Get all registered students successfully",
      data: registerStudents,
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

// Get an registerStudent by ID
const getRegisterStudentById = async (req, res) => {
  try {
    const registerStudent = await RegisterStudent.findById(req.params.id);
    if (!registerStudent) {
      return res.status(ResponseCodes.NOT_FOUND).json({
        code: ResponseCodes.NOT_FOUND,
        message: "RegisterStudent not found",
        success: false,
      });
    }
    return res.status(ResponseCodes.OK).json({
      code: ResponseCodes.OK,
      success: true,
      message: "Get registered student successfully",
      data: registerStudent,
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

// Update an registerStudent by ID
const updateRegisterStudentById = async (req, res) => {
  return updateRegisterStudentValidation(req.body)
    .then(async (data) => {
      const updates = Object.keys(data);
      try {
        const registerStudent = await RegisterStudent.findById(req.params.id);

        if (!registerStudent) {
          return res.status(ResponseCodes.NOT_FOUND).json({
            code: ResponseCodes.NOT_FOUND,
            message: "RegisterStudent not found",
            success: false,
          });
        }

        updates.forEach((update) => (registerStudent[update] = data[update]));
        await registerStudent.save();
        return res.status(ResponseCodes.OK).json({
          code: ResponseCodes.OK,
          success: true,
          message: "Registered student updated successfully",
          data: registerStudent,
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

// Delete an registerStudent by ID
const deleteRegisterStudentById = async (req, res) => {
  try {
    const registerStudent = await RegisterStudent.findByIdAndUpdate(req.params.id, { isActive: false });

    if (!registerStudent) {
      return res.status(ResponseCodes.NOT_FOUND).json({
        code: ResponseCodes.NOT_FOUND,
        message: "RegisterStudent not found",
        success: false,
      });
    }

    return res.status(ResponseCodes.OK).json({
      code: ResponseCodes.OK,
      success: true,
      message: "Registered student deleted successfully",
      data: registerStudent,
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
  addRegisterStudent,
  getRegisterStudentById,
  getAllRegisterStudent,
  updateRegisterStudentById,
  deleteRegisterStudentById,
};
