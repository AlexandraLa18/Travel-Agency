export interface ApiErrorDTO {
    timestamp?: string;
    httpStatusCode?: number;
    code?: string;
    message?: string;
    params?: Array<string>;
}