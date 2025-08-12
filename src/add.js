import mongoose from "mongoose";
import productModel from "./models/productModel.js";
  // তোমার product মডেলের path ঠিক করে দিবে
// createSlug ফাংশন নিচে আছে

function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .trim();
}

async function addSlugToProducts() {
  try {
    await mongoose.connect("mongodb://localhost:27017/shopingsite", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");

    const products = await productModel.find();

    for (const product of products) {
      if (!product.slug || product.slug.trim() === "") {
        const newSlug = createSlug(product.name);
        
        // যদি একই slug ডাটাবেজে থাকে তাহলে আলাদা করতে পারেন নীচের মত
        let slugToUse = newSlug;
        let count = 1;
        while (await productModel.findOne({ slug: slugToUse })) {
          slugToUse = `${newSlug}-${count}`;
          count++;
        }

        product.slug = slugToUse;
        await product.save();
        console.log(`Slug added for "${product.name}": ${product.slug}`);
      }
    }

    console.log("Slug update completed.");
    await mongoose.disconnect();
  } catch (error) {
    console.error("Error updating slugs:", error);
  }
}

addSlugToProducts();
