/** @format */

import { supabase } from "../utils/supabase";

export interface Cabins {
    id?: number | null;
    name: string;
    regularPrice: number;
    maxCapacity: number;
    discount: number;
    description: string;
    image: string;
}

export async function getAllCabins() {
    try {
        let { data: cabins }: { data: Cabins[] | null } = await supabase
            .from("cabins")
            .select("*");

        return cabins;
    } catch (error) {
        console.error(error);
    }
}

export async function createCabin(data: Cabins) {
    try {
        const { data: createdCabin, error } = await supabase
            .from("cabins")
            .insert([{ ...data }])
            .select();

        if (error) {
            throw new Error("Cabin could not be created");
        }

        return createdCabin;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
