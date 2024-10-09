const { ResponseCodes } = require("../../constants");
const Appointment = require("../models/Appointment");
const { addAppointmentValidation, updateAppointmentValidation } = require("../validations/appointment");

// Create a new appointment
const addAppointment = async (req, res) => {
  return addAppointmentValidation(req.body)
    .then(async (data) => {
      try {
        const appointment = new Appointment(data);
        await appointment.save();
        return res.status(ResponseCodes.CREATED).json({
          code: ResponseCodes.CREATED,
          success: true,
          message: "Appointment added successfully",
          data: appointment,
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

// Get all appointments
const getAllAppointment = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("userId", "name email")
      .populate("doctorId", "name department");
    return res.status(ResponseCodes.OK).json({
      code: ResponseCodes.OK,
      success: true,
      message: "Get all appointments successfully",
      data: appointments,
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

// Get an appointment by ID
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("userId", "name email")
      .populate("doctorId", "name department");
    if (!appointment) {
      return res.status(ResponseCodes.NOT_FOUND).json({
        code: ResponseCodes.NOT_FOUND,
        message: "Appointment not found",
        success: false,
      });
    }
    return res.status(ResponseCodes.OK).json({
      code: ResponseCodes.OK,
      success: true,
      message: "Get appointment successfully",
      data: appointment,
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

// Update an appointment by ID
const updateAppointmentById = async (req, res) => {
  return updateAppointmentValidation(req.body)
    .then(async (data) => {
      const updates = Object.keys(data);
      try {
        const appointment = await Appointment.findById(req.params.id);

        if (!appointment) {
          return res.status(ResponseCodes.NOT_FOUND).json({
            code: ResponseCodes.NOT_FOUND,
            message: "Appointment not found",
            success: false,
          });
        }

        updates.forEach((update) => {
          if(req.file){
            appointment['reportFilePath'] = `/uploads/${req.file.filename}`;
          }
          else appointment[update] = data[update]
        });
        await appointment.save();
        return res.status(ResponseCodes.OK).json({
          code: ResponseCodes.OK,
          success: true,
          message: "Appointment updated successfully",
          data: appointment,
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

// Delete an appointment by ID
const deleteAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(req.params.id, { isActive: false });

    if (!appointment) {
      return res.status(ResponseCodes.NOT_FOUND).json({
        code: ResponseCodes.NOT_FOUND,
        message: "Appointment not found",
        success: false,
      });
    }

    return res.status(ResponseCodes.OK).json({
      code: ResponseCodes.OK,
      success: true,
      message: "Appointment deleted successfully",
      data: appointment,
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
  addAppointment,
  getAppointmentById,
  getAllAppointment,
  updateAppointmentById,
  deleteAppointmentById,
};
