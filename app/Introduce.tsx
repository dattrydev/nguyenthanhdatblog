import Image from '@/components/Image';
import TypedText from '@/components/TypedText';

export const Introduce = () => {
	return (
		<div className={'flex flex-col items-center gap-10'}>
			<div className={'items-center justify-center gap-10 md:flex'}>
				<Image
					src={'/static/images/cover.jpg'}
					alt={'cover'}
					width={400}
					height={400}
					quality={100}
					className={'rounded-2xl'}
				/>
				<div className={'mt-5 flex flex-col gap-2 md:mt-0'}>
					<h1 className="bg-clip-text text-6xl font-extrabold">Hello, Xin chào!</h1>
					<TypedText />
				</div>
			</div>
			<div className={'rounded-4xl border border-blue-200 p-2 shadow-xl'}>
				{'⬇️ Checkout my latest post ⬇️'}
			</div>
		</div>
	);
};
