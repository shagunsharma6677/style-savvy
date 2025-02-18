const express = require("express");
const { ProductModel } = require("../models/productModel");

const productRoute = express.Router();

productRoute.get("/", async (req, res) => {
  try {
    const allProduct = await ProductModel.find();
    res.send(allProduct);
  } catch (err) {
    console.log(err);
  }
});

productRoute.get("/:category", async (req, res) => {
  try {
    const { search } = req.query;
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 15;
    const startIndex = (page - 1) * pageSize;
    const order = req.query.order || "asc";
    const sortBy = req.query.sortBy || "discountPrice";

    //Main Query object
    let query = {};

    //For searching functionality
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    //For sorting functionality
    const sortQuery = {};
    if (sortBy) {
      sortQuery[sortBy] = order === "asc" ? 1 : -1;
    }

    // For pagination functionality
    const totalPages = Math.ceil(total / pageSize);
    const total = await ProductModel.find({
      category: req.params.category,
    }).countDocuments(query);

    const allProduct = await ProductModel.find(
      { category: req.params.category },
      query
    )
      .sort(sortQuery)
      .skip(startIndex)
      .limit(pageSize);
    if (allProduct) {
      res.status(200).json({
        totalPages,
        page,
        pageSize,
        allProduct,
        total,
      });
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

// post function
productRoute.patch("/update/:_id", async (req, res) => {
  const { _id } = req.params;
  // console.log("param",param)
  const payload = req.body;
  try {
    const singleProduct = await ProductModel.findByIdAndUpdate(
      { _id: _id },
      payload
    );
    console.log(singleProduct);
    res.status(200).send(singleProduct);
  } catch (err) {
    res.status(400).send(err);
  }
});

productRoute.put("/update/:_id", async (req, res) => {
  const { _id } = req.params;
  // console.log("param",param)
  const payload = req.body;
  try {
    const singleProduct = await ProductModel.findByIdAndUpdate(
      { _id: _id },
      payload
    );
    console.log(singleProduct);
    res.status(200).send(singleProduct);
  } catch (err) {
    res.status(400).send(err);
  }
});

productRoute.delete("/delete/:_id", async (req, res) => {
  const { _id } = req.params;
  // console.log("param",param)
  try {
    const singleProduct = await ProductModel.findByIdAndDelete({ _id: _id });
    console.log(singleProduct);
    res.status(200).send(singleProduct);
  } catch (err) {
    res.status(400).send(err);
  }
});

productRoute.post("/add", async (req, res) => {
  try {
    // console.log(req.body);
    const cart = await new ProductModel(req.body);
    await cart.save();
    console.log("Data Saved", cart);
    res.status(200).send(cart);
    console.log(req.body);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});
//Single Product

productRoute.get("/single/:category/:_id", async (req, res) => {
  const param = req.params;
  console.log("param", param);
  try {
    const singleProduct = await ProductModel.find(param);
    // console.log("AllProduct", allProduct);
    console.log(singleProduct);
    if (singleProduct) {
      res.status(200).send(singleProduct[0]);
    }
  } catch (err) {
    console.log(err);
    res.status(400).send(err);
  }
});

module.exports = { productRoute };
