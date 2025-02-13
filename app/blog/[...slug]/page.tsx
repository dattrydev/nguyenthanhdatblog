'use client';

import 'css/prism.css';
import 'katex/dist/katex.css';

import { notFound } from 'next/navigation';
import { usePostContext } from '../../../context/PostContext';
import { Post } from '../../../types/post';
import { useEffect, useState } from 'react';
import { isErrorResponse } from '../../../types/error-response';
import { usePathname } from 'next/navigation';
import { formatDate } from 'pliny/utils/formatDate';
import siteMetadata from '@/data/siteMetadata';

export default function Page() {
	const { getPostBySlug } = usePostContext();
	const pathname = usePathname();

	const [post, setPost] = useState<Post>();

	useEffect(() => {
		const slug = pathname.split('/').pop();
		if (!slug) {
			notFound();
		}
		getPostBySlug(slug).then((response) => {
			if (!isErrorResponse(response)) {
				setPost(response);
			} else {
				notFound();
			}
		});
	}, [getPostBySlug, pathname]);

	if (!post) {
		return null;
	}

	return (
		<div className={'rounded-xl border p-3'}>
			<label className={'text-2xl font-bold'}>{post?.title}</label>
			<div className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
				<time dateTime={post?.createdAt} suppressHydrationWarning>
					{post?.createdAt && formatDate(post?.createdAt, siteMetadata.locale)}
				</time>
			</div>
			<div className="flex flex-wrap">
				{post?.tags?.map((tag) => (
					<span
						key={tag.slug}
						className="text-sm font-medium text-gray-500 uppercase dark:text-gray-400"
					>
						{`#${tag.name}`}
					</span>
				))}
			</div>
			<div className="flex flex-wrap">
				<span className="text-sm font-medium text-gray-500 uppercase dark:text-gray-400">
					{post.category.name}
				</span>
			</div>
			<div
				className="prose max-w-none dark:text-gray-400"
				dangerouslySetInnerHTML={{ __html: post?.content }}
			/>
		</div>
	);
}
