import type { Request, Response, NextFunction } from "express";
import {Parser} from "json2csv"
import User from "../models/User.js";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(409); 
      throw new Error("User with this email already exists");
    }

    const newUser = await User.create(req.body);

    res.status(201).json({
      status: "success",
      data: newUser,
    });
  } catch (error) {
    next(error); 
  }
};


export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { email } = req.body;

    const user = await User.findById(id);
    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        res.status(400);
        throw new Error("This email is already associated with another account");
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      req.body,
      { 
        new: true, 
        runValidators: true 
      }
    );

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};


export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      res.status(404);
      throw new Error("User not found. It may have already been deleted.");
    }

    res.status(200).json({
      status: "success",
      message: `User ${user.firstName} ${user.lastName} deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};


export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const search = (req.query.search as string) || "";

    let page = Number(req.query.page as string) || 1;
    let limit = Number(req.query.limit as string) || 10; 
    if(page <= 0) {
        page = 1
    }
    if(limit <= 0) {
        limit = 10
    }

    const query: any = {};

    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { mobile: { $regex: search, $options: "i" } },
        {location: { $regex: search, $options: "i" }}
      ];
    }

    const skip = (page - 1) * limit;

    const [users, total] = await Promise.all([
      User.find(query)
        .sort({ createdAt: -1 }) 
        .skip(skip)
        .limit(limit),
      User.countDocuments(query),
    ]);

    res.status(200).json({
      status: "success",
      count: users.length,
      pagination: {
        totalItems: total,
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        limit,
      },
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const exportToCSV = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const users = await User.find({}).sort({ createdAt: -1 });

    if (!users || users.length === 0) {
      res.status(404);
      throw new Error("No users found to export");
    }

    const fields = [
      { label: "First Name", value: "firstName" },
      { label: "Last Name", value: "lastName" },
      { label: "Email Address", value: "email" },
      { label: "Phone", value: "mobile" },
      { label: "Gender", value: "gender" },
      { label: "Status", value: "status" },
      { label: "Location", value: "location" }
    ];

    const json2csvParser = new Parser({ fields });
    const csvData = json2csvParser.parse(users);

    res.header("Content-Type", "text/csv");
    res.attachment(`users-report-${Date.now()}.csv`); 

    return res.status(200).send(csvData);

  } catch (error) {
    next(error);
  }
};


export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      res.status(404);
      throw new Error("User not found");
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error: any) {
    if (error.name === "CastError") {
      res.status(400);
      return next(new Error("Invalid User identifier."));
    }
    next(error);
  }
};


export const updateStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['active', 'inactive'].includes(status)) {
      res.status(400);
      throw new Error("Invalid status value");
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      res.status(404);
      throw new Error("User not found");
    }

    res.status(200).json({
      status: "success",
      message: `User status changed to ${status}`,
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};