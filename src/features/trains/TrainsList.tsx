import React, { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { useGetTrainsQuery } from './trainsApi'
import { selectActiveInfo, setActiveInfo } from './trainsSlice'
import styles from './TrainsPage.module.scss'

// interface TrainsListProps {}

const TrainsList: FC = () => {
	const dispatch = useAppDispatch()
	const activeInfo = useAppSelector(selectActiveInfo)
	const { data: trains, isLoading, isError } = useGetTrainsQuery()

	const handleShowInfo = (targetName: string) => {
		const train = trains?.find(({ name }) => name === targetName) ?? null
		dispatch(setActiveInfo(train))
	}

	return (
		<>
			<div className={styles.wrapper_trains}>
				<table>
					<caption>Поезда</caption>
					<thead>
						<tr>
							<th>Название</th>
							<th>Описание</th>
						</tr>
					</thead>
					<tbody>
						{trains &&
							trains.map(({ name, description }) => (
								<tr
									key={name}
									id={name}
									className={styles.train}
									onClick={() => handleShowInfo(name)}
								>
									<td>{name}</td>
									<td>{description}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</>
	)
}

export default TrainsList
