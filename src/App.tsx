import TrainInfo from './features/trains/TrainInfo'
import TrainsList from './features/trains/TrainsList'

function App() {
	return (
		<>
			<div className='container'>
				<TrainsList />
				<TrainInfo />
			</div>
		</>
	)
}

export default App
