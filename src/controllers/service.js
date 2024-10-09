// service route.js

const { ResponseCodes } = require("../../constants");
const Service = require("../models/Service");
const { addServiceValidation, updateServiceValidation } = require("../validations/service");

// Create a new service
const addService = async (req, res) => {
  return addServiceValidation(req.body)
  .then(async (data) => {
    try {
      const service = new Service(data);
      await service.save();
      return res.status(ResponseCodes.CREATED).json({
        code: ResponseCodes.CREATED,
        success: true,
        message: "Service added successfully",
        data: service,
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
  }
  
  // Get all services
  const getAllServices = async (req, res) => {
    try {
      const services = await Service.find().populate('doctorId', 'name department');
      return res.status(ResponseCodes.OK).json({
        code: ResponseCodes.OK,
        success: true,
        message: "Get all services successfully",
        data: services,
      });
    } catch (error) {
      return res.status(ResponseCodes.INTERNAL_SERVER_ERROR).json({
        code: ResponseCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: "Internal server error",
        error,
      });
    }
  }
  
  // Get a service by ID
const getServiceById = async (req, res) => {
    try {
      const service = await Service.findById(req.params.id).populate('doctorId', 'name department');
      if (!service) {
        return res.status(ResponseCodes.NOT_FOUND).json({
          code: ResponseCodes.NOT_FOUND,
          message: "Service not found",
          success: false,
        });
      }
      return res.status(ResponseCodes.OK).json({
        code: ResponseCodes.OK,
        success: true,
        message: "Get service successfully",
        data: service,
      });
    } catch (error) {
      return res.status(ResponseCodes.INTERNAL_SERVER_ERROR).json({
        code: ResponseCodes.INTERNAL_SERVER_ERROR,
        success: false,
        message: "Internal server error",
        error,
      });
    }
  }
  
  // Update a service by ID
const updateServiceById = async (req, res) => {
  return updateServiceValidation(req.body)
  .then(async (data) => {
    const updates = Object.keys(data);
    try {
      const service = await Service.findById(req.params.id);
  
      if (!service) {
        return res.status(ResponseCodes.NOT_FOUND).json({
          code: ResponseCodes.NOT_FOUND,
          message: "Service not found",
          success: false,
        });
      }
  
      updates.forEach(update => service[update] = data[update]);
      await service.save();
      return res.status(ResponseCodes.OK).json({
        code: ResponseCodes.OK,
        success: true,
        message: "Service updated successfully",
        data: service,
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
  }
  
  // Delete a service by ID
const deleteServiceById = async (req, res) => {
    try {
      const service = await Service.findByIdAndUpdate(req.params.id, { isActive: false});
  
      if (!service) {
        return res.status(ResponseCodes.NOT_FOUND).json({
          code: ResponseCodes.NOT_FOUND,
          message: "Service not found",
          success: false,
        });
      }
  
      return res.status(ResponseCodes.OK).json({
        code: ResponseCodes.OK,
        success: true,
        message: "Service deleted successfully",
        data: service,
      });
    } catch (error) {
      return res.status(ResponseCodes.INTERNAL_SERVER_ERROR).json({
        code: ResponseCodes.INTERNAL_SERVER_ERROR,
        message: "Schema validation error",
        error: error,
        success: false,
      });
    }
  }

  module.exports = {
    addService,
    getServiceById,
    getAllServices,
    updateServiceById,
    deleteServiceById,
  }