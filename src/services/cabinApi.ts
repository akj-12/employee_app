/** @format */

import { supabase, supabaseUrl } from "../utils/supabase";

export interface Cabins {
    id?: number | null;
    name: string;
    regularPrice: number;
    maxCapacity: number;
    discount: number;
    description: string;
    image: any;
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
        const hasImagePath = typeof data.image === "string" && data.image.startsWith(supabaseUrl);

        let imagePath = data.image;
        let imageName = "";
        let imageFile: any = null;

        if (!hasImagePath) {
            // data.image is either a FileList or a File object
            const file = data.image instanceof FileList ? data.image[0] : data.image;
            if (!file) {
                throw new Error("Image file is required");
            }

            const cleanFileName = file.name
                .replaceAll("/", "")
                .replace(/\s+/g, "-")
                .replace(/[^a-zA-Z0-9.\-_]/g, "");
            imageName = `${Math.random()}-${cleanFileName}`;
            imagePath = `${supabaseUrl}/storage/v1/object/public/cabins/${imageName}`;
            imageFile = file;
        }

        // 1. Upload the image first
        if (!hasImagePath && imageFile) {
            const { error: storageError } = await supabase.storage
                .from("cabins")
                .upload(imageName, imageFile);

            if (storageError) {
                console.error("Supabase Storage Upload Error:", storageError);
                throw new Error("Cabin image could not be uploaded, so the cabin was not created.");
            }
        }

        // 2. Insert the cabin record with the image URL
        const { data: createdCabin, error } = await supabase
            .from("cabins")
            .insert([{ ...data, image: imagePath }])
            .select();

        if (error) {
            // 3. Clean up the uploaded image if the cabin insertion fails
            if (!hasImagePath && imageName) {
                await supabase.storage.from("cabins").remove([imageName]);
            }
            throw new Error("Cabin could not be created");
        }

        return createdCabin;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

