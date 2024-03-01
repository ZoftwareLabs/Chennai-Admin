import { Router } from 'express';
import { readAllData } from '../fb_config.mjs';
import jwt from 'jsonwebtoken';

const router = Router();


router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const adminData = await readAllData('admin');
        if (adminData) {
            const matchedUser = Object.values(adminData).find(user => user.username === username && user.password === password);

            if (matchedUser) {
                const userToken = jwt.sign({ username :matchedUser.username }, 'your-secret-key', { expiresIn: '1h' });
                // res.status(200).json({ userToken, userId: user._id });
                res.status(200).json({userToken, username :matchedUser.username });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }

        } else {
            res.status(404).json({ message: 'No data available' });
        }
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
export default router;
// module.exports = router