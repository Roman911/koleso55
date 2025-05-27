export enum Section {
	Battery = 'battery',
	Tires = 'tires',
	Disks = 'disks',
	Car = 'car',
}

export enum Subsection {
	ByParams = 'byParams',
	ByCars = 'byCars',
}

export interface IFilter {
	width?: null | string
	height?: null | string
	radius?: null | string
	sezon?: null | string
	brand?: null | string
	model_id?: null | string
	citys?: null | string
	country?: null | string
	year?: null | string
	omolog?: null | string
	krepeg?: null | string
	typedisk?: null | string
	colir?: null | string
	jemnist?: null | string
	puskovii_strum?: null | string
	tip_elektrolitu?: null | string
	tip_korpusu?: null | string
	napruga?: null | string
	poliarnist?: null | string
	vehicle_type?: null | string
	li?: null | string
	si?: null | string
	only_studded?: null | string
	only_c?: null | string
	only_xl?: null | string
	only_owl?: null | string
	only_run_flat?: null | string
	only_off_road?: null | string
	minPrice?: null | string
	maxPrice?: null | string
	etMin?: null | string
	etMax?: null | string
	diaMin?: null | string
	diaMax?: null | string
	minShirina?: null | string
	maxShirina?: null | string
	minVisota?: null | string
	maxVisota?: null | string
	minDovzina?: null | string
	maxDovzina?: null | string
}

export interface IOpenFilter {
	width: boolean
	height: boolean
	radius: boolean
	sezon: boolean
	brand: boolean
	model_id: boolean
	citys: boolean
	country: boolean
	year: boolean
	omolog: boolean
	krepeg: boolean
	typedisk: boolean
	colir: boolean
	jemnist: boolean
	puskovii_strum: boolean
	tip_elektrolitu: boolean
	tip_korpusu: boolean
	napruga: boolean
	poliarnist: boolean
	vehicle_type: boolean
	li: boolean
	si: boolean
	only_studded: boolean
	only_c: boolean
	only_xl: boolean
	only_owl: boolean
	only_run_flat: boolean
	only_off_road: boolean
	minPrice: boolean
	maxPrice: boolean
	etMin: boolean
	etMax: boolean
	diaMin: boolean
	diaMax: boolean
	minShirina: boolean
	maxShirina: boolean
	minVisota: boolean
	maxVisota: boolean
	minDovzina: boolean
	maxDovzina: boolean
}
