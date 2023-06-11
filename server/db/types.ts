
export type User = {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    isDeleted: boolean;
    createdAt: Date;
    lastModified: Date;
    address: Address;
    company: Company;
}

export type Address = {
    id: number;
    userId: number;
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    lat: string;
    lng: string;
}

export type Company = {
    id: number;
    userId: number;
    companyName: string;
    catchPhrase: string;
    bs: string;
    lastModified: Date;
};

export type Post = {
    id: number;
    userId: number;
    title: string;
    body: string;
    createdAt: Date;
    lastModified: Date;
};

export type Comment = {
    id: number;
    postId: number;
    username: string;
    email: string;
    body: string;
    createdAt: Date;
    lastModified: Date;
};

export type Album = {
    id: number;
    userId: number;
    title: string;
    createdAt: Date;
    lastModified: Date;
};

export type Photo = {
    id: number;
    albumId: number;
    title: string;
    uri: string;
    thumbnailUrl: string;
    createdAt: Date;
    lastModified: Date;
};

export type Todo = {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
    createdAt: Date;
    lastModified: Date;
};
