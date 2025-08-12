import { generateUniqueSlug } from "../lib/utils/generateUniqueSlug.js";
import productModel from "../models/productModel.js";
import { errorHandler } from "../utils/errorHandler.js";
import { handleEmptyProducts } from "../utils/handleEmptyProducts.js";

export const getProducts = async (req, res) => {
  try {
    const products = await productModel.find().limit(8);
  
    res.json({ products });
  } catch (err) {
     errorHandler(res , "get Products" , err)
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Product name is required" });
    }

    const slug = await generateUniqueSlug(name);
    const product = new productModel({ ...req.body, slug });
    const result = await product.save();

    res.status(201).json(result);
  } catch (err) {
    errorHandler(res, "create product", err);
  }
};

export const getNewArrivals = async (req, res) => {
  try {
    const products = await productModel
      .find()
      .sort({
        createdAt: -1,
      })
      .limit(4);

    if (handleEmptyProducts(res, products, "get arrival products not found"))
      return;

    res.status(200).json({ products });
  } catch (err) {
     errorHandler(res , "new arrival products" , err)
    
  }
};

export const topSalesProducts = async (req, res) => {
  try {
    const products = await productModel.find().sort({ sold: -1 }).limit(4);

      if (handleEmptyProducts(res, products, "get arrival products not found"))
      return;
    
    res.status(200).json({ products });
  } catch (err) {
      errorHandler(res , "top sales products" , err)
  
  }
};

export const getSingleProduct = async(req,res)=>{
   const {slug}= req.params 

   
   
  try{
      const product = await productModel.findOne({slug})

      if(!product){
        return res.status(400).json({message:"product is not found"})
      }

      res.status(200).json({product})
  }catch(err){
    errorHandler(res , "single product" , err)
  }

}
