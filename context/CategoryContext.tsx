'use client';

import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { CategoryList } from '../types/category';
import { ErrorResponse, isErrorResponse } from '../types/error-response';
import { getCategoryListApi } from '../app/api/category';
import { handleError } from '../utils/handle-error';

interface CategoryContextType {
	categoryList: CategoryList[];
	getCategoryList: () => Promise<CategoryList[] | ErrorResponse>;
}

export const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider = ({ children }: { children: ReactNode }) => {
	const [categoryList, setCategoryList] = useState<CategoryList[]>([]);

	const getCategoryList = useCallback(async (): Promise<CategoryList[] | ErrorResponse> => {
		try {
			const response = await getCategoryListApi();

			if (isErrorResponse(response)) {
				return handleError(response);
			}

			setCategoryList(response);
			return response;
		} catch (error) {
			console.log('Error getting category list:', error);
			return handleError(error);
		}
	}, []);

	useEffect(() => {
		const fetchCategoryList = async () => {
			const categoryListPagingResponse = await getCategoryListApi();
			if (isErrorResponse(categoryListPagingResponse)) {
				return handleError(categoryListPagingResponse);
			}

			setCategoryList(categoryListPagingResponse);
		};

		fetchCategoryList();
	}, [getCategoryList]);

	return (
		<CategoryContext.Provider
			value={{
				categoryList,

				getCategoryList,
			}}
		>
			{children}
		</CategoryContext.Provider>
	);
};

export const useCategoryContext = () => {
	const context = useContext(CategoryContext);
	if (context === undefined) {
		throw new Error('useCategoryContext must be used within a PostProvider');
	}
	return context;
};
