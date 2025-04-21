const logout = {}

logout.logout = async (req, res) => {
    res.clearCookie("authtoken")
    res.json({ message: "Logged out successfully" })
}

export default logout