import jwt from "jsonwebtoken"

const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "")

    if (!token) {
      return res.status(401).json({ message: "Authentication required" })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret")
    req.userId = decoded.userId

    next()
  } catch (error) {
    res.status(401).json({ message: "Invalid token" })
  }
}

export default auth

