export interface IFilter {
	width?: string
	height?: string
	radius?: string
	brand?: string
	sezon?: string
	only_studded?: string
	model_id?: string
	country?: string
	year?: number | string
	omolog?: string
	krepeg?: string
	typedisk?: string
	colir?: string
	jemnist?: string
	puskovii_strum?: string
	tip_elektrolitu?: string
	tip_korpusu?: string
	napruga?: string
	poliarnist?: string
	vehicle_type?: string
	li?: string
	si?: string
	only_c?: string
	only_xl?: string
	only_owl?: string
	only_run_flat?: string
	only_off_road?: string
	minPrice?: string
	maxPrice?: string
	etMin?: string
	etMax?: string
	diaMin?: string
	diaMax?: string
	minShirina?: string
	maxShirina?: string
	minVisota?: string
	maxVisota?: string
	minDovzina?: string
	maxDovzina?: string
}

export type OriginalType = {
	w: 'width',
	h: 'height',
	d: 'radius',
	b: 'brand',
	s: 'sezon',
	stud: 'only_studded',
	m: 'model_id',
	cit: 'citys',
	ctr: 'country',
	y: 'year',
	hm: 'omolog',
	kr: 'krepeg',
	td: 'typedisk',
	clr: 'colir',
	ct: 'jemnist',
	sk: 'puskovii_strum',
	elt: 'tip_elektrolitu',
	tk: 'tip_korpusu',
	am: 'napruga',
	pl: 'poliarnist',
	vt: 'vehicle_type',
	li: 'li',
	si: 'si',
	oc: 'only_c',
	xl: 'only_xl',
	owl: 'only_owl',
	rf: 'only_run_flat',
	ofr: 'only_off_road',
	pfrom: 'minPrice',
	pto: 'maxPrice',
	etfrom: 'etMin',
	etto: 'etMax',
	diafrom: 'diaMin',
	diato: 'diaMax',
	wfrom: 'minShirina',
	wto: 'maxShirina',
	hfrom: 'minVisota',
	hto: 'maxVisota',
	lngfrom: 'minDovzina',
	lngto: 'maxDovzina',
};
