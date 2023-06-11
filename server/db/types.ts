
export type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    isDeleted: boolean;
    createdAt: Date;
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
    name: string;
    catchPhrase: string;
    bs: string;
};
