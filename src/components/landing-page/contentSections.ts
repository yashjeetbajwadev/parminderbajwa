import { BLOG_URL, DOCS_URL } from '../../lib/constants';
import { testimonialImages } from '../../static/testimonials';

export const testimonials = [
  {
    avatarSrc: testimonialImages[0],
  },
  {
    avatarSrc: testimonialImages[1],
  },
  {
    avatarSrc: testimonialImages[2],
  },
  {
    avatarSrc: testimonialImages[3],
  },
  {
    avatarSrc: testimonialImages[4],
  },
  {
    avatarSrc: testimonialImages[5],
  },
  {
    avatarSrc: testimonialImages[6],
  },
  {
    avatarSrc: testimonialImages[7],
  },
  {
    avatarSrc: testimonialImages[8],
  },
  {
    avatarSrc: testimonialImages[9],
  },
];

export const footerNavigation = {
  app: [
    { name: 'Documentation', href: DOCS_URL },
    { name: 'Blog', href: BLOG_URL },
  ],
  company: [
    { name: 'About', href: 'https://wasp-lang.dev' },
    { name: 'Privacy', href: '#' },
    { name: 'Terms of Service', href: '#' },
  ],
};
