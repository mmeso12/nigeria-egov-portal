import * as FeedbackService from "../services/feedbackService.js";

export async function createFeedback(req, res, next) {
  try {
    const fb = await FeedbackService.submitFeedback(req.user.id, req.body.message);
    res.status(201).json({ message: "Feedback submitted", feedback: fb });
  } catch (err) {
    next(err);
  }
}

export async function myFeedback(req, res, next) {
  try {
    const list = await FeedbackService.getUserFeedback(req.user.id);
    res.json(list);
  } catch (err) {
    next(err);
  }
}
