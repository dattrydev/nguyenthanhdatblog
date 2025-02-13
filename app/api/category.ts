import { CategoryList } from '../../types/category';
import { apiGet } from '../../utils/api-request';

export const getCategoryListApi = async (): Promise<CategoryList[]> => {
	return await apiGet('categories');
};
