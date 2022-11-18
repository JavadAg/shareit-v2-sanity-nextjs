interface Assets {
  width: number
  height: number
  resource_type: string
  url: string
  _key: string
}

interface PostedBy {
  avatar: string
  name: string
  _id: string
}

interface Comments {
  comment: string
  postedBy: PostedBy
  _key: string
}

interface Likes {
  _key: string
  _ref: string
}

interface SavedBy {
  _id: string
}

interface Followers {
  _id: string
}

interface Following {
  _id: string
}

export interface User {
  avatar: string
  description: string
  followers: Followers[]
  following: Following[]
  name: string
  _id: string
}

export interface PostsType {
  assets: Assets[]
  caption: string
  category: string
  comments: Comments[]
  likes: Likes[]
  postedBy: PostedBy
  savedBy: SavedBy[]
  tags: string[]
  userId: string
  _createdAt: string
  _id: string
}

export interface SavedPosts {
  assets: Assets[]
  caption: string
  category: string
  comments: Comments[]
  likes: Likes[]
  postedBy: PostedBy
  savedBy: SavedBy[]
  tags: string[]
  userId: string
  _createdAt: string
  _id: string
}

export interface UserData {
  user: User
  userPosts: PostsType[]
  userSavedPosts: SavedPosts[]
}
