import Expense from "../models/Expense.js";

export const addExpense = async (req, res) => {
  const { amount, category, date, description } = req.body;

  try {
    if (!amount || !category || !date) {
      return res
        .status(400)
        .json({ message: "Amount, category, and date are required" });
    }

    const expense = await Expense.create({
      user: req.user._id,
      amount,
      category,
      date,
      description,
    });
    res.status(201).json(expense);
  } catch (error) {
    console.error("Add expense error:", error.message);
    res.status(500).json({ message: "Failed to add expense" });
  }
};

export const getExpenses = async (req, res) => {
  const { page = 1, limit = 10, category, startDate, endDate } = req.query;

  try {
    const query = { user: req.user._id };
    if (category) query.category = category;
    if (startDate && endDate) {
      query.date = { $gte: new Date(startDate), $lte: new Date(endDate) };
    }

    const expenses = await Expense.find(query)
      .sort({ date: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));
    const total = await Expense.countDocuments(query);

    res.json({ expenses, total });
  } catch (error) {
    console.error("Get expenses error:", error.message);
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
};

export const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findById(id);
    if (!expense) {
      console.error(`Expense with ID ${id} not found.`);
      return res.status(404).json({ message: "Expense not found" });
    }

    if (expense.user.toString() !== req.user._id.toString()) {
      console.error("Unauthorized attempt to delete expense.");
      return res
        .status(403)
        .json({ message: "Unauthorized to delete this expense" });
    }

    await expense.deleteOne();
    console.log(`Expense with ID ${id} deleted successfully.`);
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error(`Error deleting expense: ${error.message}`);
    res.status(500).json({ message: "Failed to delete expense" });
  }
};


export const getInsights = async (req, res) => {
  try {
    const userId = req.user._id;

    const categoryData = await Expense.aggregate([
      { $match: { user: userId } },
      { $group: { _id: "$category", value: { $sum: "$amount" } } },
      { $project: { category: "$_id", value: 1, _id: 0 } },
    ]);

    const trendData = await Expense.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { _id: 1 } },
      { $project: { date: "$_id", total: 1, _id: 0 } },
    ]);

    res.json({ categories: categoryData, trend: trendData });
  } catch (error) {
    console.error("Get insights error:", error.message);
    res.status(500).json({ message: "Failed to fetch insights" });
  }
};

