'use client';

type HorizontalCardProps = {
	name: string;
	description: string;
	time: string;
	logoUrl: string;
	link?: string;
};

export const HorizontalCard = ({ name, description, time, logoUrl, link }: HorizontalCardProps) => {
	const handleClick = () => {
		if (link) window.open(link, '_blank');
	};

	return (
		<div
			className="flex cursor-pointer space-x-4 rounded-lg p-2 transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800"
			onClick={handleClick}
			onKeyDown={(e) => e.key === 'Enter' && handleClick()}
			role={link ? 'link' : undefined}
			tabIndex={link ? 0 : undefined}
		>
			<img
				src={logoUrl}
				alt={name}
				width={140}
				height={140}
				className="h-[140px] w-[140px] rounded-md"
			/>
			<div className="flex flex-col justify-center">
				<div className="text-xl font-extrabold md:text-2xl">{name}</div>
				<div className="text-md md:text-lg">{description}</div>
				<div className="text-md text-gray-500 md:text-lg">{time}</div>
			</div>
		</div>
	);
};
