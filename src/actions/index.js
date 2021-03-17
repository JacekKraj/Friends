export {
  register,
  logout,
  authenticate,
  authenticationStart,
  authenticationFail,
  authenticationEnd,
  registerStart,
  registerFail,
  registerEnd,
} from "./authentication";

export { setDefaultUserData } from "./userData";

export { addUserPost, setNewPostLoading, getUsersPosts, setGetPostsLoading, removePost } from "./posts";
