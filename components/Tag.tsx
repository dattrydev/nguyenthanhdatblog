import Link from 'next/link';
interface Props {
	slug: string;
	text: string;
}

const Tag = ({ text, slug }: Props) => {
	return (
		<Link
			href={`/tags/${slug}`}
			className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
		>
			{`#${text}`}
		</Link>
	);
};

export default Tag;
