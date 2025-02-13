'use client';

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { Post, PostList, PostListPagingRequest } from 'types/post';
import { PagingResponse } from '../types/paging';
import { ErrorResponse, isErrorResponse } from '../types/error-response';
import { useDebounce } from 'use-debounce';
import { getPostBySlugApi, getPostListApi, getPostListSearchApi } from '../app/api/post';
import { handleError } from 'utils/handle-error';

interface PostContextType {
	postList: PostList[];
	postListPagingRequest: PostListPagingRequest;
	updatePostListPagingRequest: (updates: Partial<PostListPagingRequest>) => void;
	paging: PagingResponse;

	getPostList: () => Promise<PostList[] | ErrorResponse>;
	getPostBySlug: (slug: string) => Promise<Post | ErrorResponse>;
	getPostListSearch: (keyword: string) => Promise<PostList[] | ErrorResponse>;
}

export const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
	const [postList, setPostList] = useState<PostList[]>([]);
	const [postListPagingRequest, setPostListPagingRequest] = useState<PostListPagingRequest>({});
	const [debouncedPostListPagingRequest] = useDebounce(postListPagingRequest, 500);

	const [paging, setPaging] = useState<PagingResponse>({
		totalPages: 0,
		currentPage: 0,
	});

	const updatePostListPagingRequest = useCallback(
		(
			updates: Partial<PostListPagingRequest> & {
				[key: string]: any;
			}
		) => {
			const formattedUpdates: Record<string, any> = {};

			Object.keys(updates).forEach((key) => {
				if (Array.isArray(updates[key])) {
					formattedUpdates[key] = updates[key].join(',');
				} else {
					formattedUpdates[key] = updates[key];
				}
			});

			setPostListPagingRequest((prev) => ({
				...prev,
				...formattedUpdates,
			}));
		},
		[]
	);

	const getPostList = useCallback(async (): Promise<PostList[] | ErrorResponse> => {
		try {
			const response = await getPostListApi(debouncedPostListPagingRequest);
			if (isErrorResponse(response)) {
				return handleError(response);
			}

			setPostList(response.posts);
			return response.posts;
		} catch (error) {
			console.log('Error in getPostListApi:', error);
			return handleError(error);
		}
	}, [debouncedPostListPagingRequest]);

	const getPostBySlug = useCallback(async (slug: string): Promise<Post | ErrorResponse> => {
		try {
			const response = await getPostBySlugApi(slug);
			if (isErrorResponse(response)) {
				return handleError(response);
			}

			return response;
		} catch (error) {
			console.log('Error in getPostBySlugApi:', error);
			return handleError(error);
		}
	}, []);

	const getPostListSearch = useCallback(
		async (keyword: string): Promise<PostList[] | ErrorResponse> => {
			try {
				const response = await getPostListSearchApi(keyword);
				if (isErrorResponse(response)) {
					return handleError(response);
				}

				return response.posts;
			} catch (error) {
				console.log('Error in getPostListSearchApi:', error);
				return handleError(error);
			}
		},
		[]
	);

	useEffect(() => {
		const fetchPostList = async () => {
			const postListPagingResponse = await getPostListApi(postListPagingRequest);
			if (isErrorResponse(postListPagingResponse)) {
				return handleError(postListPagingResponse);
			}

			setPostList(postListPagingResponse.posts);
			setPaging({
				totalPages: postListPagingResponse.totalPages,
				currentPage: postListPagingResponse.currentPage,
			});
		};

		fetchPostList();
	}, [getPostList, postListPagingRequest]);

	return (
		<PostContext.Provider
			value={{
				postList,
				postListPagingRequest,
				updatePostListPagingRequest,
				paging,

				getPostList,
				getPostBySlug,
				getPostListSearch,
			}}
		>
			{children}
		</PostContext.Provider>
	);
};

export const usePostContext = () => {
	const context = useContext(PostContext);
	if (context === undefined) {
		throw new Error('usePostContext must be used within a PostProvider');
	}
	return context;
};
