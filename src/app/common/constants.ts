export module Generalparameters {
    export class ApiConstants {
        public static readonly BASEURL: string = 'https://api.unsplash.com';
        public static readonly APIKEY: string = '?client_id=061c51148e8b602c992064482ba158499083625ae7139aee5d6bda6e2c895c96';
        // 80c4c536403e65bc0651d0b3b116904ff9da875406e68a509c2d65346b418d65
        public static readonly PHOTOS: string = '/photos';
        public static readonly COLLECTIONS: string = '/collections';
        public static readonly SEARCH: string = '/search/photos';
        public static readonly SEARCHQEURY: string = '&query=';
        public static readonly PAGESIZE: string = '&per_page=30';
        public static readonly ORDERBY: string = '&order_by=';
        public static readonly USERS: string = '/users';
        public static readonly LOCALSTORAGE: string = 'favImages';
    }

    export class EditInitparameters {
        public static readonly TEXTTITLE: string = '';
        public static readonly FONTSIZE: number = 40;
        public static readonly FONTCOLOR: string = '#000';
        public static readonly FONTFAMILY: string = 'Open Sans,Arial,Raleway,Tangerine';
    }
}