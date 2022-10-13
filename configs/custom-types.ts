export type TRole = 'editor' | 'writer' | 'reader';

export type TBoardLogoLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type TBoardCoverLevel = 0 | 1 | 2 | 3 | 4 | 5;
export type TProfilePictureLevel = 0 | 1 | 2 | 3 | 4 | 5 | 6;
export type TArticleThumbnailLevel = 0 | 1 | 2 | 3;

export type TFollowRelationship = 'me' | 'following' | 'notFollowing' | 'notSet';
export type TSubcribe = 'subscribing' | 'notSubscribing' | 'notSet';

export type TSearch = 'articles' | 'boards' | 'users';

export type TAuthState = 'none' | 'done';

export type TUserState = 'initial' | 'activated' | 'archived' | 'banned';

export interface IQuery {
    lastId?: string;
    filter?: string;
    sortOrder?: string | number;
    sortField?: string;
    limit?: string | number;
    page?: string | number;
    pageSize?: string | number;
    keyword?: string;
    searchField?: string | string[];
    tree?: boolean;
}

export interface IProfile {
    _id: string;
    bio: string;
    shortDescription: string;
    country: string;
    dob: number;
    firstName: string;
    followers: string[];
    following: string[];
    subscribing: string[];
    gender: number;
    job: string;
    lastAccessedAt: number;
    lastName: string;
    cover: string[];
    picture: string[];
    username: string;
    bookmarks: IBookmarkedArticle[];
}

export interface IContact {
    _id?: string;
    email?: string;
    name?: string;
    phone?: string;
    website?: string;
    message?: string;
    createdAt?: number;
}

export interface UserPreference {
    language?: string;
    isPublishedProfile?: boolean;
    isPublishedContact?: boolean;
}

export interface IUser {
    _id?: string;
    email?: string;
    uid?: string;
    profile?: IProfile;
    contact?: IContact;
    role?: TRole;
    preferences?: UserPreference;
    state?: TUserState;
    createdAt?: number;
}

export interface IBookmarkedArticle {
    article: IArticle | string;
    createdAt: number;
}

export interface IMeActionForm {
    type: 'follow' | 'unfollow' | 'subscribe' | 'unsubscribe';
    targetProfileId?: string;
    boardId?: string;
}

export interface IShortProfile {
    firstName?: string;
    lastName?: string;
    dob?: number;
    gender?: number;
    country?: string;
    job?: string;
    bio?: string;
}

//-------------Contact-------
export interface IShortContact {
    email: string;
    phone: string;
    website: string;
}

//-----------------Board-----------------------
export interface ICategoryFull {
    articles: IArticle[];
    category: ICategory;
    children?: ICategoryFull[];
}

export interface IBoard {
    about?: string;
    description?: string;
    createdAt?: number;
    email?: string;
    featuredArticle?: IArticle;
    isDeleted?: boolean;
    links?: string[];
    logo?: string[];
    cover?: string[];
    name?: string;
    owner?: string;
    phone?: string;
    slug?: string;
    suggestedArticles?: IArticle[];
    website?: string;
    _id?: string;
    categories?: ICategoryFull[];
}

export interface IUpdateBoard {
    about?: string;
    createdAt?: number;
    email?: string;
    featuredArticle?: string;
    isDeleted?: boolean;
    links?: string[];
    name?: string;
    owner?: string;
    phone?: string;
    suggestedArticles?: string[];
    website?: string;
    description?: string;
}

export interface IQueryBoard {
    sort?: string;
}

//-----------------Category-----------
export interface ICategory {
    name: string;
    parent: string;
    count: number;
    _id: string;
    board: string;
    slug: string;
    children?: ICategory[];
}

export interface INewCategory {
    name?: string;
    parent?: string | null;
}

export interface IUpdateCategory {
    name: string;
    parent: string | null;
}

export interface IQueryCategories {
    _id?: string;
}

//-----------------Article-----------
export interface IArticle {
    _id?: string;
    categories?: ICategory[];
    content?: string;
    reading?: IArticleReading;
    createdAt: number;
    updatedAt: number;
    internalId?: string;
    isDeleted?: boolean;
    slug?: string;
    tags?: { _id: string; name: string }[];
    thumbnailHD?: string[];
    thumbnailSquare?: string[];
    title?: string;
    topics?: ITopic[];
    lastWriter?: IProfile;
    writer?: IProfile;
    board?: IBoard;

    headline?: string;
    description?: string;
    seoDescription?: string;
    property?: string;
    adsConfig?: IArticleAdsConfig;
    likes?: IArticleLike[];
    shouldShowAds?: boolean;
    isPublished?: boolean;
    affiliateProducts?: IAffiliateProduct[];
    apps?: string[] | IApp[];
}

export interface IArticleAdsConfig {
    internalAds?: boolean;
    externalAds?: boolean;
}

export interface IArticleLike {
    userId?: string;
    createdAt?: number;
    ip?: string;
}

export interface INewArticle {
    board?: string;
    title: string;
    topics: string[];
    [key: string]: any;
}

export interface IArticleReading {
    words: number;
    minutes: number;
    seconds: number;
}

export interface IUpdateArticle {
    title?: string;
    headline?: string;
    description?: string;
    content?: string;
    seoDescription?: string;
    property?: string;
    categories?: string[];
    topics?: string[];
    tags?: string[];
    adsConfig?: IArticleAdsConfig;
    affiliateProducts?: string[];
    writer?: string;
    apps?: string[];
    [key: string]: any;
}

export interface IArticleFilters {
    boardSlug?: string;
}

