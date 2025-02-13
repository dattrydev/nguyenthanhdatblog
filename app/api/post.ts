import { apiGet } from '../../utils/api-request';
import { Post, PostListPagingRequest, PostListResponse } from '../../types/post';

export const getPostListApi = async (
	postRequest: PostListPagingRequest
): Promise<PostListResponse> => {
	return await apiGet('posts', postRequest);
};

export const getPostBySlugApi = async (request: string): Promise<Post> => {
	return await apiGet('posts/' + request);
};

export const getPostListSearchApi = async (keyword: string): Promise<PostListResponse> => {
	return await apiGet(`posts/search/${keyword}`);
};
