import { apiGet } from '../../utils/api-request';
import { TagList } from '../../types/tag';

export const getTagListApi = async (): Promise<TagList[]> => {
	return await apiGet('tags');
};
