'use client';

import ListLayout from '@/layouts/ListLayoutWithTags';
import { usePostContext } from '../../../../../context/PostContext';
import { useTagContext } from '../../../../../context/TagContext';

export default function TagPage() {
	const { postList, paging } = usePostContext();
	const { tagList } = useTagContext();
	const title = 'Tags';

	return <ListLayout posts={postList} pagination={paging} tags={tagList} title={title} />;
}
