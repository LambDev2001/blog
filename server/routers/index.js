import authRouter from "./authRouter.js";
import userRouter from "./userRouter.js";
import adminRouter from "./adminRouter.js";
import policyRouter from "./policyRouter.js";
import categoryRouter from "./categoryRouter.js";
import friendRequestRouter from "./friendRequestRouter.js";
import blogRouter from "./blogRouter.js";
import likeRouter from "./likeRouter.js";
import reportRouter from "./reportRouter.js";

const routers = [
  authRouter,
  userRouter,
  adminRouter,
  policyRouter,
  categoryRouter,
  friendRequestRouter,
  blogRouter,
  likeRouter,
  reportRouter,
];

export default routers;
