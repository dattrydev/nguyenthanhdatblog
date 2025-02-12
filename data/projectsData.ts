interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
}

const projectsData: Project[] = [
  {
    title: 'Tiktoday.vn',
    description: `A data analysis and business development support tool for TikTok.`,
    imgSrc: '/static/images/tiktoday.png',
    href: 'https://tiktoday.vn',
  },
  {
    title: 'M&C Repair Ticket',
    description: `Management software for facilities and units.`,
    imgSrc: '/static/images/mcbinhduong.jpeg',
    href: '#',
  },
  {
    title: 'HCMUS Behavior Point',
    description: `HCMUS Student Behavior Point Website.`,
    imgSrc: '/static/images/hcmus.png',
    href: 'https://hcmus.shub.edu.vn/',
  },
]

export default projectsData
