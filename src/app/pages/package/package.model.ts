export interface Category {
    id:number,
    name:string,
    created_at:any
}

export interface SubCategory {
    id:number,
    category_id:string,
    subcategory:any,
    created_at:any
}

export interface Package {
    id:number,
    package:string,
    subcategory:any,
    month:any,
    nop:any,
    pdf:any,    
    status:any
}