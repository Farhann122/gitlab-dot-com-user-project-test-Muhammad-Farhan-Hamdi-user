import axios from 'axios';

const API_URL = '/api/ideas';

export const fetchIdeas = async (page, size, sort) => {
  const res = await axios.get(API_URL, {
    params: {
      'page[number]': page,
      'page[size]': size,
      append: ['small_image', 'medium_image'],
      sort
    }
  });
  return res.data;
};
