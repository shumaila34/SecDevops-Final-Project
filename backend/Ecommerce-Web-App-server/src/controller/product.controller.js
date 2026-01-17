import User from '../model/users.model.js';
import productModel from "../model/products.models.js";
import mongoose from "mongoose";
import { deleteImageFromCloudinary, uploadImageToCloudinary } from "../utils/cloudinary.utils.js";

// Helper: Validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Helper: Sanitize strings
const sanitizeString = (str) => String(str || "").trim();

// Helper: Convert to ObjectId safely
const toObjectId = (id) => new mongoose.Types.ObjectId(id);

// 🟢 Add Product
const addProduct = async (req, res) => {
  const {
    name,
    description,
    price,
    mobileNumber,
    category,
    location
  } = req.body;

  const userId = req.user?.id;

  if (!name || !description || !userId || !price || !mobileNumber || !category || !location) {
    return res.status(400).json({ error: "All fields including location are required" });
  }

  if (!isValidObjectId(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const postUser = await User.findById(toObjectId(userId));
    if (!postUser) return res.status(404).json({ message: "User not found." });

    if (!req.file) return res.status(400).json({ error: "Product image is required" });

    const postImage = await uploadImageToCloudinary(req.file.buffer);

    const createPosts = await productModel.create({
      name: sanitizeString(name),
      description: sanitizeString(description),
      mobileNumber: sanitizeString(mobileNumber),
      postImage,
      user: toObjectId(userId),
      price: Number(price),
      category: sanitizeString(category),
      location: sanitizeString(location)
    });

    res.status(201).json({ message: "Product added successfully", data: createPosts });

  } catch (error) {
    console.error("Error in addProduct:", error);
    res.status(500).json({ error: error.message });
  }
};

// 🟢 Like/Unlike Product
const likeProduct = async (req, res) => {
  const productId = req.params.id;
  const userId = req.user?.id;

  if (!isValidObjectId(productId) || !isValidObjectId(userId)) {
    return res.status(400).json({ error: "Invalid product or user ID" });
  }

  try {
    const product = await productModel.findById(toObjectId(productId));
    if (!product) return res.status(404).json({ error: "Product not found" });

    const alreadyLiked = product.likes.includes(userId);

    if (alreadyLiked) {
      product.likes = product.likes.filter(id => id.toString() !== userId);
    } else {
      product.likes.push(toObjectId(userId));
    }

    await product.save();

    res.status(200).json({ message: alreadyLiked ? "Product unliked" : "Product liked", likes: product.likes });

  } catch (error) {
    console.error("Like Error:", error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
};

// 🟢 Comment on Product
const commentProduct = async (req, res) => {
  const productId = req.params.id;
  const userId = req.user?.id;
  const { text } = req.body;

  if (!isValidObjectId(productId) || !isValidObjectId(userId)) {
    return res.status(400).json({ error: "Invalid product or user ID" });
  }

  if (!text || text.trim() === "") {
    return res.status(400).json({ error: "Comment text is required" });
  }

  try {
    const product = await productModel.findById(toObjectId(productId));
    if (!product) return res.status(404).json({ error: "Product not found" });

    product.comments.push({ user: toObjectId(userId), text: sanitizeString(text) });
    await product.save();

    const updatedProduct = await productModel.findById(toObjectId(productId))
      .populate("comments.user", "userName email");

    res.status(200).json({ message: "Comment added successfully", comments: updatedProduct.comments });

  } catch (error) {
    console.error("Comment Error:", error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
};

// 🟢 Delete Comment
const deleteComment = async (req, res) => {
  const { productId, commentId } = req.params;
  const userId = req.user?.id;

  if (!isValidObjectId(productId) || !isValidObjectId(commentId) || !isValidObjectId(userId)) {
    return res.status(400).json({ error: "Invalid IDs" });
  }

  try {
    const product = await productModel.findById(toObjectId(productId));
    if (!product) return res.status(404).json({ error: "Product not found" });

    const comment = product.comments.id(commentId);
    if (!comment) return res.status(404).json({ error: "Comment not found" });

    if (comment.user.toString() !== userId) {
      return res.status(403).json({ error: "You are not authorized to delete this comment" });
    }

    product.comments.id(commentId).remove();
    await product.save();

    const updatedProduct = await productModel.findById(toObjectId(productId))
      .populate("comments.user", "userName email");

    res.status(200).json({ message: "Comment deleted successfully", comments: updatedProduct.comments });

  } catch (error) {
    console.error("Delete Comment Error:", error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
};

// 🟢 Get all comments
const getComments = async (req, res) => {
  const productId = req.params.productId;

  if (!isValidObjectId(productId)) return res.status(400).json({ error: "Invalid Product ID" });

  try {
    const product = await productModel.findById(toObjectId(productId))
      .populate("comments.user", "userName email");
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.status(200).json({ comments: product.comments });

  } catch (error) {
    console.error("Get Comments Error:", error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
};

// 🟢 Single Product (Private)
const singleProduct = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return res.status(400).json({ error: "Invalid Product ID" });

  try {
    const product = await productModel.findById(toObjectId(id));
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// 🟢 Public Single Product
const publicSingleProduct = async (req, res) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) return res.status(400).json({ error: "Invalid Product ID" });

  try {
    const product = await productModel.findById(toObjectId(id))
      .populate("user", "name");
    if (!product) return res.status(404).json({ error: "No product found" });

    res.status(200).json({
      _id: product._id,
      name: product.name,
      description: product.description,
      mobileNumber: product.mobileNumber,
      price: product.price,
      image: product.postImage,
      likes: product.likes,
      category: product.category,
      location: product.location,
      sellerName: product.user.name
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// 🟢 User Products
const userProducts = async (req, res) => {
  const userId = req.user?.id;
  if (!isValidObjectId(userId)) return res.status(400).json({ error: "Invalid User ID" });

  try {
    const products = await productModel.find({ user: toObjectId(userId) });
    if (products.length === 0) return res.status(200).json({ message: "No products posted by this user." });

    res.status(200).json({ message: "User products fetched successfully", data: products });
  } catch (error) {
    console.error("Error fetching user products:", error);
    res.status(500).json({ message: "Something went wrong!", error: error.message });
  }
};

// 🟢 All Products (with pagination + category filter)
const allProducts = async (req, res) => {
  const page = Math.max(parseInt(req.query.page) || 1, 1);
  const limit = Math.max(parseInt(req.query.limit) || 15, 1);
  const category = sanitizeString(req.query.category);
  const skip = (page - 1) * limit;

  try {
    res.setHeader("Cache-Control", "no-store");

    const filter = {};
    if (category) filter.category = category;

    const products = await productModel.find(filter).skip(skip).limit(limit);
    if (products.length === 0) return res.status(200).json({ message: "No products found" });

    res.status(200).json(products);
  } catch (error) {
    console.error("All Products Error:", error.message);
    res.status(500).json({ message: "Something went wrong!" });
  }
};

// 🟢 Delete Product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const userId = req.user?.id;

  if (!isValidObjectId(id) || !isValidObjectId(userId)) return res.status(400).json({ error: "Invalid IDs" });

  try {
    const post = await productModel.findById(toObjectId(id));
    if (!post) return res.status(404).json({ error: "Product not found" });

    if (post.user.toString() !== userId) return res.status(403).json({ error: "This is not your product" });

    await deleteImageFromCloudinary(post.postImage);
    await productModel.findByIdAndDelete(toObjectId(id));

    res.json({ message: "Product successfully deleted" });
  } catch (error) {
    console.error("Delete Error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// 🟢 Update Product
const updateProduct = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { id: productId } = req.params;

    if (!isValidObjectId(productId) || !isValidObjectId(userId)) return res.status(400).json({ error: "Invalid IDs" });

    const product = await productModel.findById(toObjectId(productId)).populate("user");
    if (!product) return res.status(404).json({ message: "Product not found!" });

    if (!product.user || !product.user._id) return res.status(400).json({ message: "Product user not found!" });
    if (String(product.user._id) !== String(userId)) return res.status(403).json({ message: "You are not authorized to edit this product!" });

    product.name = sanitizeString(req.body.name) || product.name;
    product.description = sanitizeString(req.body.description) || product.description;
    product.price = req.body.price ? Number(req.body.price) : product.price;

    await product.save();

    res.status(200).json({ message: "Product updated successfully!", product });
  } catch (error) {
    console.error("Update Product Error:", error.message);
    res.status(500).json({ message: "Something went wrong!", error: error.message });
  }
};

export {
  addProduct,
  allProducts,
  deleteProduct,
  updateProduct,
  singleProduct,
  userProducts,
  publicSingleProduct,
  likeProduct,
  commentProduct,
  deleteComment,
  getComments
};
