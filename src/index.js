import express from 'express';
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"

const app = express()
app.use(express.json());
app.use(cors());

app.use(authRoutes)

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running in port ${port}`));