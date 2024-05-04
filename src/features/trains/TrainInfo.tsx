import { Field, FieldArray, Form, Formik } from 'formik'
import { ChangeEvent, FC } from 'react'
import { useAppSelector } from '../../app/hooks'
import styles from './TrainsPage.module.scss'
import { DataEnum, validate, validationSchema } from './schemas'
import { selectActiveInfo } from './trainsSlice'
import { ICharacterisctic } from './types'

interface IValues {
	characteristics: ICharacterisctic[]
}
const TrainInfo: FC = () => {
	const activeInfo = useAppSelector(selectActiveInfo)

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
													<caption>Характеристики</caption>
													<caption>{activeInfo.name}</caption>
													<thead>
														<tr>
															<th>Ток двигателя</th>
															<th>Сила тяги</th>
															<th>Скорость</th>
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
										Отправить данные
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
