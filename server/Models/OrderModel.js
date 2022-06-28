import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const orderSchema = new Schema(
    {

    }
)

export const Order = model('Order', orderSchema);
