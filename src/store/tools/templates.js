export const emptyProperty = {
  name: null,
  address: null,
  city: null,
  state: null,
  zip: null,
  yearBuilt: null,
  numberOfStories: null,
  lotSize: null,
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
  rent: null,
  bedrooms: '',
  bathrooms: '',
  salesPrice: null,
  numUnits: null,
  pricePerUnit: null,
  closeOfEscrow: '',
  capRate: null,
  grm: null,
  pricePerSf: null
}
export const emptyValuation = {
  property: Object.assign({}, emptyProperty),
  userId: '',
  units: [],
  salesComps: [],
  rentComps: [],
  price: 0,
  taxes: 5,
  vacancy: 5,
  mgmtFee: 5,
  statementCurrent: Object.assign({}, emptyFinancials),
  statementPotential: Object.assign({}, emptyFinancials)
}
