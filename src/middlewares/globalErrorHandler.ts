import { NextFunction, Request, Response } from "express";
import { Prisma } from "../../generated/prisma/client";

export default function errorHandler(
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) {
    let statusCode = 500;
    let errorMessage = 'Internal server error';
    let errorDetails = err;

    if (err instanceof Prisma.PrismaClientValidationError) {
        statusCode = 400;
        errorMessage = "You provide incorrect field type or missing fields";
    } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "p2025") {
            statusCode = 400;
            errorMessage = "An operation failed because it depends of one or more records that were required but not found"
        } else if (err.code === "p2002") {
            statusCode = 400;
            errorMessage = "Duplicate key error"
        }
    } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
        statusCode = 500;
        errorMessage = 'Error occured during execution'
    } else if (err instanceof Prisma.PrismaClientInitializationError) {
        if (err.errorCode === 'P1000') {
            statusCode = 401;
            errorMessage = 'Authentication failed, please check your credentials'
        } else if (err.errorCode === 'P1001') {
            statusCode = 400;
            errorMessage = 'Can not reach database server'
        }


    }

    res.status(statusCode);
    res.json({
        message: errorMessage,
        error: errorDetails
    })
}