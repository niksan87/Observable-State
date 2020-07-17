export type ModelState = {
    name: string;
    age: number;
    address: Address;
};

export type Address = {
    street: Street;
    code: number;
}

export type Street = {
    name: string[];
    number: number;
}