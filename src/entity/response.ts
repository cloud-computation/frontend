interface ISuccess {
    success: boolean;
}

export interface IResponseMessage extends ISuccess {
    data?: any;
}

export interface IServerError {
    status: number;
    code: number;
    title: string;
}

export type TResponse<T> = {
    success: boolean;
    data: T;
};

export type TServerError = {
    success: boolean;
    error: IServerError;
}
