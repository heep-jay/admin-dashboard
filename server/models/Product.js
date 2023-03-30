import mongoose from "mongoose";

const ProductShema = mongoose.Schema(
    {
        name: String,
        price: Number,
        description: String,
        category: String,
        rating: Number,
        supply: Number,

    }, { timestamps: true })

const Product = mongoose.model("Product", ProductShema)

export default Product;