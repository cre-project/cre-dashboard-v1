export const emptyProperty = {
  name: null,
  address: null,
  city: null,
  state: null,
  zip: null,
  yearBuilt: null,
  numberOfStories: null,
  lotSize: null,
  apn: null,
  price: null
}
export const emptyFinancials = {
  expenses: {
    insurance: 0,
    electric: 0,
    water: 0,
    garbage: 0,
    maintenance: 0,
    landscaping: 0,
    other: 0
  },
  otherIncome: 0
}
export const emptyComparable = {
  name: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  yearBuilt: null,
  rent: 0,
  bedrooms: '',
  bathrooms: '',
  salesPrice: 0,
  numUnits: 0,
  pricePerUnit: 0,
  closeOfEscrow: '',
  capRate: null,
  grm: null,
  pricePerSf: null,
  id: '',
  imageUrl: ''
}
export const emptyValuation = {
  property: Object.assign({}, emptyProperty),
  userId: '',
  units: [],
  salesComps: [],
  rentComps: [],
  price: 0,
  taxes: 1.1212,
  vacancy: 5,
  mgmtFee: 5,
  statementCurrent: Object.assign({}, emptyFinancials),
  statementPotential: Object.assign({}, emptyFinancials)
}
