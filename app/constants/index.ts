import { Navlink } from '../types';

export const navlinks: Navlink[] = [
  {
    name: 'dashboard',
    imgUrl: '/dashboard.svg',
    link: '/',
  },
  {
    name: 'campaign',
    imgUrl: '/create-campaign.svg',
    link: '/create-campaign',
  },
  {
    name: 'payment',
    imgUrl: '/payment.svg',
    link: '/',
    disabled: true,
  },
  {
    name: 'withdraw',
    imgUrl: '/withdraw.svg',
    link: '/',
    disabled: true,
  },
  {
    name: 'profile',
    imgUrl: '/profile.svg',
    link: '/profile',
  },
  {
    name: 'logout',
    imgUrl: '/logout.svg',
    link: '/',
    disabled: true,
  },
];
