'use client';

import ListLayout from '@/layouts/ListLayoutWithTags';
import { usePostContext } from '../../context/PostContext';
import { useTagContext } from '../../context/TagContext';

export default function BlogPage(props: { searchParams: Promise<{ page: string }> }) {
	const { postList, paging } = usePostContext();
	const { tagList } = useTagContext();

	return <ListLayout posts={postList} pagination={paging} tags={tagList} title="All Posts" />;
}
