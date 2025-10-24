export type playerType = { name: string; turns: number; sips: number }[];

export type packType = [{
    id: number,
    name: string,
    description: string,
    owns: boolean,
    price: number,
    status: number
} | null];