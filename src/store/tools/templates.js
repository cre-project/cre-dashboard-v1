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
  otherIncome: {label: 'Total Other Income', value: 0}
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
  taxes: {label: 'Real Estate Taxes', value: 1.1212},
  vacancy: 5,
  mgmtFee: {label: 'Management Fee', value: 5},
  statementCurrent: Object.assign({}, emptyFinancials),
  statementPotential: Object.assign({}, emptyFinancials),
  expenses: [
    {label: 'Insurance', current: 0, potential: 0},
    {label: 'Utilities - Electric', current: 0, potential: 0},
    {label: 'Utilities - Water & Sewer', current: 0, potential: 0},
    {label: 'Garbage', current: 0, potential: 0},
    {label: 'Repairs & Maintenance', current: 0, potential: 0},
    {label: 'Landscaping', current: 0, potential: 0},
    {label: 'Other Expenses', current: 0, potential: 0}
  ]
}
