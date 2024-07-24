import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineShoppingCart,
	HiOutlineUsers,
	HiOutlineTerminal,
	HiOutlineDocument,
	HiOutlineNewspaper
} from 'react-icons/hi'
import { HiMiniCamera, HiMiniQueueList  } from 'react-icons/hi2'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'cameras',
		label: 'Cameras',
		path: '/cameras',
		icon: <HiMiniCamera />
	},
	{
		key: 'variants',
		label: 'Variants',
		path: '/variants',
		icon: <HiOutlineTerminal />
	},
	{
		key: 'brands',
		label: 'Brands',
		path: '/brands',
		icon: <HiOutlineDocument />
	},
	{
		key: 'categories',
		label: 'Categories',
		path: '/categories',
		icon: <HiMiniQueueList/>
	},
	{
		key: 'features',
		label: 'Features',
		path: '/features',
		icon: <HiOutlineCube />
	},
	{
		key: 'posts',
		label: 'Posts',
		path: '/posts',
		icon: <HiOutlineNewspaper />
	},
	{
		key: 'customers',
		label: 'Customers',
		path: '/customers',
		icon: <HiOutlineUsers />
	},
	{
		key: 'orders',
		label: 'Orders',
		path: '/orders',
		icon: <HiOutlineShoppingCart />
	}
]

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
	// {
	// 	key: 'settings',
	// 	label: 'Settings',
	// 	path: '/settings',
	// 	icon: <HiOutlineCog />
	// },
	// {
	// 	key: 'support',
	// 	label: 'Help & Support',
	// 	path: '/support',
	// 	icon: <HiOutlineQuestionMarkCircle />
	// }
]