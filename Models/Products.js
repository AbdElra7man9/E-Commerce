import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    des: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    quentity: {
        type: Number,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    numofview: {
        type: Number,
    },
    rating: {
        type: Number,
    }
},
    { timestamps: true }
);
const Products = mongoose.model('Users', ProductSchema);
export default Products;