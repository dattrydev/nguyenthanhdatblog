'use client';

import Main from './Main';
import { usePostContext } from '../context/PostContext';
import { useTagContext } from '../context/TagContext';
import { Introduce } from './Introduce';

export default function Page() {
	const { postList } = usePostContext();
	const { tagList } = useTagContext();

	return (
		<>
			<Introduce />
			<Main posts={postList} tags={tagList} />
		</>
	);
}
