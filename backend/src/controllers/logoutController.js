const logout = {}

logout.logout = async (req, res) => {
    res.clearCookie("authToken")
    res.json({ message: "Logged out successfully" })
}

export default logout