export interface IArticleQuery {
    sortOrder?: 'asc' | 'desc';
    sortField?: '_id' | 'createdAt' | 'updatedAt';
    lastId?: string;
    limit?: number | string;
    page?: number | string;
    pageSize?: number | string;
    scope: 'notSet' | 'individual' | 'board';
    excludingBoard?: string;
    filter?: {
        board?: string;
        topics?: string;
        categories?: string;
        isParentTopic?: boolean;
    };
    ids?: string[];
}

//-------------Tag---------
export interface ITag {
    name?: string;
    parent?: string;
    slug?: string;
    _id?: string;
    description?: string;
}

export interface IUpdateTag {
    name: string;
    description: string;
}

//-------------Comment-------

export interface ICommentLike {
    userId?: string;
    createdAt?: number;
    ip?: string;
    _id?: string;
}

export interface IComment {
    _id?: string;
    articleId?: string;
    content?: string;
    parent?: string;
    user?: IProfile;
    lastUser?: IProfile;
    likes?: ICommentLike[];
    isDeleted?: boolean;
    createdAt?: number;
    updatedAt?: number;
    isReviewed?: boolean;
    isPublished?: boolean;
}

export interface ICommentQuery {
    sortOrder?: 'asc' | 'desc';
    sortField?: '_id' | 'createdAt' | 'updatedAt';
    lastId?: string;
    limit?: number;
    filter?: { parent?: string; articleId?: string; user?: string };
}

//----------topic--------
export interface ITopic {
    _id?: string;
    name?: string;
    description?: string;
    slug?: string;
    internalId?: string;
    parent?: string | ITopic | null;
    count?: number;
    order?: number;
    thumbnail?: string;
    createdAt?: number;
    updatedAt?: number;
    isCollaboratorOnly?: boolean;
    children?: ITopic[];
}

export interface IParentTopic extends ITopic {
    children?: ITopic[];
}

export interface IUpdateTopic {
    name?: string;
    description?: string;
    isPublished?: boolean;
}

//------------affiliate product-------------

export interface IAffiliateProduct {
    _id?: string;
    title?: string;
    headline?: string;
    keywords?: string;
    description?: string;
    loads?: number;
    thumbnailSquare?: string[];
    thumbnailHD?: string[];
    shopData?: IShopData[];
    createdAt?: number;
    isPublished?: boolean;
    clicks?: IClick[];
    originalPrice?: number;
    salePrice?: number;
    [index: string]: any;
}

export interface IClick {
    userId?: string;
    articleId?: string;
}

export interface IShopData {
    affiliateLink?: string;
    shopId?: string;
    productId?: string;
    shopType?: string;
    originalPrice?: number;
    salePrice?: number;
    queryablePrice?: boolean;
    anchorText?: string;
    isPublished?: boolean;
}

//-----------------Post-----------
export interface IPost {
    board?: IBoard;
    categories?: ICategory[];
    content?: string;
    reading?: IPostReading;
    createdAt?: number;
    updatedAt?: number;
    internalId?: string;
    isDeleted?: boolean;
    lastWriter?: IProfile;
    slug?: string;
    tags?: { _id: string; name: string }[];
    thumbnailHD?: string[];
    thumbnailSquare?: string[];
    title?: string;
    topics?: ITopic[];
    writer?: IProfile;
    _id?: string;

    headline?: string;
    description?: string;
    seoDescription?: string;
    property?: string;
    adsConfig?: IPostAdsConfig;
    likes?: IPostLike[];
    shouldShowAds?: boolean;
    isPublished?: boolean;
    affiliateProducts?: IAffiliateProduct[];

    [key: string]: any;
}

export interface IPostAdsConfig {
    internalAds?: boolean;
    externalAds?: boolean;
}

export interface IPostLike {
    userId?: string;
    createdAt?: number;
    ip?: string;
}

export interface INewPost {
    board?: string;
    title: string;
    topics: string[];
    [key: string]: any;
}

export interface IPostReading {
    words: number;
    minutes: number;
    seconds: number;
}

export interface IUpdatePost {
    title?: string;
    headline?: string;
    description?: string;
    content?: string;
    seoDescription?: string;
    property?: string;
    categories?: string[];
    topics?: string[];
    tags?: string[];
    adsConfig?: IPostAdsConfig;
    affiliateProducts?: string[];
    writer?: string;
    [key: string]: any;
}

export interface IPostFilters {
    boardSlug?: string;
}

export interface IPostQuery {
    sortOrder?: 'asc' | 'desc';
    sortField?: '_id' | 'createdAt' | 'updatedAt';
    lastId?: string;
    limit?: number;
    filter?: {
        board?: string;
        topics?: string;
        categories?: string;
        isParentTopic?: boolean;
    };
}

export interface IPromotion {
    title: string;
    description: string;
    requirement: string;
    objective: string;
    thumbnail: string;
    link: string;
}

// TinyMCE source
export interface BlobInfo {
    id: () => string;
    name: () => string;
    filename: () => string;
    blob: () => Blob;
    base64: () => string;
    blobUri: () => string;
    uri: () => string | undefined;
}

export interface UploadFailureOptions {
    remove?: boolean;
}

export interface IGenre {
    _id: string;
    name: string;
    headline: string;
    internalId?: string;
    parent?: IGenre | string;
    description: string;
    slug: string;
    order: number;
    icon?: string;
    apps?: IApp[];
}

export interface IApp {
    _id: string;
    name: string;
    headline: string;
    description: string;
    slug: string;
    icon: string;
    banner: string;
    share: string;
    microsoftStore?: { appId: string; web: string; app: string };
    price: number;
    salePrice: number;
    how2use: string;
    template: 'wide';
    features: {
        _id: string;
        title: string;
        description: string;
        screenshot: string;
    }[];
    order: number;
    isPublished: boolean;
    isFeatured: boolean;
    isBestSelling: boolean;
    promotion: string[];
    articles: string[] | IArticle[];
}
