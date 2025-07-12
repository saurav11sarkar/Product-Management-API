import multer from "multer";

const uploadImg = (fileName: string) => {
  return multer({ storage: multer.memoryStorage() }).array(fileName);
};

export default uploadImg;
