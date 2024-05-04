export interface ICharacterisctic {
	speed: number
	force: number
	engineAmperage: number
}

export interface ITrain {
	name: string
	description: string
	characteristics: ICharacterisctic[]
}
