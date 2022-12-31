import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: [ true, 'Please Enter Product Name '],
            trim: true
        },
        size: {
            type: String,
        },
        description: {
            type: String,
            required: [ true, 'Please Enter Product Description']
        },
        price: {
            type: String,
            required: [true, 'Please Enter Product Price']
        },
        ratings: {
            type: Number,
            default: 0
        },
        images:[ 
            {
                public_id: {
                    type: String,
                    required: true
                },
                url: {
                    type: String,
                    required: true
                }
            }
        ],
        category: {
            type: String ,
            required: [true, 'Please Enter Product Category']
        },
        color: {
            type: String,
            required: [true, 'Please Enter Product color']
        },
        stock: {
            type: String,
            required: [true, 'Please Enter product Stock'],
            maxLength: [4, 'Length cannot exceed 4 characters'],
            default: 1
        },
        numOfReviews: {
            type: Number,
            default: 0
        },
        reviews: [
            {
            	user: {
                    type: mongoose.Schema.ObjectId,
                    ref: "User",
                    required: true,
                },
                name: {
                    type: String,
                    required: true,
                },
                rating: {
                    type: Number,
                    required: true,
                },
                comment: {
                    type: String,
                    required: true,
                },
            },
          ],
        
        user: {
           type: mongoose.Schema.ObjectId,
           ref: "User",
           required: true,
        },
        createdAt: {
           type: Date,
           default: Date.now,
        },
        
    }
)

export const Product = model('product', productSchema)