// imports
import express from "express";
import ListedItem from "../models/listItem.js";
import {
  postList,
  getListedItem,
  deleteList,
  editList,
  markAsDone,
  restoreTodoItem,
} from "../controllers/todolistController.js";

const router = express.Router();
// DISPLAY ALL ITEMS
router.get("/", getListedItem);

// POST ITEM
router.post("/", postList);

//EDIT SELECTED ITEM
router.post("/edit/:id", editList);

//DELETE SELECTED ITEM
router.post("/delete/:id", deleteList);

//MARK AS DONE ITEM
router.post("/done/:id", markAsDone);

//RESTORE TODO ITEM
router.post("/restore/:id", restoreTodoItem);

//404 PAGE
router.use((req, res) => {
  res.status(404).render("404", { title: "404 Page" });
});

export default router;
