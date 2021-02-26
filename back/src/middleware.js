import UserService from "./modules/user/user.service"

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(" ")[1]
  if (!token) {
    console.log("middleware.js -> 9: No token")
    throw new Error("Unauthorized")
  }
  try {
    const userService = new UserService()
    const users = await userService.getByToken({ token })
    if (users.length > 0 && users[0].token === token) {
      const user = users[0]
      req.user = user
      return next()
    }
    throw new Error("Unauthorized")
  } catch (error) {
    console.log("%cmiddleware.js -> 13 ERROR: e", "background: #FF0000; color:#FFFFFF", error)
    throw error
  }
}

// eslint-disable-next-line import/prefer-default-export
export { authenticateToken }
