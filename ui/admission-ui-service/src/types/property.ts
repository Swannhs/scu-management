interface Contact {
    name: string;
    phone: string;
    email: string;
    displayAsPublic: boolean;
}

interface Location {
    lat: string;
    lng: string;
    streetNo: string;
    zipCode: string;
    city: string;
    addressLine1: string;
}

interface EstateGallery {
    originalImageName: string;
    compressedImageName: string;
    blurredImageName: string | null;
    creationDate: string;
    isFeaturedImage: boolean;
}

interface EstateFeature {
    id: string;
    featuresTitle: string;
    featuresTitleDe: string;
    featuresTitleFr: string;
    featuresTitleIt: string;
}

export interface EstateInterface {
    id: string;
    estateAdvertiser: string;
    estateType: string;
    estateAdvertisePurpose: string;
    rooms: number;
    livingArea: number;
    estateAvailabilityPolicy: string;
    estateWillBeAvailable: string;
    estateWillBeAvailableTo: string;
    estatePriceType: string;
    estatePrice: number;
    estateAdditionalPrice: number;
    estateFloor: string;
    estateNumberOfFloor: number;
    estateLotArea: number;
    estateFloorSpace: number;
    estateRoomHeight: number;
    estateYearOfBuilding: number;
    estateYearOfRenovation: number;
    videoUrl: string;
    title: string;
    description: string;
    creationDate: string | null;
    lastModified: string | null;
    userId: string | null;
    contact: Contact;
    location: Location;
    country: string;
    estateGalleries: EstateGallery[];
    estateFeatures: string[];
    estateStickers: any; // adjust type accordingly, currently null in all data
}

export interface EstateSingleInterface {
    id: string;
    estateAdvertiser: string;
    estateType: string;
    estateAdvertisePurpose: string;
    rooms: number;
    livingArea: number;
    estateAvailabilityPolicy: string;
    estateWillBeAvailable: string;
    estateWillBeAvailableTo: string;
    estatePriceType: string;
    estatePrice: number;
    estateAdditionalPrice: number;
    estateFloor: string;
    estateNumberOfFloor: number;
    estateLotArea: number;
    estateFloorSpace: number;
    estateRoomHeight: number;
    estateYearOfBuilding: number;
    estateYearOfRenovation: number;
    videoUrl: string;
    title: string;
    description: string;
    creationDate: string | null;
    lastModified: string | null;
    userId: string | null;
    contact: Contact;
    location: Location;
    country: string;
    estateGalleries: EstateGallery[];
    estateFeatures: EstateFeature[];
}

export interface UserEstateInterface {
    id: string;
    estateAdvertiser: string;
    estateType: string;
    estateAdvertisePurpose: string;
    rooms: number;
    livingArea: number;
    estateAvailabilityPolicy: string;
    estateWillBeAvailable: string;
    estateWillBeAvailableTo: string;
    estatePriceType: string;
    estatePrice: number;
    estateAdditionalPrice: number;
    estateFloor: string;
    estateNumberOfFloor: number;
    estateLotArea: number;
    estateFloorSpace: number;
    estateRoomHeight: number;
    estateYearOfBuilding: number;
    estateYearOfRenovation: number;
    videoUrl: string;
    title: string;
    description: string;
    creationDate: string | null;
    lastModified: string | null;
    userId: string;
    contact: Contact;
    location: Location;
    country: string;
    estateGalleries: EstateGallery[];
    estateFeatures: string[];
    estateStickers: any; //TODO: adjust type accordingly, currently null in all data
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface UserEstatesResponseInterface {
    content: UserEstateInterface[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}
