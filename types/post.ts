import { Category } from './category';
import { Tag } from './tag';
import { PagingRequest, PagingResponse } from './paging';

export interface Post {
	title: string;
	content: string;
	slug: string;
	category: Category;
	tags: Tag[];
	createdAt: string;
}

export type PostList = Omit<Post, 'content'> & {
	description: string;
};

export type PostListRequest = Partial<
	Pick<Post, 'title'> & {
		description: string;
		categorySlug: string;
		tagsSlug: string;
	}
>;

export type PostListPagingRequest = Partial<PagingRequest & PostListRequest>;

export interface PostListResponse extends PagingResponse {
	posts: PostList[];
}
