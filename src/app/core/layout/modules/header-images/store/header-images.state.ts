export interface HeaderImagesState {
    headerImages: Image[]
}

export interface Image {
    id?: number;
    url: string;
    title: string;
    content: string;
}