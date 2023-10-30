import Users from "../models/userModel.js";
import Requests from "../models/friendRequestModel.js";
import Rooms from "../models/roomModel.js";

const friendRequestCtl = {
  // user
  listSendingRequest: async (req, res) => {
    try {
      const idUser = req.user.id;

      const listRequest = await Requests.find({ idUser }).select("idUser receiver");
      const friendIds = listRequest.map((request) => request.idUser);

      const allFriends = await Users.find({ _id: { $in: friendIds } }).select(
        "-password -__v -createdAt -updatedAt -report -status -friends -following"
      );
      return res.status(200).json(allFriends);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  listWaitingRequest: async (req, res) => {
    try {
      const idUser = req.user.id;

      const listRequest = await Requests.find({ receiver: idUser }).select("idUser receiver");
      const friendIds = listRequest.map((request) => request.idUser);

      const allFriends = await Users.find({ _id: { $in: friendIds } }).select(
        "-password -__v -createdAt -updatedAt -report -status -friends -following"
      );
      return res.status(200).json(allFriends);
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

      if (!receiver || !receiverUser) return res.json({ msg: "User receiver not found" });

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
      const { idSender } = req.body;

      const sender = await Users.findByIdAndUpdate(
        { _id: idUser },
        { $push: { friends: idSender } }
      );
      const userReceiver = await Users.findByIdAndUpdate(
        { _id: idSender },
        { $push: { friends: idUser } }
      );
      if (!sender || !userReceiver) return res.json({ err: "Some err from back-end" });

      await Requests.findOneAndDelete({ idUser: idSender, receiver: idUser });

      const room = new Rooms({
        nameRoom: "Friend Chat",
        avatarRoom:
          "https://res.cloudinary.com/dfuaq9ggj/image/upload/v1698595035/blog/pngegg_x3qjfr.png",
        idUser,
        member: [idUser, idSender],
        report: [],
      });

      console.log(room);

      room.save();

      return res.status(200).json({ msg: "Accept the request" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  declineRequest: async (req, res) => {
    try {
      const idUser = req.user.id;
      const { idSender } = req.params;

      await Requests.findOneAndDelete({ idUser: idSender, receiver: idUser });

      return res.status(200).json({ msg: "Declined the request" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

export default friendRequestCtl;
