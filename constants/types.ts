export type playerType = { name: string; turns: number; sips: number }[];

export type packType = [singlePackType | null];

export type singlePackType = {
    id: number,
    name: string,
    description: string,
    owns: boolean,
    price_id: number,
    status: number,
    activities: number
};