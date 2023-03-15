export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'recipe',
      title: 'Recipe',
      type: 'array',
      of: [{ type: 'block' }]
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string'
    },
    {
      name: 'userId',
      title: 'UserId',
      type: 'string'
    },
    {
      name: 'postedBy',
      title: 'PostedBy',
      type: 'postedBy'
    },
    {
      title: 'ingredients',
      name: 'Ingredients',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    },
    {
      name: 'likes',
      title: 'Likes',
      type: 'number',
    },
    {
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [{ type: 'comment' }]
    }
  ]

}