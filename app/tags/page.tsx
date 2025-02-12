'use client';

import Link from '@/components/Link';
import Tag from '@/components/Tag';
import { useTagContext } from '../../context/TagContext';

export default function Page() {
	const { tagList } = useTagContext();
	return (
		<>
			<div className="flex flex-col items-start justify-start divide-y divide-gray-200 md:mt-24 md:flex-row md:items-center md:justify-center md:space-x-6 md:divide-y-0 dark:divide-gray-700">
				<div className="space-x-2 pt-6 pb-8 md:space-y-5">
					<h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:border-r-2 md:px-6 md:text-6xl md:leading-14 dark:text-gray-100">
						Tags
					</h1>
				</div>
				<div className="flex max-w-lg flex-wrap">
					{tagList.length === 0 && 'No tags found.'}
					{tagList.map((t) => {
						return (
							<div key={t.slug} className="mt-2 mr-5 mb-2">
								<Tag text={t.slug} />
								<Link
									href={`/tags/${t.slug}`}
									className="-ml-2 text-sm font-semibold text-gray-600 uppercase dark:text-gray-300"
									aria-label={`View posts tagged ${t}`}
								>
									{` (${t.postCount})`}
								</Link>
							</div>
						);
					})}
				</div>
			</div>
		</>
	);
}
