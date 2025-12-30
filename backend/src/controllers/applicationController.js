import * as AppService from "../services/applicationService.js";

export async function create(req, res, next) {
  try {
    const app = await AppService.createApplication(req.user.id, req.body);
    res.status(201).json({ message: "Application submitted", application: app });
  } catch (err) {
    next(err);
  }
}

export async function myApplications(req, res, next) {
  try {
    const apps = await AppService.getUserApplications(req.user.id);
    res.json(apps);
  } catch (err) {
    next(err);
  }
}

export async function statusByTracking(req, res, next) {
  try {
    const app = await AppService.getByTracking(req.params.tracking);
    res.json(app);
  } catch (err) {
    next(err);
  }
}
