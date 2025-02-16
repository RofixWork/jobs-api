import { StatusCodes } from "http-status-codes";
import Job from "../models/Job.js";
import NotFoundAPIError from "../errors/not-found.js";
import BadRequestAPIError from "../errors/bad-request.js";

/**
 * @typedef {import("express").Request} RequestType
 * @typedef {import("express").Response} ResponseType
 */
class JobController {
    /**
     * @param {RequestType} request
     * @param {ResponseType} response
     * @returns {ResponseType}
     */
    static async all(request, response) {
        const {id} = request.user;
        const limit = Number(request.query.limit)  || 10;
        const page = Number(request.query.page) || 1;
        const skip = (page - 1) * limit;
        const jobs = await Job.find({createdBy: id}).limit(limit).skip(skip)

        return response.status(StatusCodes.OK).json(jobs);

    }

    /**
     * @param {RequestType} request
     * @param {ResponseType} response
     * @returns {ResponseType}
     */
    static async get(request, response) {
        const {id: jobId} = request.params;
        const {id: userId} = request.user;
        const job = await Job.findOne({_id: jobId, createdBy: userId})

        if(!job) {
            throw new NotFoundAPIError("Job not found");
        }

        return response.status(StatusCodes.OK).json(job);

    }

      /**
     * @param {RequestType} request
     * @param {ResponseType} response
     * @returns {ResponseType}
     */
      static async create(request, response) {
        const {id:userId} = request.user;
        const job = await Job.create({...request.body, createdBy: userId});

        return response.status(StatusCodes.CREATED).json({job});

    }

    /**
     * @param {RequestType} request
     * @param {ResponseType} response
     * @returns {ResponseType}
     */
    static async update(request, response) {
        const {id: jobId} = request.params;
        const {id: userId} = request.user;

        const job = await Job.findByIdAndUpdate({_id: jobId, createdBy: userId}, {...request.body}, {new:true, runValidators: true});

        if(!job) { 
            throw new NotFoundAPIError("Job not found");
        }

        return response.status(StatusCodes.OK).json({
            message: "Job updated successfully",
            job
        });

    }

    /**
     * @param {RequestType} request
     * @param {ResponseType} response
     * @returns {ResponseType}
     */
    static async delete(request, response) {
        const {user:{id: userId}, params: {id: jobId}} = request;
        const job = await Job.findByIdAndDelete({_id: jobId, createdBy: userId}, {new:true});

        if(!job) { 
            throw new NotFoundAPIError("Job not found");
        }

        return response.status(StatusCodes.OK).json({
            message: "Job deleted successfully",
            job
        });

    }
}

export default JobController;