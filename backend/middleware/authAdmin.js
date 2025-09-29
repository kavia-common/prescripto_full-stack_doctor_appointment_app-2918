import jwt from 'jsonwebtoken'

/**
 * PUBLIC_INTERFACE
 * authAdmin
 * Validate an admin JWT from `token` (or `atoken`) header and attach adminId to req.body.
 * Responds with 401 when token is missing/invalid.
 */
const authAdmin = async (req, res, next) => {
  try {
    const { token, atoken } = req.headers
    const useToken = token || atoken
    if (!useToken) {
      return res.status(401).json({ success: false, message: 'Not Authorized Login Again' })
    }
    const secret = process.env.REACT_APP_JWT_SECRET || process.env.JWT_SECRET
    const tokenDecoded = jwt.verify(useToken, secret)

    // Some implementations compare against ADMIN_EMAIL+ADMIN_PASSWORD; here we keep it simple:
    // Trust JWT validation and pass adminId forward. Upstream issuance controls role.
    req.body.adminId = tokenDecoded.id
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({ success: false, message: error.message })
  }
}

export default authAdmin
