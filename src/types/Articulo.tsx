export interface Articulo {
    id: number;
    nombre: string;
    precio: number;
    rating: number;
    stock: number;
    descripcion: string;
    imagen: string;
    review: number;
    
    idcategoria: number;
    nombrecategoria: string;
    imagencategoria: string;
    total: number;
}