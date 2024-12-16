// Simulated user profile data
const users = [{ email: "test@example.com", phoneNumber: "1234567890" }];

exports.viewProfile = async (req, res) => {
  try {
    const user = users.find((user) => user.email === req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching profile" });
  }
};

exports.updateProfile = async (req, res) => {
  const { email, phoneNumber } = req.body;
  try {
    const user = users.find((user) => user.email === req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error updating profile" });
  }
};
