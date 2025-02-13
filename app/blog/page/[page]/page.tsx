'use client';

import ListLayout from '@/layouts/ListLayoutWithTags';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { usePostContext } from '../../../../context/PostContext';
import { useTagContext } from '../../../../context/TagContext';

export default function Page() {
	const { postList, paging, updatePostListPagingRequest } = usePostContext();
	const { tagList } = useTagContext();

	const pathname = usePathname();

	useEffect(() => {
		const pageNumber = parseInt(pathname.split('/').pop() as string);

		updatePostListPagingRequest({ page: pageNumber });
	}, [pathname, updatePostListPagingRequest]);

	return <ListLayout posts={postList} pagination={paging} tags={tagList} title="All Posts" />;
}
