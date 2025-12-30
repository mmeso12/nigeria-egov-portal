import * as AuthService from "../services/authService.js";

export async function registerUser(req, res, next) {
  try {
    const user = await AuthService.register(req.body);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    next(err);
  }
}

export async function loginUser(req, res, next) {
  try {
    const token = await AuthService.login(req.body);
    res.json({ message: "Login successful", token });
  } catch (err) {
    next(err);
  }
}

export async function getProfile(req, res, next) {
  try {
    const user = await AuthService.getUserById(req.user.id);
    res.json(user);
  } catch (err) {
    next(err);
  }
}
