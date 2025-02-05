export interface Response<T> {
    results: T[]
}



export interface DataState<T> {
    loading: boolean;
    data: T[];
    error: string | null;
}