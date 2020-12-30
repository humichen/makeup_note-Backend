const express = require("express");
const expressAsyncHandler = require("express-async-handler");
const data = require("../data.js");
const MakeupsData = require("../models/makeupsdataModel.js");
const Makeups = require("../models/makeupsModel.js");

const makeupsRouter = express.Router();

//獲取內建資料
makeupsRouter.get(
  "/makeupsdata",
  expressAsyncHandler(async (req, res) => {
    const makeupsdata = await MakeupsData.find({});
    res.send(makeupsdata);
  })
);
//新增內建資料
makeupsRouter.get(
  "/create/makeupsdata",
  expressAsyncHandler(async (req, res) => {
    await MakeupsData.deleteMany({});
    const createdmakeupsdata = await MakeupsData.insertMany(data.makeupsdata);
    res.send({ createdmakeupsdata });
  })
);
//獲取美妝品資料
makeupsRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    const makeups = await Makeups.find({});
    res.send(makeups);
  })
);
//新增美妝資料
makeupsRouter.post(
  "/addmakeups",
  expressAsyncHandler(async (req, res) => {
    const { title,img,time,tag_array,qty,color_code,note } = req.body;
    const newmakeup = new Makeups({
      title,
      img,
      time,
      tag_array,
      qty,
      color_code,
      note
    });
    const makeups = await Makeups.insertMany(newmakeup);
    const allmakeup = await Makeups.find({});
    res.send(allmakeup);
  })
);
//獲取某美妝
makeupsRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const makeup = await Makeups.findById(req.params.id);
    if (makeup) {
      res.send(makeup);
    } else {
      res.status(404).send({ message: "Makeup Not Found" });
    }
  })
);
//刪除美妝品
makeupsRouter.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    Makeups.deleteMany({ _id: req.params.id }, function (err) {
      if(err) console.log(err);
      console.log("Successful deletion");
    });
    const allmakeup = await Makeups.find({});
    res.send(allmakeup);
  })
);
//編輯美妝
makeupsRouter.put(
  "/:id",
  expressAsyncHandler(async (req, res) => {
      const { title,img,time,tag_array,qty,color_code,note } = req.body;
      //                                                         V--- THIS WAS ADDED
      Makeups.findOneAndUpdate({_id: req.params.id}, {
        "title":title,
        "img":img,
        "time":time,
        "tag_array":tag_array,
        "qty":qty,
        "color_code":color_code,
        "note":note
      }, {new: true}, (err, doc) => {
        if (err) {
            console.log("Something wrong when updating data!");
        }
        console.log(doc);
      });
      const allmakeup = await Makeups.find({});
      res.send(allmakeup);
    })
);

module.exports = makeupsRouter;
 