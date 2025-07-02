export interface ResponseAPI {
    total_pages: number;
    results: Result[];
}

export interface Result {
    user: any;
    id: string;
    description: null | string;
    alt_description: null | string;
    urls: Urls;
    likes: number;
}

export interface Urls {
    download: string | undefined;
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
}
