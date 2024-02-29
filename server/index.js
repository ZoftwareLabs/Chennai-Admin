import express from "express";
import cors from "cors";
import authRoute from "./routes/auth.js";
import adminRoute from "./routes/adminRoute.js";
import { getDatabase, ref, push, get, set, update, remove } from "firebase/database";