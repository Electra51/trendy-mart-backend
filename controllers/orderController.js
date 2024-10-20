import orderModel from "../models/orderModel.js";

export const OrderPlaceController = async (req, res) => {
  try {
    const { cart } = req.body;

    // Log the cart to check its structure
    console.log("cart", cart);

    // Check if the cart contains valid product IDs
    const order = new orderModel({ products: cart, buyer: req.user._id });

    // Save the order
    await order.save();

    // Log the order to verify the structure before sending the response
    console.log("Saved order", order);

    res.status(201).send({
      success: true,
      message: "Order Placed Successfully",
      order,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in creating order",
    });
  }
};

//orders
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ buyer: req.user._id })
      .populate("products", "-photo")
      .populate("buyer", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error WHile Geting Orders",
      error,
    });
  }
};

//orders get
// orders get
export const getAllOrdersController = async (req, res) => {
  try {
    const orders = await orderModel
      .find({})
      .populate("products", "-photo")
      .populate("buyer", "name") // Change 'user' to 'buyer' here
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Getting Orders",
      error,
    });
  }
};
