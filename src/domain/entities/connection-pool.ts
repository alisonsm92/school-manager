export default interface ConnectionPool {
    isConnected(): Promise<boolean>
    query<T>(queryString: string, params?: unknown[]): Promise<T[]>
    end(): Promise<void>
}
