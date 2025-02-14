import { ReactNode } from 'react';
import type { Authors } from 'contentlayer/generated';
import SocialIcon from '@/components/social-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faAws,
	faCss3Alt,
	faHtml5,
	faJava,
	faJs,
	faLinux,
	faNode,
	faPhp,
	faPython,
	faUbuntu,
} from '@fortawesome/free-brands-svg-icons';

interface Props {
	children: ReactNode;
	content: Omit<Authors, '_id' | '_raw' | 'body'>;
}

export default function AuthorLayout({ children, content }: Props) {
	const { name, avatar, occupation, company, email, twitter, bluesky, linkedin, github } =
		content;

	return (
		<div>
			<div className="divide-y divide-gray-200 dark:divide-gray-700">
				<div className="space-y-2 pt-6 pb-8 md:space-y-5">
					<h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
						About
					</h1>
				</div>
				<div className="h-full xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
					<div className="space-y-2 pt-8">
						<div className="flex flex-col items-center space-x-2">
							{avatar && (
								<img
									src={avatar}
									alt="avatar"
									width={192}
									height={192}
									className="h-48 w-48 rounded-full"
								/>
							)}
							<h3 className="pt-4 pb-2 text-2xl leading-8 font-bold tracking-tight">
								{name}
							</h3>
							<div className="text-gray-500 dark:text-gray-400">{occupation}</div>
							<div className="text-gray-500 dark:text-gray-400">{company}</div>
							<div className="flex space-x-3 pt-6">
								<SocialIcon kind="mail" href={`mailto:${email}`} />
								<SocialIcon kind="github" href={github} />
								<SocialIcon kind="linkedin" href={linkedin} />
								<SocialIcon kind="x" href={twitter} />
								<SocialIcon kind="bluesky" href={bluesky} />
							</div>
							<div className={'mt-5 text-xl font-bold'}>Skills</div>
							<div className="mt-2 flex flex-wrap gap-3">
								<FontAwesomeIcon icon={faHtml5} className={'h-8 w-8'} />
								<FontAwesomeIcon icon={faCss3Alt} className={'h-8 w-8'} />
								<FontAwesomeIcon icon={faJs} className={'h-8 w-8'} />
								<img
									src={
										'https://img.icons8.com/?size=100&id=vMqgHSToxrJR&format=png&color=000000'
									}
									alt={'typescript'}
									width={8}
									height={8}
									className={'h-8 w-8 dark:invert dark:filter'}
								/>
								<img
									src={
										'https://img.icons8.com/?size=100&id=yUdJlcKanVbh&format=png&color=000000'
									}
									alt={'nextjs'}
									width={8}
									height={8}
									className={'h-8 w-8 dark:invert dark:filter'}
								/>
								<img
									src={
										'https://img.icons8.com/?size=100&id=0Da6k7SMq0hs&format=png&color=000000'
									}
									alt={'react'}
									width={8}
									height={8}
									className={'h-8 w-8 dark:invert dark:filter'}
								/>
								<FontAwesomeIcon icon={faJava} className={'h-8 w-8'} />
								<img
									src={
										'https://img.icons8.com/?size=100&id=90519&format=png&color=000000'
									}
									alt={'java springboot'}
									width={8}
									height={8}
									className={'h-8 w-8 dark:invert dark:filter'}
								/>
								<FontAwesomeIcon icon={faNode} className={'h-8 w-8'} />
								<FontAwesomeIcon icon={faPython} className={'h-8 w-8'} />
								<img
									src={
										'https://img.icons8.com/?size=100&id=VLKafOkk3sBX&format=png&color=000000'
									}
									alt={'azure'}
									width={8}
									height={8}
									className={'h-8 w-8 dark:invert dark:filter'}
								/>
								<FontAwesomeIcon icon={faAws} className={'h-8 w-8'} />
								<img
									src={
										'https://img.icons8.com/?size=100&id=39855&format=png&color=000000'
									}
									alt={'mysql'}
									width={8}
									height={8}
									className={'h-8 w-8 dark:invert dark:filter'}
								/>
								<img
									src={
										'https://img.icons8.com/?size=100&id=25010&format=png&color=000000'
									}
									alt={'typescript'}
									width={8}
									className={'h-8 w-8 dark:invert dark:filter'}
								/>
								<img
									src={
										'https://img.icons8.com/?size=100&id=laYYF3dV0Iew&format=png&color=000000'
									}
									alt={'typescript'}
									width={8}
									height={8}
									className={'h-8 w-8 dark:invert dark:filter'}
								/>
								<FontAwesomeIcon icon={faLinux} className={'h-8 w-8'} />
								<FontAwesomeIcon icon={faUbuntu} className={'h-8 w-8'} />
								<img
									src={
										'https://img.icons8.com/?size=100&id=1BC75jFEBED6&format=png&color=000000'
									}
									alt={'typescript'}
									width={8}
									height={8}
									className={'h-8 w-8 dark:invert dark:filter'}
								/>
								<FontAwesomeIcon icon={faPhp} className={'h-8 w-8'} />
								<img
									src={
										'https://img.icons8.com/?size=100&id=QEQQKirln6Tf&format=png&color=000000'
									}
									alt={'typescript'}
									width={8}
									height={8}
									className={'h-8 w-8 dark:invert dark:filter'}
								/>
								<img
									src={
										'https://img.icons8.com/?size=100&id=GflC6KLkdd0Y&format=png&color=000000'
									}
									alt={'typescript'}
									width={8}
									height={8}
									className={'h-8 w-8 dark:invert dark:filter'}
								/>
							</div>
						</div>
					</div>
					<div className="prose dark:prose-invert max-w-none pt-8 xl:col-span-2">
						{children}
					</div>
				</div>
			</div>
		</div>
	);
}
