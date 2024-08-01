import { Router } from "express";
import { createCategory, getCategories, updateCategory, deleteCategory } from "../../controllers/courses/category.controller.js";
import { uploadImage, uploadContent } from '../../helpers/upload.js';

const router = Router();

router.post('/createCategory', uploadImage.single('image'), createCategory);
router.get('/getCategories', getCategories);
router.put('/updateCategory/:id', uploadImage.single('image'), updateCategory);
router.delete('/deleteCategory/:id', deleteCategory);

export default router;
