export interface IApiResponse<T = any> {
    success: boolean;
    message: string;
    statusCode: number;
    data?: T;
}

export class ApiResponse<T = IApiResponse> {
    success: boolean;
    message: string;
    statusCode: number;
    data?: T;

    constructor(statusCode: number, message: string = "Success", data?: T) {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }
}