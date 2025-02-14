import { Authors, allAuthors } from 'contentlayer/generated';
import { MDXLayoutRenderer } from 'pliny/mdx-components';
import AuthorLayout from '@/layouts/AuthorLayout';
import { coreContent } from 'pliny/utils/contentlayer';
import { genPageMetadata } from 'app/seo';
import career from '@/data/authors/career.json';
import education from '@/data/authors/education.json';
import achievement from '@/data/authors/achievement.json';

import { HorizontalCard } from '@/components/HorizontalCard';

export const metadata = genPageMetadata({ title: 'About' });

export default function Page() {
	const author = allAuthors.find((p) => p.slug === 'default') as Authors;
	const mainContent = coreContent(author);

	return (
		<div className={''}>
			<AuthorLayout content={mainContent}>
				<MDXLayoutRenderer code={author.body.code} />
				<div className={'text-2xl font-bold'}>Career</div>
				{career.length > 0 ? (
					career.map((item, index) => (
						<HorizontalCard
							key={index}
							name={item.name}
							description={item.description}
							time={item.time}
							logoUrl={item.logoUrl}
							link={item.link}
						/>
					))
				) : (
					<p className="text-gray-500">No career data available.</p>
				)}
				<div className={'text-2xl font-bold'}>Education</div>
				{education.length > 0 ? (
					education.map((item, index) => (
						<HorizontalCard
							key={index}
							name={item.name}
							description={item.description}
							time={item.time}
							logoUrl={item.logoUrl}
							link={item.link}
						/>
					))
				) : (
					<p className="text-gray-500">No education data available.</p>
				)}
				<div className={'text-2xl font-bold'}>Achievements</div>
				{achievement.length > 0 ? (
					achievement.map((item, index) => (
						<HorizontalCard
							key={index}
							name={item.name}
							description={item.description}
							time={item.time}
							logoUrl={item.logoUrl}
							link={item.link}
						/>
					))
				) : (
					<p className="text-gray-500">No achievements data available.</p>
				)}
			</AuthorLayout>
		</div>
	);
}
