import jwt from 'jsonwebtoken'

/**
 * PUBLIC_INTERFACE
 * authUser
 * Validate a user JWT from `token` header and attach userId to req.body.
 * Responds with 401 when token is missing/invalid.
 */
const authUser = async (req, res, next) => {
  const { token } = req.headers
  if (!token) {
    return res.status(401).json({ success: false, message: 'Not Authorized Login Again' })
  }
  try {
    const secret = process.env.REACT_APP_JWT_SECRET || process.env.JWT_SECRET
    const tokenDecoded = jwt.verify(token, secret)
    req.body.userId = tokenDecoded.id
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({ success: false, message: error.message })
  }
}

export default authUser
