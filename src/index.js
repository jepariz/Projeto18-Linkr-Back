import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import timelineRoutes from "./routes/timelineRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import hashtagRoutes from "./routes/hashtagRoutes.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use(authRoutes);
app.use(timelineRoutes);
app.use(userRoutes);
app.use(postRoutes);
app.use(hashtagRoutes);

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running in port ${port}`));
