import Users from "../models/userModel.js";
import Requests from "../models/friendRequestModel.js";

const friendRequestCtl = {
  // user
  listSendingRequest: async (req, res) => {
    try {
      const idUser = req.user.id;

      const listRequest = await Requests.find({ idUser }).select("idUser receiver");
      return res.status(200).json(listRequest);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  listWaitingRequest: async (req, res) => {
    try {
      const idUser = req.user.id;
      const listRequest = await Requests.find({ receiver: idUser }).select("idUser receiver");
      return res.status(200).json(listRequest);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  sendRequest: async (req, res) => {
    try {
      const idUser = req.user.id;
      const user = await Users.findOne({ _id: idUser });

      const { receiver } = req.body;
      const receiverUser = await Users.findOne({ _id: receiver });
      if (!receiver || !receiverUser)
        return res.json({ msg: "User receiver not found" });

      const friends = user.friends;
      if (friends.indexOf(req.user.id) !== -1) {
        return res.json({ msg: "They has been add friend before" });
      }

      const oldRequest = await Requests.findOne({ idUser, receiver });
      if (oldRequest) return res.json({ msg: "Request has been create" });

      const newRequest = new Requests({ idUser, receiver });
      await newRequest.save();

      return res.status(200).json({ msg: `Sent request add friend to ${receiverUser.username}` });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  acceptRequest: async (req, res) => {
    try {
      const idUser = req.user.id;
      const { idRequest } = req.params;

      const request = await Requests.findOne({
        _id: idRequest,
      });
      if (!request) return res.json({ msg: "This quest does not exit" });

      const sender = await Users.findByIdAndUpdate(
        { _id: idUser },
        { $push: { friends: request.receiver } }
      );
      const userReceiver = await Users.findByIdAndUpdate(
        { _id: request.receiver },
        { $push: { friends: idUser } }
      );
      if (!sender || !userReceiver) return res.json({ msg: "Some err from back-end" });

      return res.status(200).json({ msg: "Accept the request" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  declineRequest: async (req, res) => {
    try {
      const idUser = req.user.id;
      const { idRequest } = req.params;

      const result = await Requests.findOneAndDelete({
        _id: idRequest,
      });
      if (!result) return res.json({ msg: "This quest does not exit" });

      return res.status(200).json({ msg: "Declined the request" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default friendRequestCtl;
