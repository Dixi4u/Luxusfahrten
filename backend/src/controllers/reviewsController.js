const reviewController = {};
import reviewModel from "../models/reviews.js";

// SELECT
reviewController.getReviews = async (req, res) => {
  const reviews = await reviewModel.find().populate("idclients");
  res.json(reviews);
};

// INSERT
reviewController.insertReview = async (req, res) => {
  const {idclients, idVehicles, score,comment } = req.body;
  const newReview = new reviewModel({ idclients, idVehicles, score,comment });
  await newReview.save();
  res.json({ message: "review saved" });
};

// DELETE
reviewController.deleteReview = async (req, res) => {
  await reviewModel.findByIdAndDelete(req.params.id);
  res.json({ message: "review deleted" });
};

// UPDATE
reviewController.updateReview = async (req, res) => {
  const { idclients, idVehicles, score,comment } = req.body;
  await reviewModel.findByIdAndUpdate(
    req.params.id,
    { idclients, idVehicles, score,comment },
    { new: true }
  );
  res.json({ message: "review updated" });
};

export default reviewController;
