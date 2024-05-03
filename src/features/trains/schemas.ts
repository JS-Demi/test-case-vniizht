import { ChangeEvent } from 'react'
import * as Yup from 'yup'
import styles from './TrainsPage.module.scss'

export enum DataEnum {
	ENGINE_AMPERAGE = 'engineAmperage',
	FORCE = 'force',
	SPEED = 'speed',
}

const validateEngineAmperage = Yup.number()
	.transform((value) => +value)
	.integer('Введите целое число')
	.min(0, 'Допустимо только положительное число')
	.required('Обязательное поле')
const validateForce = Yup.number()
	.positive('Допустимо только положительное число')
	.required('Обязательное поле')
const validateSpeed = Yup.number()
	.integer('Введите целое число')
	.min(0, 'Допустимо только положительное число')
	.required('Обязательное поле')

export const validationSchema = Yup.object().shape({
	characteristics: Yup.array().of(
		Yup.object().shape({
			engineAmperage: validateEngineAmperage,
			force: validateForce,
			speed: validateSpeed,
		})
	),
})

export const validate = ({ target }: ChangeEvent<HTMLInputElement>, type: DataEnum): void => {
	console.log(target)
	switch (type) {
		case DataEnum.ENGINE_AMPERAGE:
			{
				const { value } = target
				const isValidField = validateEngineAmperage.isValidSync(value)
				if (!isValidField) {
					target.classList.add(`${styles.invalid}`)
				} else {
					target.classList.remove(`${styles.invalid}`)
				}
			}
			break
		case DataEnum.FORCE:
			{
				const { value } = target
				const isValidField = validateForce.isValidSync(+value)
				if (!isValidField) {
					target.classList.add(`${styles.invalid}`)
				} else {
					target.classList.remove(`${styles.invalid}`)
				}
			}
			break
		case DataEnum.SPEED:
			{
				const { value } = target
				const isValidField = validateSpeed.isValidSync(value)
				if (!isValidField) {
					target.classList.add(`${styles.invalid}`)
				} else {
					target.classList.remove(`${styles.invalid}`)
				}
			}
			break
	}
}
