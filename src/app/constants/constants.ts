import { ImageVM } from '../models/image.model';
export class AppConatants{
  public static readonly BASE_URL = 'https://api.unsplash.com';
  public static readonly API_KEY = '?client_id=061c51148e8b602c992064482ba158499083625ae7139aee5d6bda6e2c895c96';
  public static readonly PAGESIZE: string = '&per_page={pageSize}';
  public static readonly PAGENUMBER: string = '&page={page}';
  public static readonly ORDERBY: string = '&order_by={orderBy}';
  public static readonly DEFAULT_PAGE_SIZE = '12';
  public static readonly DEFAULT_COLLECTION_PAGE_SIZE = '32';
  public static readonly DEFAULT_PAGE_NUMBER = '1';
  public static readonly DEFAULT_ORDER_BY = '';
  public static readonly SEARCH_QUERY: string = '&query={searchQuery}';
  public static readonly RANDOM_IMAGES = this.BASE_URL + "/photos" + this.API_KEY + this.PAGESIZE + this.PAGENUMBER + this.ORDERBY;
  public static readonly COLLECTIONS = this.BASE_URL + "/collections" + this.API_KEY + this.PAGESIZE + this.PAGENUMBER + this.ORDERBY;
  public static readonly SEARCH: string = this.BASE_URL + '/search/photos' + this.API_KEY + this.SEARCH_QUERY +  this.PAGESIZE + this.PAGENUMBER + this.ORDERBY;
  public static readonly COLLECTION_BY_ID = this.BASE_URL + "/collections/{id}/photos" + this.API_KEY + this.PAGESIZE + this.PAGENUMBER + this.ORDERBY;
  public static readonly IMAGES_BY_USER_ID = this.BASE_URL + "/users/{user_id}/photos" + this.API_KEY;
}

export const DailogConfig = {
  panelClass: 'detail-popup',
  height: '100%',
  maxHeight: '100vh',
  minWidth: '100vw',
  autoFocus: false
}

export class EditOptions {
  public static readonly TEXTTITLE: string = '';
  public static readonly FONTSIZE: number = 40;
  public static readonly FONTCOLOR: string = '#000';
  public static readonly FONTFAMILY: string = 'Open Sans, Arial, Roboto, Helvetica, Verdana, Tahoma, Calibri, Candara, Trebuchet MS, Gill Sans';
  public static readonly SOLIDFILTERS: string[] = [
    'greyscale',
    'sepia',
    'invert',
    'brightness',
    'hueSaturation',
    'saturation',
    'contrast'
  ];

  public static readonly FILTERS: string[] = [
    'clarendon',
    'gingham',
    'moon',
    'lark',
    'reyes',
    'juno',
    'slumber',
    'crema',
    'ludwig',
    'aden',
    'perpetua',
    'amaro',
    'mayfair',
    'rise',
    'hudson',
    'valencia',
    'xpro2',
    'sierra',
    'willow',
    'lofi',
    'inkwell',
    'hefe',
    'nashville',
    'stinson',
    'vesper',
    'earlybird',
    'brannan',
    'sutro',
    'toaster',
    'walden',
    'vintage',
    'kelvin',
    'maven',
    'ginza',
    'skyline',
    'dogpatch',
    'brooklyn',
    'helena',
    'ashby',
    'charmes'
  ];
}
