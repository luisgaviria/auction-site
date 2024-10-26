import jwt from "jsonwebtoken";
// import dotenv from 'dotenv';
// dotenv.config();

export const isAuth = (req, res, next) => {
  const authtoken = req.get("Authorization");
  if (!authtoken) {
    const error = new Error();
    error.message = "Not authenticated!";
    error.statusCode = 401;
    throw error;
  }
  const token = authtoken.split(" ")[1];
  let decodeToken;
  try {
    decodeToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }
  if (!decodeToken) {
    const error = new Error();
    error.message = "Not authenticated!";
    error.statusCode = 401;
    throw error;
  }
  req.userId = decodeToken.id;
  // next();
  next();
};
