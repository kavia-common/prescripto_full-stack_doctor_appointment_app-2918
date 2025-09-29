import jwt from 'jsonwebtoken'

/**
 * PUBLIC_INTERFACE
 * authDoctor
 * Validate a doctor JWT from `token` header and attach doctorId to req.body.
 * Responds with 401 when token is missing/invalid.
 */
const authDoctor = async (req, res, next) => {
  const { token, dtoken } = req.headers
  const useToken = token || dtoken
  if (!useToken) {
    return res.status(401).json({ success: false, message: 'Not Authorized Login Again' })
  }
  try {
    const secret = process.env.REACT_APP_JWT_SECRET || process.env.JWT_SECRET
    const tokenDecoded = jwt.verify(useToken, secret)
    req.body.doctorId = tokenDecoded.id
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({ success: false, message: error.message })
  }
}

export default authDoctor
