export enum QUERY_KEYS {
  // AUTH KEYS
  CREATE_USER_ACCOUNT = "createUserAccount",

  // USER KEYS
  GET_CURRENT_USER = "getCurrentUser",
  GET_USERS = "getUsers",
  GET_USER_BY_ID = "getUserById",

  // POST KEYS
  GET_LINKS = "getPosts",
  GET_LINK_BY_ID = "getPostById",
  GET_LINK_BY_SLUG = "getLinkBySlug",
  GET_USER_LINKS = "getUserPosts",
  VALIDATE_LINK = "validateLink",
  GET_FILE_PREVIEW = "getFilePreview",

  //  SEARCH KEYS
  SEARCH_LINKS = "getSearchPosts",
}
