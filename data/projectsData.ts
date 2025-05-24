interface Project {
	title: string;
	description: string;
	href?: string;
	imgSrc?: string;
}

const projectsData: Project[] = [
	{
		title: 'DSV Candidate Testing',
		description: `An assessment platform for employers to screen candidates effectively..`,
		imgSrc: '/static/images/dsv.jpg',
		href: 'https://www.designveloper.com/',
	},
	{
		title: 'Nguyen Thanh Dat Blog',
		description: `My personal blog, where I write about software development and life.`,
		imgSrc: '/static/images/nguyenthanhdat.png',
		href: 'https://nguyenthanhdat.software',
	},
	{
		title: 'Tiktoday.vn',
		description: `A data analysis and business development support tool for TikTok.`,
		imgSrc: '/static/images/tiktoday.png',
		href: 'https://tiktoday.vn',
	},
	{
		title: 'M&C Repair Ticket',
		description: `Management software for facilities and units for repair and maintenance.`,
		imgSrc: '/static/images/mcbinhduong.jpeg',
		href: '#',
	},
	{
		title: 'HCMUS Behavior Point',
		description: `A system to manage and evaluate student behavior at HCMUS.`,
		imgSrc: '/static/images/hcmus.png',
		href: 'https://hcmus.shub.edu.vn/',
	},
];

export default projectsData;
