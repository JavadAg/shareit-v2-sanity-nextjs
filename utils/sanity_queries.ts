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
      savedBy[]->{
        _id
      },
      comments[]{
        comment,
        _key,
        postedBy->{
        _id,
        userName,
        image
      },
      }
    }`

  return query
}

export const searchPostsQuery = (searchTerm: string | string[]) => {
  const query = `[*[_type in ["post", "user"]]
    [_type == "post" && caption match '${searchTerm}*' || category match '${searchTerm}*']{
      _id,
    } , *[_type == "user" && name match '${searchTerm}*']{
      _id,
    }]`

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
    savedBy[]->{
      _id
    },
    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      image
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
    savedBy[]->{
      _id
    },
    comments[]{
      comment,
      _key,
      postedBy->{
      _id,
      userName,
      image
    },
    }
  }`

  return query
}

export const topicPostsQuery = (topic: string | string[]) => {
  const query = `*[_type == "post" && topic match '${topic}*'] {
      _id,
       caption,
         video{
          asset->{
            _id,
            url
          }
        },
        userId,
      postedBy->{
        _id,
        userName,
        image
      },
   likes,
  
      comments[]{
        comment,
        _key,
        postedBy->{
        _id,
        userName,
        image
      },
      }
    }`

  return query
}
