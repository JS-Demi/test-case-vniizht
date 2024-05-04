import { Field, FieldArray, Form, Formik } from 'formik'
import { ChangeEvent, FC } from 'react'
import { useAppSelector } from '../../app/hooks'
import styles from './TrainsPage.module.scss'
import { DataEnum, validate, validationSchema } from './helpers/schemas'
import { selectActiveInfo } from './store/trainsSlice'
import { ICharacterisctic } from './interfaces/types'
import { useTranslation } from 'react-i18next'

interface IValues {
	characteristics: ICharacterisctic[]
}
const TrainInfo: FC = () => {
	const activeInfo = useAppSelector(selectActiveInfo)
	const { t } = useTranslation()

	const customHandleChange =
		(formikHandleChange: (e: ChangeEvent<HTMLInputElement>) => void, type: DataEnum) =>
		(e: ChangeEvent<HTMLInputElement>): void => {
			formikHandleChange(e)
			validate(e, type)
		}

	const handleSubmit = ({ characteristics }: IValues) => {
		const speedsList = characteristics.map(({ speed }) => +speed).sort((a, b) => a - b)
		console.log(speedsList)
	}

	return (
		<>
			{activeInfo && (
				<div className={styles.container}>
					<Formik
						onSubmit={handleSubmit}
						initialValues={{
							characteristics: activeInfo.characteristics,
						}}
						validationSchema={validationSchema}
						enableReinitialize
					>
						{({ isValid, handleChange }) => {
							return (
								<Form className={styles.wrapper_info}>
									<FieldArray name='characteristics'>
										{() => (
											<div className={styles.wrapper_table}>
												<table>
													<caption>{t('characteristics')}</caption>
													<caption>{activeInfo.name}</caption>
													<thead>
														<tr>
															<th>{t('engineAmperage')}</th>
															<th>{t('force')}</th>
															<th>{t('speed')}</th>
														</tr>
													</thead>
													<tbody>
														{activeInfo.characteristics.map(
															({ engineAmperage, force, speed }, index) => (
																<tr key={`${engineAmperage}.${force}.${speed}`}>
																	<td>
																		<Field
																			type='text'
																			name={`characteristics.${index}.engineAmperage`}
																			onChange={customHandleChange(
																				handleChange,
																				DataEnum.ENGINE_AMPERAGE
																			)}
																		/>
																	</td>
																	<td>
																		<Field
																			type='text'
																			name={`characteristics.${index}.force`}
																			onChange={customHandleChange(handleChange, DataEnum.FORCE)}
																		/>
																	</td>
																	<td>
																		<Field
																			type='text'
																			name={`characteristics.${index}.speed`}
																			onChange={customHandleChange(handleChange, DataEnum.SPEED)}
																		/>
																	</td>
																</tr>
															)
														)}
													</tbody>
												</table>
											</div>
										)}
									</FieldArray>
									<button className={styles.btn} disabled={!isValid} type='submit'>
										{t('submit')}
									</button>
								</Form>
							)
						}}
					</Formik>
				</div>
			)}
		</>
	)
}

export default TrainInfo
