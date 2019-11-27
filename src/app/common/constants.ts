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
        public static readonly FILTERS = [
            { id: 1, text: 'greyscale' },
            { id: 2, text: 'sepia' },
            { id: 3, text: 'invert' },
            { id: 4, text: 'brightness' },
            { id: 5, text: 'hueSaturation' },
            { id: 6, text: 'saturation' },
            { id: 7, text: 'contrast' },
            { id: 8, text: 'clarendon' },
            { id: 9, text: 'gingham' },
            { id: 10, text: 'moon' },
            { id: 11, text: 'lark' },
            { id: 12, text: 'reyes' },
            { id: 13, text: 'juno' },
            { id: 14, text: 'slumber' },
            { id: 15, text: 'crema' },
            { id: 16, text: 'ludwig' },
            { id: 17, text: 'aden' },
            { id: 18, text: 'perpetua' },
            { id: 19, text: 'amaro' },
            { id: 20, text: 'mayfair' },
            { id: 21, text: 'rise' },
            { id: 22, text: 'hudson' },
            { id: 23, text: 'valencia' },
            { id: 24, text: 'xpro2' },
            { id: 25, text: 'sierra' },
            { id: 26, text: 'willow' },
            { id: 27, text: 'lofi' },
            { id: 28, text: 'inkwell' },
            { id: 29, text: 'hefe' },
            { id: 30, text: 'nashville' },
            { id: 31, text: 'stinson' },
            { id: 32, text: 'vesper' },
            { id: 33, text: 'earlybird' },
            { id: 34, text: 'brannan' },
            { id: 35, text: 'sutro' },
            { id: 36, text: 'toaster' },
            { id: 37, text: 'walden' },
            { id: 38, text: '1977' },
            { id: 39, text: 'kelvin' },
            { id: 40, text: 'maven' },
            { id: 41, text: 'ginza' },
            { id: 42, text: 'skyline' },
            { id: 43, text: 'dogpatch' },
            { id: 44, text: 'brooklyn' },
            { id: 45, text: 'helena' },
            { id: 46, text: 'ashby' },
            { id: 47, text: 'charmes' }
        ];
    }
    export class SliderConfig {
        public static readonly SLIDERPARAMS = {
            'slidesToShow': 3,
            'slidesToScroll': 1,
            'nextArrow': '<div class="nav-btn next-slide material-icons">arrow_forward</div>',
            'prevArrow': '<div class="nav-btn prev-slide material-icons">arrow_back</div>',
            'infinite': false,
            'responsive': [{
                'breakpoint': 768,
                'settings': {
                    'slidesToShow': 2,
                    'slidesToScroll': 1
                }
            }]
        };
    }
}
