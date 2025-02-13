'use client';

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { TagList } from '../types/tag';
import { getTagListApi } from '../app/api/tag';
import { ErrorResponse, isErrorResponse } from '../types/error-response';
import { handleError } from '../utils/handle-error';

interface TagContextType {
	tagList: TagList[];
	getTagList: () => Promise<TagList[] | ErrorResponse>;
}

export const TagContext = createContext<TagContextType | undefined>(undefined);

export const TagProvider = ({ children }: { children: ReactNode }) => {
	const [tagList, setTagList] = useState<TagList[]>([]);

	const getTagList = useCallback(async () => {
		try {
			const response = await getTagListApi();
			if (isErrorResponse(response)) {
				return handleError(response);
			}

			setTagList(response);
			return response;
		} catch (error) {
			console.log('Error getting tag list:', error);
			return handleError(error);
		}
	}, []);

	useEffect(() => {
		const fetchTagList = async () => {
			const tagListPagingResponse = await getTagListApi();
			if (isErrorResponse(tagListPagingResponse)) {
				return handleError(tagListPagingResponse);
			}
			setTagList(tagListPagingResponse);
		};

		fetchTagList();
	}, [getTagList]);

	return (
		<TagContext.Provider
			value={{
				tagList,
				getTagList,
			}}
		>
			{children}
		</TagContext.Provider>
	);
};

export const useTagContext = () => {
	const context = useContext(TagContext);
	if (context === undefined) {
		throw new Error('useTagContext must be used within a TagProvider');
	}
	return context;
};
