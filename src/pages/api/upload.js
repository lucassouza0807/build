import { writeFileSync } from 'fs';
const path = require("path");

export default function handler(req, res) {
    try {
        const base64String = req.body.base_64;

        const filePath = path.join("public/uploads", `${req.body.name}`);

        const base64Data = base64String.replace(/^data:([A-Za-z-+/]+);base64,/, '');

        writeFileSync(filePath, base64Data, { encoding: 'base64' });

        return res.status(200).json(filePath)
    } catch (error) {
        return res.status(200).json({ error: error.message })
    }


}