const { ResponseCodes } = require("../../constants");
const Company = require("../models/Company");
const { addCompanyValidation, updateCompanyValidation } = require("../validations/company");

// Create a new company
const addCompany = async (req, res) => {
  return addCompanyValidation(req.body)
    .then(async (data) => {
      try {
        const company = new Company(data);
        await company.save();
        return res.status(ResponseCodes.CREATED).json({
          code: ResponseCodes.CREATED,
          success: true,
          message: "Company added successfully",
          data: company,
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

// Get all companys
const getAllCompany = async (req, res) => {
  try {
    const companys = await Company.find();
    return res.status(ResponseCodes.OK).json({
      code: ResponseCodes.OK,
      success: true,
      message: "Get all companies successfully",
      data: companys,
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

// Get an company by ID
const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(ResponseCodes.NOT_FOUND).json({
        code: ResponseCodes.NOT_FOUND,
        message: "Company not found",
        success: false,
      });
    }
    return res.status(ResponseCodes.OK).json({
      code: ResponseCodes.OK,
      success: true,
      message: "Get company successfully",
      data: company,
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

// Update an company by ID
const updateCompanyById = async (req, res) => {
  return updateCompanyValidation(req.body)
    .then(async (data) => {
      const updates = Object.keys(data);
      try {
        const company = await Company.findById(req.params.id);

        if (!company) {
          return res.status(ResponseCodes.NOT_FOUND).json({
            code: ResponseCodes.NOT_FOUND,
            message: "Company not found",
            success: false,
          });
        }

        updates.forEach((update) => (company[update] = data[update]));
        await company.save();
        return res.status(ResponseCodes.OK).json({
          code: ResponseCodes.OK,
          success: true,
          message: "Company updated successfully",
          data: company,
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

// Delete an company by ID
const deleteCompanyById = async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, { isActive: false });

    if (!company) {
      return res.status(ResponseCodes.NOT_FOUND).json({
        code: ResponseCodes.NOT_FOUND,
        message: "Company not found",
        success: false,
      });
    }

    return res.status(ResponseCodes.OK).json({
      code: ResponseCodes.OK,
      success: true,
      message: "Company deleted successfully",
      data: company,
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
  addCompany,
  getCompanyById,
  getAllCompany,
  updateCompanyById,
  deleteCompanyById,
};
