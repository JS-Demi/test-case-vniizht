import { FC } from 'react'
import { useAppDispatch } from '../../app/hooks'
import styles from './TrainsPage.module.scss'
import { useGetTrainsQuery } from './store/trainsApi'
import { setActiveInfo } from './store/trainsSlice'
import { useTranslation } from 'react-i18next'

const TrainsList: FC = () => {
	const dispatch = useAppDispatch()
	const { data: trains, isLoading } = useGetTrainsQuery()
	const { t } = useTranslation()

	const handleShowInfo = (targetName: string) => {
		const train = trains?.find(({ name }) => name === targetName) ?? null
		dispatch(setActiveInfo(train))
	}

	return (
		<>
			{isLoading && <span className={styles.loader}></span>}
			{trains && (
				<div className={styles.wrapper_trains}>
					<table>
						<caption>{t('trains')}</caption>
						<thead>
							<tr>
								<th>{t('name')}</th>
								<th>{t('description')}</th>
							</tr>
						</thead>
						<tbody>
							{trains.map(({ name, description }) => (
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
			)}
		</>
	)
}

export default TrainsList
