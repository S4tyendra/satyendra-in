// Editorial selections use the same project records as the project directory.
import projects from './projects.js'
import closedProjects from './closedSrcProjects.js'
export const projectPath = (project) => `/projects/${project.link.split('/').filter(Boolean).pop()}`
export const personalProducts = ['GemHub', 'Edge Proxy & Image Cache', 'DevH API Gateway']
  .map(title => closedProjects.find(project => project.title === title))
export const selectedOpenSource = ['NFC Gatekeeper', 'envman', 'Attend']
  .map(title => projects.find(project => project.title === title))
export const companyProducts = [
  {
    title: 'Mino Money',
    description: 'Built the cloud infrastructure, backend API, and mobile app.',
    stores: [
      { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.neosurge.neosurge' },
      { label: 'App Store', href: 'https://apps.apple.com/in/app/mino-money-invest-and-earn/id6452753963' },
    ],
  },
  {
    title: 'Aavak',
    description: 'Developed and released the mobile app at Neosurge.',
    stores: [
      { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.aavak.invest.mobile&hl=en' },
      { label: 'App Store', href: 'https://apps.apple.com/in/app/aavak-invest/id6759653541' },
    ],
  },
  {
    title: 'Octaraa',
    description: 'Developed and released the mobile app at Neosurge.',
    stores: [
      { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.octaraa.wealth' },
      { label: 'App Store', href: 'https://apps.apple.com/in/app/octaraa-simplified-wealth/id6795473003' },
    ],
  },
].map(product => ({ ...product, href: product.stores[0].href }))
