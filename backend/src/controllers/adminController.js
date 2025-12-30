import * as AdminService from "../services/adminService.js";

export async function getAllApplications(req, res, next) {
  try {
    const apps = await AdminService.listAllApplications();
    res.json(apps);
  } catch (err) {
    next(err);
  }
}

export async function changeStatus(req, res, next) {
  try {
    const updated = await AdminService.updateApplicationStatus(
      req.params.id,
      req.body.status
    );
    res.json({ message: "Status updated", application: updated });
  } catch (err) {
    next(err);
  }
}

export async function getAllFeedback(req, res, next) {
  try {
    const feedbacks = await AdminService.listAllFeedback();
    res.json(feedbacks);
  } catch (err) {
    next(err);
  }
}
