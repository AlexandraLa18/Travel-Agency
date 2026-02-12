export interface StateMetadata<T> {
    items: T[];
    total: number;
    loading?: boolean;
    dataNotFound?: boolean;
}