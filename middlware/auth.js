const { User, Team } = require('../database/models');

const handleLogin = async (req, res) => {
    const { user, pwd } = req.body;
  
    // Check if username and password are provided
    if (!user || !pwd) {
      return res.status(400).json({ 'message': "Username and password are required" });
    }
  
    try {
      // Find the user by username
      const foundUser = await User.findOne({ where: { user: user } });
  
      if (!foundUser) {
        return res.status(401).json({ 'message': "Unauthorized 1" }); // User not found
      }
  
      // If using hashed passwords, compare with bcrypt
      // const match = await bcrypt.compare(pwd, foundUser.password);
  
      // For plain text comparison (not recommended)
      
  
      if (pwd === foundUser.pwd) {
        // Create a token or session here as per your auth strategy
  
        // Respond with success message
        res.json({ 'success': `User ${user} is logged in` });
      } else {
        res.status(401).json({ 'message': "Unauthorized 2" }); // Password does not match
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ 'message': "Internal server error" });
    }
  };

module.exports= handleLogin;