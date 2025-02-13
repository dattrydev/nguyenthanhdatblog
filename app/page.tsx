'use client';

import Main from './Main';
import { usePostContext } from '../context/PostContext';
import { useTagContext } from '../context/TagContext';

export default function Page() {
	const { postList } = usePostContext();
	const { tagList } = useTagContext();

	return <Main posts={postList} tags={tagList} />;
}
