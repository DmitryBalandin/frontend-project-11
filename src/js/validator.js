import { object, string } from 'yup';

const urlShema = object({
  url:string().trim().url('Ссылка должна быть валидным URL').required()
});

const validator = (inputValue) =>{
  return urlShema.validate({url:inputValue},{ abortEarly: false })

};

export default validator