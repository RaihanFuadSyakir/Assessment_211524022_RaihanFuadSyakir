export interface dataResponse<T> {
    status: number;
    msg: string;
    data?: T
}