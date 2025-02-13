'use client';

import ListLayout from '@/layouts/ListLayoutWithTags';
import { usePostContext } from '../../../context/PostContext';
import { useTagContext } from '../../../context/TagContext';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function TagPage() {
	const { postList, paging, updatePostListPagingRequest } = usePostContext();
	const { tagList } = useTagContext();
	const title = 'Tags';
	const pathname = usePathname();

	useEffect(() => {
		console.log(pathname.split('/')[2]);
		const tagSlug = pathname.split('/')[2];
		updatePostListPagingRequest({ tagsSlug: tagSlug });
	}, [pathname]);

	return <ListLayout posts={postList} pagination={paging} title={title} tags={tagList} />;
}
