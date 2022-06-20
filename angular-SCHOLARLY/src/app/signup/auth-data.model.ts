export interface AuthData {
  email?: string;
  username?: string;
  password?: string;
  secretCode?: string;
}

export interface AuthDataInfo {
  Creator?: string;
  username?: string;
  id?: string;
  name?: string;
  gender?: string;
  birthday?: string;
  major?: string;
  minor?: string;
  sport?: string;
  club?: string;
  pronouns?: string;
  CodeCompleted?: string;
  CodePursuing?: string;
  //  Which one to grab for the view?
  // profilePic?: File;
  ProfilePicPath?: string;
  //
  // showCase?: File;
  ShowCasePath?: string;
  followers?: string;
  followings?: string;
}
