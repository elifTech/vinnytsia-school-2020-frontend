import { ADD_IMG_URL } from '../../constants';

export default function addImgUrl(imgUrl) {
  return {
    type: ADD_IMG_URL,
    imgUrl,
  };
}
