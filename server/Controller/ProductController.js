import { Product } from '../Models/ProductModel.js';
import ErrorResponse from '../Utils/ErrorHandler.js';
import ApiFeatures from '../Utils/ApiFeatures.js';

const ProductController = {

    createProduct : async (req, res, next) => {
        try{
            req.body.user = req.savedUser._id
            const newProduct = await Product.create(req.body);

            return res.json({
                status: 200,
                success: true,
                message: 'Product successfully created',
                newProduct
            })
        } catch(err){
            console.log(err);
            return next
                (new ErrorResponse('Server error', 500))
        }
    },

    updateProduct: async (req, res, next ) => {
        try{
            const productUpdate = await Product.findByIdAndUpdate(
                                            req.params.id, 
                                            req.body, {
                                                new: true,
                                                runValidator: true,
                                                useFindAndModify: false
                                            });
    
            if(!productUpdate){
                return next
                    (new ErrorResponse('Product Not Found', 404))
            } else {
                return res.json({
                status: 200,
                success: true,
                message: 'Product updated successfully',
                productUpdate
            })
        }
        }catch(err){
            console.log(err);
            return next
                (new ErrorResponse('Server error', 500))
        }
    },

    getProduct: async (req, res, next) => {
        try{
            const oneProduct = await Product.findById(req.params.id);

            if(!oneProduct){
                return next
                    (new ErrorResponse('Product Not Found', 404))
            } else {
                return res.json({
                status: 200,
                success: true,
                oneProduct
            })
        }
        }catch(err){
            console.log(err);
            return next
                (new ErrorResponse('Server error', 500))
        }
    },

    getAllProducts: async (req, res, next) => {
        try{

            const resultPerPage = 5;
            const countProduct = await Product.countDocuments()

            const apiFeature = new ApiFeatures(Product.find(), req.query)
                .search()
                .filter()
                .pagination(resultPerPage);

            let findProduct = await apiFeature.query

            if(findProduct){
                return res.json({
                    status: 200,
                    success: true,
                    findProduct,
                    countProduct
                })
            }
        } catch(err){
            console.log(err);
            return next
                (new ErrorResponse('Server error', 500))
        }
    },

    deleProduct: async (req, res, next) => {
        try{

            let delProduct = await Product.findByIdAndDelete(req.params.id);

            if(!delProduct){
                return next
                    (new ErrorResponse('Product Not Found', 404))
            } else {
                return res.json({
                    status: 200,
                    success: true,
                    message: 'Product Deleted Successfully'
                })
            }

        } catch (err){
            console.log(err);
            return next
                (new ErrorResponse('Server error', 500))
        }
    }
}

export default ProductController;