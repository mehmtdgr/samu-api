const httpStatus = require("http-status");
const complaintService = require("../services/complaint.service");
const ApiError = require("../responses/error.response");
const successResponse = require("../responses/success.response");

class ComplaintController {
  async create(req, res, next) {
    try {
      const complaintContent = {
        user: req.userId,
        ...req.body,
      };
      const complaint = await complaintService.create(complaintContent);
      successResponse(res, httpStatus.CREATED, complaint);
    } catch (err) {
      return next(new ApiError(err.message, httpStatus.BAD_REQUEST));
    }
  }

  async list(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const complaints = await complaintService.list(page, limit, { visibility: "Public" });
      if (complaints.length == 0) {
        return next(new ApiError("Not Found Complaint", httpStatus.BAD_REQUEST));
      }
      successResponse(res, httpStatus.OK, complaints);
    } catch (err) {
      return next(new ApiError(err.message, httpStatus.BAD_REQUEST));
    }
  }

  async listAll(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const complaints = await complaintService.list(page, limit, {});
      if (complaints.length == 0) {
        return next(new ApiError("Not Found Complaint", httpStatus.BAD_REQUEST));
      }
      successResponse(res, httpStatus.OK, complaints);
    } catch (err) {
      return next(new ApiError(err.message, httpStatus.BAD_REQUEST));
    }
  }

  async listComplaintByUserId(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const complaints = await complaintService.list(page, limit, { user: req.userId });

      successResponse(res, httpStatus.OK, complaints);
    } catch (err) {
      return next(new ApiError(err.message, httpStatus.BAD_REQUEST));
    }
  }

  async updateStatus(req, res, next) {
    try {
      const complaintStatus = {
        status: req.body.status,
      };

      const complaint = await complaintService.update(req.params.id, complaintStatus);

      if (!complaint) {
        return next(new ApiError("Complaint Not Found", httpStatus.BAD_REQUEST));
      }
      successResponse(res, httpStatus.OK, complaint);
    } catch (err) {
      return next(new ApiError(err.message, httpStatus.BAD_REQUEST));
    }
  }

  async updateVisibility(req, res, next) {
    try {
      const complaintVisibility = {
        visibility: req.body.visibility,
      };

      const complaint = await complaintService.update(req.params.id, complaintVisibility);

      if (!complaint) {
        return next(new ApiError("Complaint Not Found", httpStatus.BAD_REQUEST));
      }
      successResponse(res, httpStatus.OK, complaint);
    } catch (err) {
      return next(new ApiError(err.message, httpStatus.BAD_REQUEST));
    }
  }

  async remove(req, res, next) {
    try {
      const deletedComplaint = await complaintService.delete(req.params.complaintId);

      if (!deletedComplaint) {
        return next(new ApiError("Complaint Not Found", httpStatus.BAD_REQUEST));
      }

      successResponse(res, httpStatus.OK, { id: deletedComplaint._id, message: "Deleted successfully" });
    } catch (err) {
      return next(new ApiError(err.message, httpStatus.BAD_REQUEST));
    }
  }
}

module.exports = new ComplaintController();
