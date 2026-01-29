type IOptions = {
    page?: number;
    limit?: number;
    sortOrder?: string;
    sortBy?: string;
}

type IOptionsResult = {
    page: number;
    limit: number;
    skip: number;
    sortBy: string;
    sortOrder: string;
}

const paginationSortinghelper = (options: IOptions): IOptionsResult => {
    console.log('Helper received options:', options);
    console.log('options.limit:', options.limit, 'type:', typeof options.limit);

    const page: number = Number(options?.page) || 1;
    const limit: number = Number(options?.limit) || 10;
    
    console.log('Parsed page:', page, 'Parsed limit:', limit);
    const skip = (page - 1) * limit;

    const sortBy: string = options.sortBy || 'createdAt';
    const sortOrder: string = options.sortOrder || 'desc';


    return {
        page,
        limit,
        skip,
        sortBy,
        sortOrder
    }
}

export default paginationSortinghelper;