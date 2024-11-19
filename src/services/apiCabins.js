import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImage = newCabin.image?.startsWith?.(supabaseUrl);

  // console.log(newCabin.newCabinData.image.name);

  console.log(newCabin);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImage
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  //https://zqdnyimjftndgxtujvcz.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg

  let query = await supabase.from("cabins");

  // 1. Crate/edit new cabin

  //CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  //EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  //2. upload image

  if (hasImage) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3. Deleting the cabin if the image could not be uploaded

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    // console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
