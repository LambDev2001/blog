import Views from "../models/viewModel.js";

const viewCtrl = {
  increaseView: async (req, res) => {
    try {
      const idBlog = req.params.id;
      const view = await Views.findOne({ idBlog });
      const currentYear = new Date().getFullYear();
      const currentMonth = new Date().getMonth();
      if (
        currentYear !== view.updatedAt.getFullYear() ||
        currentMonth !== view.updatedAt.getMonth()
      ) {
        view.viewMonthly = 0;
      }

      view.viewMonthly++;
      view.view++;
      console.log(view);
      await view.save();

      return res.status(200).json({ msg: "increased view" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  mostView: async (req, res) => {
    try {
      const view = await Views.find().sort({ view: -1 }).limit(5);
      return res.status(200).json(view);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  mostViewMonthly: async (req, res) => {
    try {
      const view = await Views.find().sort({ viewMonthly: -1 }).limit(5);
      return res.status(200).json(view);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default viewCtrl;
