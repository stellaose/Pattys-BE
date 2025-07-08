import { Order } from "../Models/OrderModel.js";
import { Product } from "../Models/ProductModel.js";
import ErrorResponse from '../Utils/ErrorHandler.js';


const updateStock = async (id, quantity) => {
  const product = await Product.findById(id);

  product.stock -= quantity;
  
  await product.save({ validateBeforeSave: false });
}

const OrderController = {
  newOrder: async (req, res, next) => {
    const { 
      shippingInfo, 
      orderItems, 
      paymentInfo, 
      itemPrice, 
      taxPrice, 
      shippingPrice, 
      totalPrice
    } = req.body;

    try {
      const newOrder = await Order.create({
        shippingInfo, 
        orderItems, 
        paymentInfo, 
        itemPrice, 
        taxPrice, 
        shippingPrice, 
        totalPrice,
        paidAt: Date.now(),
        user: req.savedUser._id
      });
    
      res.json({
        status: 200,
        message: 'Order has been created successfully',
        newOrder
      }) 
    } catch (err) {
      return next (err)
    }
  },

  getOneOrder : async (req, res, next) => {
    try {
      const oneOrder = await Order.findById(req.params.id).populate("user", "firstname lastname email");

      if(!oneOrder){
        return next(new ErrorResponse('Order not found', 400))
      }

      res.json({
        status: 200,
        success: true,
        oneOrder
      })
    } catch (err) {
      return next (err)
    }
  },

    // ! Get all orders from a logged in user
  getMyOrders: async (req, res, next) => {
    try {
      const myOrders = await Order.find({user: req.savedUser._id});

      res.json({
        status: 200,
        success: true,
        myOrders
      })
    } catch (err) {
      return next (err)
    }
  },

    //  $ get all orders -- admin route
  getAllOrders: async (req, res, next) => {
    try {
      const allOrders = await Order.find()

      let  totalAmount = 0;

      allOrders.forEach((order) => {
        totalAmount += order.totalPrice;
      })

      res.json({
        status: 200,
        success: true,
        totalAmount,
        allOrders
      })
    } catch (err) {
      return next (err)
    }
  },

  updateOrderStatus: async (req, res, next) => {
    try {
        const updateOrder = await Order.findById(req.params.id);

        if(updateOrder.orderStatus === 'Delivered'){
          return next(new ErrorResponse('This order has been delivered', 400))
        }

        updateOrder.orderItems.forEach(async (order) => {
          await updateStock(order.product, order.quantity)
        })

        updateOrder.orderStatus = req.body.status;

        if(req.body.status === 'Delivered'){
          updateOrder.deliveredAt = Date.now()

        }

        await updateOrder.save({validateBeforeSave: false});
        res.json({
          status: 200,
          success: true
        })

    } catch (err) {
        return next (err)
    }
  },

  // $ delete order -- admin
  deleteOrder: async (req, res, next) => {
    try {
      const delOrder = await Order.findById(req.params.id);

        if(!delOrder){
          return next (new ErrorResponse('Order not found', 400))
        }

        await delOrder.remove();

        res.json({
          status: 200,
          success: true,
          message: 'This order has been deleted successfully'
        })
    } catch (err) {
        return next (err)
    }
  }
}

export default OrderController;