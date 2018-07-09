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
export const emptyCurrentOperatingStatement = {
  expenses: {
    taxes: 0,
    insurance: 0,
    electric: 0,
    water: 0,
    garbage: 0,
    maintenance: 0,
    mgmtFee: 0,
    landscaping: 0,
    other: 0,
    total: 0
  },
  stats: {
    capRate: 0,
    grm: 0
  },
  grossRent: 0,
  vacancy: 0,
  totalRent: 0,
  netOperatingIncome: 0
}
export const emptyPotentialOperatingStatement = {
  expenses: {
    taxes: 0,
    insurance: 0,
    electric: 0,
    water: 0,
    garbage: 0,
    maintenance: 0,
    mgmtFee: 0,
    landscaping: 0,
    other: 0,
    total: 0
  },
  stats: {
    capRate: 0,
    grm: 0
  },
  grossRent: 0,
  vacancy: 0,
  totalRent: 0,
  netOperatingIncome: 0
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
  bathrooms: ''
}
export const emptyValuation = {
  property: Object.assign({}, emptyProperty),
  userId: '',
  units: [],
  salesComps: [],
  rentComps: [],
  price: 0,
  pricePerUnit: 0,
  pricePerSf: 0,
  statementCurrent: emptyCurrentOperatingStatement,
  statementPotential: emptyPotentialOperatingStatement
}
