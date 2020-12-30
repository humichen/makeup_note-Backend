const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const data = require("../data.js");
const Methods = require("../models/methodModel.js");

const methodsRouter = express.Router();

//獲取方法資料
methodsRouter.get(
    "/",
    expressAsyncHandler(async (req, res) => {
      const methods = await Methods.find({});
      res.send(methods);
    })
);
//新增方法資料
methodsRouter.post(
    "/addmethods",
    expressAsyncHandler(async (req, res) => {
      const { title,website,tag_array } = req.body;
      const newmethod = new Methods({
        title,
        website,
        tag_array,
      });
      const methods = await Methods.insertMany(newmethod);
      const allmethod = await Methods.find({});
      res.send(allmethod);
    })
);
//刪除方法
methodsRouter.delete(
    "/:id",
    expressAsyncHandler(async (req, res) => {
      Methods.deleteMany({ _id: req.params.id }, function (err) {
        if(err) console.log(err);
        console.log("Successful deletion");
      });
      const allmethod = await Methods.find({});
      res.send(allmethod);
    })
);
//編輯方法
methodsRouter.put(
    "/:id",
    expressAsyncHandler(async (req, res) => {
        const { title,website,tag_array } = req.body;
        Methods.findOneAndUpdate({_id: req.params.id}, {
          "title":title,
          "website":website,
          "tag_array":tag_array,
        }, {new: true}, (err, doc) => {
          if (err) {
              console.log("Something wrong when updating data!");
          }
          console.log(doc);
        });
        const allmethod = await Methods.find({});
        res.send(allmethod);
      })
  );
module.exports = methodsRouter;
