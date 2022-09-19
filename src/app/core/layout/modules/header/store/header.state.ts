export interface HeaderState {
    menuList: Menu[]
}

export interface Menu {
    name: string;
    url: string;
    isSelect?: boolean;
    isShow?: boolean;
}