import Products from "../Models/Products.js";
import * as cloudinary from 'cloudinary'
export const UploadProduct = async (req, res) => {
    try {
        const { name, price, stock, des, brand, category, image } = req.body
        // if ( !name || !price || !stock || !des || !brand ) {
        //     return res.status(400).json({ msg: 'Please fill all fields' });
        // }
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
            secure: true
        });
        const result = cloudinary.uploader.upload(image, {
            folder: "E-commerce",
        })
        new Products({
            name, price, stock, des, brand, category, image: {
                public_id: result.public_id,
                url: result.secure_url
            }
        })
            .save()
            .then(Uploaded_Product => {
                return res.status(200).json({ msg: 'Product uploaded successfully', Uploaded_Product });
            }).catch(error => {
                return res.status(500).json({ msg: error.message })
            })
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
export const Fetch_Products = async (req, res) => {
    try {
        const Product = await Products.find();
        return res.status(200).json(Product);
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
export const Fetch_ProductDetails = async (req, res) => {
    try {
        const Product = await Products.findById(req.params.id);
        if (!Product) {
            return res.status(400).json({ msg: 'Product Not Founded' });
        } else {
            return res.json(Product);

        }
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
export const Update_Product = async (req, res) => {
    try {
        const Product = await Products.findById(req.params.id);
        if (!Product) {
            return res.status(400).json({ msg: 'Product Not Founded with this Id' });
        } else {
            const Product = await Products.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidators: true,
                useUnified: true,
            });
            return res.json(Product);

        }
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}
export const Delete_Product = async (req, res) => {
    try {
        const Product = await Products.findById(req.params.id);
        if (!Product) {
            return res.status(400).json({ msg: 'Product Not Founded with this Id' });
        } else {
            await Products.findByIdAndRemove(req.params.id, req.body, {
                new: true,
                runValidators: true,
                useUnified: true,
            });
            return res.status(200).json({ msg: 'Product deleted successfully' });


        }
    } catch (error) {
        return res.status(500).json({ msg: error.message })
    }
}