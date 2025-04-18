import Subscription from "../models/subscription.model.js";

export const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });

    // Log the subscription before saving to check the renewalDate
    console.log("Subscription before save:", subscription);

    await subscription.save();

    res.status(201).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};
