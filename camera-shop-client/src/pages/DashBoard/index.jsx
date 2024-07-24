import DashboardStatsGrid from '../../components/DashBoard/DashboardStatsGrid'
import TransactionChart from '../../components/DashBoard/TransactionChart'
import RecentOrders from '../../components/DashBoard/RecentOrders'
import BuyerProfilePieChart from '../../components/DashBoard/BuyerProfilePieChart'
import PopularProducts from '../../components/DashBoard/PopularProducts'

export default function Dashboard() {
	return (
		<div className="flex flex-col gap-4">
			<DashboardStatsGrid />
			<div className="flex flex-row gap-4 w-full">
				<TransactionChart />
				<BuyerProfilePieChart />
			</div>
			<div className="flex flex-row gap-4 w-full">
				<RecentOrders />
				<PopularProducts />
			</div>
		</div>
	)
}