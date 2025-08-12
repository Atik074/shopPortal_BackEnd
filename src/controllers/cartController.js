import cartProductModel from "../models/cartModel.js";
import { errorHandler } from "../utils/errorHandler.js";

export const createCartProducts = async (req, res) => {
  const userId = req.userId;
  const { productId, quantity } = req.body;

  try {
    let userCart = await cartProductModel.findOne({ userId });

    if (userCart) {
      const productIndex = userCart.products.findIndex(
        (product) => product.productId.toString() == productId
      );

      if (productIndex !== -1) {
        return res.status(200).json({ message: "product is already in cart" });
      } else {
        userCart.products.push({
          productId,
          quantity,
        });
        await userCart.save();
        return res
          .status(200)
          .json({ message: "product added into cart cart", userCart });
      }
    } else {
      const newUserCart = new cartProductModel({
        userId,
        products: [
          {
            productId,
            quantity,
          },
        ],
      });
      await newUserCart.save();
      return res
        .status(201)
        .json({ message: "product added successfully", userCart: newUserCart });
    }
  } catch (err) {
    errorHandler(res, "create cart product", err);
  }
};

export const getCartProducts = async (req, res) => {
  const { userId } = req.params;

  try {
    const userCart = await cartProductModel
      .findOne({ userId })
      .populate("products.productId")
      .exec();

    if (!userCart) {
      return res.status(404).json({ message: "userCart does not found" });
    }

    res.status(200).json({ userCart });
  } catch (err) {
    errorHandler(res, "get cart products", err);
  }
};
