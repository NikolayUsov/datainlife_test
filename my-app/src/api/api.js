import axios from 'axios';

export const fetchData = async () => {
  try {
    const response = await axios.get('https://datainlife.ru/junior_task/get_products.php');
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
};

export const postData = async (data) => {
  try {
    const responce = await axios.post('https://datainlife.ru/junior_task/add_basket.php', data);
    console.log(responce);
    return responce.data;
  } catch (error) {
    throw new Error(error);
  }
};
