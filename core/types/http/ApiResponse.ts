export interface ApiResponse<T = any> {
    status?: string;
    status_code?: number;
    message?: string,
    data?: T;
    meta?: any[];
}

export interface ApiPaginatedResponse<T = any> {
    data: T;
    links:ApiPaginatedResponseLink;
    meta: ApiPaginatedResponseMetaInfo;
}

export interface ApiPaginatedResponseLegacy<T = any> {
    current_page: number;
    data: T;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    next_page_url?: any;
    path: string;
    per_page: number;
    prev_page_url?: any;
    to: number;
    total: number;
}



export interface ApiPaginatedResponseLink {
    first?: string|null;
    last?: string|null;
    next: string|null;
    prev: string|null;
}

export interface ApiPaginatedResponseMetaInfo {
    current_page?: number;
    per_page?: number;
    total?: number;
    last_page?: number;
    from?: number;
    path?: string;
    to?: number;
}



