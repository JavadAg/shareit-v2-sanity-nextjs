export const getFollowingUserPosts = (id: string | string[]) => {
  const query = `*[_type == "post" && postedBy._ref in ['${id}']] | order(_createdAt desc){
      _id,
      _createdAt,
       caption,
        assets[]{
          resource_type,
          _key,
          url,
          width,
          height
        },
        userId,
        postedBy->{
          _id,
          name,
          avatar
        },
      likes,
      category,
      tags,
      savedBy[]->{
        _id
      },
      comments[]{
        comment,
        _key,
        postedBy->{
        _id,
        name,
        avatar
      },
      }
    }`

  return query
}

export const getAllPosts = () => {
  const query = `*[_type == "post"] | order(_createdAt desc){
      _id,
      _createdAt,
       caption,
        assets[]{
          resource_type,
          _key,
          url,
          width,
          height
        },
        userId,
        postedBy->{
          _id,
          name,
          avatar
        },
      likes,
      category,
      tags,
      savedBy[]->{
        _id
      },
      comments[]{
        comment,
        _key,
        postedBy->{
        _id,
        name,
        avatar
      },
      }
    }`

  return query
}

export const searchUser = (searchTerm: string | string[]) => {
  const query = `*[_type == "user" && name match '${searchTerm}*']{
    _id,
    name,
    avatar
  }`

  return query
}

export const searchTag = (searchTerm: string | string[]) => {
  const query = `*[_type == "post" && tags match '${searchTerm}*'] | order(_createdAt desc){
    _id,
    _createdAt,
     caption,
      assets[]{
        resource_type,
        _key,
        url,
        width,
        height
      },
      userId,
      postedBy->{
        _id,
        name,
        avatar
      },
    likes,
    category,
    tags,
    savedBy[]->{
      _id
    },
    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      name,
      avatar
    },
    }
  }`

  return query
}

export const userQuery = (userId: string | string[]) => {
  const query = `*[_type == "user" && _id == '${userId}']{
    _id,
    avatar,
    name,
    description,
    followers[]->{
      _id
    },
    following[]->{
      _id
    }
  }`

  return query
}

export const userCreatedPostsQuery = (userId: string | string[]) => {
  const query = `*[ _type == 'post' && userId == '${userId}'] | order(_createdAt desc){
    _id,
    _createdAt,
     caption,
      assets[]{
        resource_type,
        _key,
        url,
        width,
        height
      },
      userId,
      postedBy->{
        _id,
        name,
        avatar
      },
    likes,
    category,
    tags,
    savedBy[]->{
      _id
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        name,
        avatar
    },
    }
  }`

  return query
}

export const userSavedPostsQuery = (userId: string | string[]) => {
  const query = `*[_type == 'post' && '${userId}' in savedBy[]._ref ] | order(_createdAt desc) {
    _id,
    _createdAt,
     caption,
      assets[]{
        resource_type,
        _key,
        url,
        width,
        height
      },
      userId,
      postedBy->{
        _id,
        name,
        avatar
      },
    likes,
    category,
    tags,
    savedBy[]->{
      _id
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        name,
        avatar
    },
    }
  }`

  return query
}
