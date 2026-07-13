import asyncHandler from "express-async-handler";
import AppError from "../utils/appError.js";
import ApiFuture from "../utils/apiFuture.js";

const createOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

const getAll = (Model, populatOptions) =>
  asyncHandler(async (req, res, next) => {
    let filter = {};
    if (req.filterObj) filter = req.filterObj;

    const totalDocs = await Model.countDocuments(filter);

    // build query
    let query = Model.find(filter);
    if (populatOptions) query = query.populate(populatOptions);

    const apiFuture = new ApiFuture(query, req.query);
    query = apiFuture.paginate();

    // execute query
    const docs = await apiFuture.query;

    res.status(200).json({
      status: "success",
      totalDocs,
      results: docs.length,
      data: {
        data: docs,
      },
    });
  });

const getOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      data: {
        data: doc,
      },
    });
  });

const updateOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }
    res.status(200).json({
      status: "success",
      message: "Document updated successfully",
      data: {
        data: doc,
      },
    });
  });

const deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);
    if (!doc) {
      return next(new AppError("No document found with that ID", 404));
    }
    res.status(204).json({
      status: "success",
      data: null,
    });
  });

export default { createOne, getAll, getOne, updateOne, deleteOne };
