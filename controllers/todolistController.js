import ListedItem from "../models/listItem.js";

// GET AND DISPLAY ALL TODOLIST IN FRONTEND
export const getListedItem = async (req, res) => {
  try {
    const listedItem = await ListedItem.find();
    res.render("index", { title: "Todo App", listedItem });
  } catch (err) {
    res.status(500).send("An error occured");
    console.log(err);
  }
};

// POST TITLE AND DESCRIPTION IN DATABASE
export const postList = async (req, res) => {
  try {
    const listItem = new ListedItem(req.body);
    await listItem.save();
    req.session.message = {
      type: "#green-700",
      message: "Todo item added successfully, this is updated",
    };
    res.redirect("/");
  } catch (err) {
    res.status(500).json({ message: err.message, type: "danger" });

    console.log("Error saving todo Item", err);
  }
};

//DELETE SELECTED ITEMS IN DATABSE
export const deleteList = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedList = await ListedItem.findByIdAndDelete(id);

    if (!deletedList) {
      res.status(404).json({ message: "user not found", type: "danger" });
    }

    req.session.message = {
      type: "success",
      message: "Item deleted successfully, this is updated",
    };
    console.log("redirect successfully");
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, type: "danger" });
  }
};

// EDIT TODO LIST IN
export const editList = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedList = await ListedItem.findByIdAndUpdate(
      id,
      {
        title: req.body.title,
        description: req.body.description,
        time: req.body.time,
      },
      { new: true }
    );
    req.session.message = {
      type: "success",
      message: "List item Added successfully",
    };
    res.redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message, type: "danger" });
  }
};

//MARK AS DONE - TRIGGER THIS WHEN CLIENT CLICK THE BUTTON AS ITEM TOD IS DONE
export const markAsDone = async (req, res) => {
  try {
    const id = req.params.id;
    const doneItem = await ListedItem.findByIdAndUpdate(
      id,
      {
        isDone: req.body.isDone,
      },
      { new: true }
    );
    if (!doneItem) {
      res.status(404).json({ message: "Item not found", type: "danger" });
    }
    req.session.message = {
      type: "succes",
      message: "Item mark as done successfully",
    };

    res.status(200).redirect("/");
  } catch (err) {
    res.status(500).json({
      message: "An error occured when marking done the item",
      type: "danger",
    });
    console.log(err);
  }
};

// MARK AS UNDONE - USERS ALLOWED TO RESTORE THE DONE ITEM
export const restoreTodoItem = async (req, res) => {
  try {
    const id = req.params.id;
    const undoneItem = await ListedItem.findByIdAndUpdate(
      id,
      { isDone: req.body.isDone },
      { new: true }
    );

    req.session.message = {
      type: "success",
      message: "Restore todo item successfully",
    };

    res.status(200).redirect("/");
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "An error occured when restoring Item",
      type: "danger",
    });
  }
};
