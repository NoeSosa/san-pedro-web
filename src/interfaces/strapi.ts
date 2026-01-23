import type { BlocksContent } from '@strapi/blocks-react-renderer';

// --- Core Strapi Types ---

export interface StrapiMeta {
    pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
    };
}

export interface StrapiResponse<T> {
    data: T;
    meta: StrapiMeta;
}

export type StrapiData<T> = T & {
    id: number;
    documentId: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
};

export interface StrapiImageFormat {
    name: string;
    hash: string;
    ext: string;
    mime: string;
    path: string | null;
    width: number;
    height: number;
    size: number;
    sizeInBytes: number;
    url: string;
}

export interface StrapiImageAttributes {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
        thumbnail?: StrapiImageFormat;
        small?: StrapiImageFormat;
        medium?: StrapiImageFormat;
        large?: StrapiImageFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any;
    createdAt: string;
    updatedAt: string;
}

export interface StrapiMedia {
    data: StrapiData<StrapiImageAttributes> | null;
}

export interface StrapiMediaArray {
    data: StrapiData<StrapiImageAttributes>[];
}

// --- Domain Models ---

export interface EtiquetaAttributes {
    nombre: string;
    color: string;
    createdAt: string;
    updatedAt: string;
}

export interface NoticiaAttributes {
    titulo: string;
    slug: string;
    fecha_publicacion: string; // ISO Date string
    contenido: BlocksContent; // Rich Text Blocks
    Destacado: boolean;
    imagen_destacada: StrapiData<StrapiImageAttributes>[] | null;
    etiquetas: StrapiData<EtiquetaAttributes>[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export interface TradicionAttributes {
    titulo: string;
    slug: string;
    descripcion: string;
    contenido: BlocksContent;
    imagen_principal: StrapiData<StrapiImageAttributes>[] | null;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}

export type DocumentoCategoria = 'actas' | 'finanzas' | 'obras' | 'otros';

export interface DocumentoAttributes {
    titulo: string;
    fecha: string;
    archivo: StrapiMedia;
    categoria: DocumentoCategoria;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
}
