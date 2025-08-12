import productModel from "../../models/productModel.js";
import { createSlug } from "./createSlug.js";


export async function generateUniqueSlug(name) {
  let baseSlug = createSlug(name);
  let slug = baseSlug;
  let count = 1;

  while (await productModel.findOne({ slug })) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  return slug;
}
