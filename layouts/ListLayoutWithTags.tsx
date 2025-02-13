'use client';

import { usePathname } from 'next/navigation';
import { formatDate } from 'pliny/utils/formatDate';
import Link from '@/components/Link';
import Tag from '@/components/Tag';
import siteMetadata from '@/data/siteMetadata';
import { PostList } from '../types/post';
import { TagList } from '../types/tag';

interface PaginationProps {
	totalPages: number;
	currentPage: number;
}
interface ListLayoutProps {
	posts: PostList[];
	pagination?: PaginationProps;
	tags: TagList[];
	title: string;
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
	const pathname = usePathname();
	const basePath = pathname.replace(/^\//, '').replace(/\/page\/\d+$/, '');
	console.log(pathname);
	console.log(basePath);
	const prevPage = currentPage - 1 > 0;
	const nextPage = currentPage + 1 <= totalPages;

	return (
		<div className="space-y-2 pt-6 pb-8 md:space-y-5">
			<nav className="flex justify-between">
				{!prevPage && (
					<button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
						Previous
					</button>
				)}
				{prevPage && (
					<Link
						href={
							currentPage - 1 === 1
								? `/${basePath}/`
								: `/${basePath}/page/${currentPage - 1}`
						}
						rel="prev"
					>
						Previous
					</Link>
				)}
				<span>
					{currentPage} of {totalPages}
				</span>
				{!nextPage && (
					<button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
						Next
					</button>
				)}
				{nextPage && (
					<Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
						Next
					</Link>
				)}
			</nav>
		</div>
	);
}

export default function ListLayoutWithTags({ posts, pagination, tags, title }: ListLayoutProps) {
	const pathname = usePathname();
	return (
		<>
			<div>
				<div className="pt-6 pb-6">
					<h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
						{title}
					</h1>
				</div>
				<div className="flex sm:space-x-24">
					<div className="hidden h-full max-h-screen max-w-[280px] min-w-[280px] flex-wrap overflow-auto rounded-sm bg-gray-50 pt-5 shadow-md sm:flex dark:bg-gray-900/70 dark:shadow-gray-800/40">
						<div className="px-6 py-4">
							{pathname.startsWith('/blog') ? (
								<h3 className="text-primary-500 font-bold uppercase">All Posts</h3>
							) : (
								<Link
									href={`/blog`}
									className="hover:text-primary-500 dark:hover:text-primary-500 font-bold text-gray-700 uppercase dark:text-gray-300"
								>
									All Posts
								</Link>
							)}
							<ul>
								{tags.map((t) => {
									return (
										<li key={t.slug} className="my-3">
											<Link
												href={`/tags/${t.slug}`}
												className="hover:text-primary-500 dark:hover:text-primary-500 px-3 py-2 text-sm font-medium text-gray-500 uppercase dark:text-gray-300"
												aria-label={`View posts tagged ${t}`}
											>
												{`${t.name} (${t.postCount})`}
											</Link>
										</li>
									);
								})}
							</ul>
						</div>
					</div>
					<div>
						<ul>
							{posts.map((post) => {
								return (
									<li key={post.slug} className="py-5">
										<article className="flex flex-col space-y-2 xl:space-y-0">
											<dl>
												<dt className="sr-only">Published on</dt>
												<dd className="text-base leading-6 font-medium text-gray-500 dark:text-gray-400">
													<time
														dateTime={post.createdAt}
														suppressHydrationWarning
													>
														{formatDate(
															post.createdAt,
															siteMetadata.locale
														)}
													</time>
												</dd>
											</dl>
											<div className="space-y-3">
												<div>
													<h2 className="text-2xl leading-8 font-bold tracking-tight">
														<Link
															href={`/blog/${post.slug}`}
															className="text-gray-900 dark:text-gray-100"
														>
															{post.title}
														</Link>
													</h2>
													<div className="flex flex-wrap">
														{post.tags?.map((tag) => (
															<Tag key={tag.slug} text={tag.name} />
														))}
													</div>
												</div>
												<div className="prose max-w-none text-gray-500 dark:text-gray-400">
													{post.description}
												</div>
											</div>
										</article>
									</li>
								);
							})}
						</ul>
						{pagination && pagination.totalPages > 1 && (
							<Pagination
								currentPage={pagination.currentPage}
								totalPages={pagination.totalPages}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
