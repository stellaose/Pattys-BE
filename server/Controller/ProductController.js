import { Product } from '../Models/ProductModel.js';
import ErrorResponse from '../Utils/ErrorHandler.js';
import ApiFeatures from '../Utils/ApiFeatures.js';
import { Order } from '../Models/OrderModel.js';

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
            
            const getOrder = await Order.findById()

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

    deleteProduct: async (req, res, next) => {
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
    },

    createProductReview : async (req, res, next) => {
        const { rating, comment, productId } = req.body;

        const review = {
            user: req.savedUser._id,
            name: req.savedUser.firstname,
            rating: Number(rating),
            comment,
        };

            
        try{
            const product = await Product.findById(productId);

            const isReviewed = product.reviews.find(
                (rev) => rev.user.toString() === req.savedUser._id.toString()
              );

              console.log(req.savedUser._id)

            if(isReviewed) {
                product.reviews.forEach((rev) => {
                    if (rev.user.toString() === req.savedUser._id.toString())
                    (rev.rating = rating), (rev.comment = comment);
                });
            } else {
                product.reviews.push(review);
                product.numOfReviews = product.reviews.length;
            }

            let avg = 0;

            product.reviews.forEach((rev) => {
                avg += rev.rating;
            }) 
            
            product.ratings = avg/ product.reviews.length

            const savedProduct = await product.save({validateBeforeSave: false});

            res.json({
                status:200,
                success: true,
                savedProduct
              });
            
        } catch(err){
            return next (err)
        }
    },

    getProductReviews : async (req, res, next) => {
        try {
            const productReview = await Product.findById(req.query.id);

            if(!productReview){
                return next
                (new ErrorResponse('Product Not Found', 404))
            }

            res.json({
                status:200,
                success: true,
                reviews: productReview.reviews
              });
        } catch (err) {
            return next (err)
        }
    },

    deleteProductReview: async (req, res, next) => {
        try {
            const product = await Product.findById(req.query.productId);

            if (!product) {
              return next(new ErrorHander("Product not found", 404));
            }
          
            const reviews = product.reviews.filter(
              (rev) => rev._id.toString() !== req.query.id.toString()
            );
          
            let avg = 0;
          
            reviews.forEach((rev) => {
              avg += rev.rating;
            });
          
            let ratings = 0;
          
            if (reviews.length === 0) {
              ratings = 0;
            } else {
              ratings = avg / reviews.length;
            }
          
            const numOfReviews = reviews.length;
          
            await Product.findByIdAndUpdate(
              req.query.productId,
              {
                reviews,
                ratings,
                numOfReviews,
              },
              {
                new: true,
                runValidators: true,
                useFindAndModify: false,
              }
            );
          
            res.json({
                status: 200,
                success: true,
            });          
            
        } catch (err) {
            return next  (err)
        }
    }
}

export default ProductController;