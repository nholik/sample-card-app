//just a placeholder, since we're not using a real database
const ObjectId = (id) => id

const sampleData = [
  {
    _id: ObjectId('5bc1314235df98'),
    user: {
      firstName: 'James',
      lastName: 'Smith',
      phone: '3129891233',
    },
    account: {
      cardNumber: '5141222222229082', //"5141xxxxxxxx9082",
      expiration: '062023',
      pin: '****',
      balance: 112.38,
    },
  },
  {
    _id: ObjectId('5bc134dd235df98'),
    user: {
      firstName: 'Paula',
      lastName: 'Bean',
      phone: '3176541213',
    },
    account: {
      cardNumber: '5141111111119844', //"5141xxxxxxxx9082",
      expiration: '062022',
      pin: '****',
      balance: 62.78,
    },
  },
]

export const getProfile = async (id) => {
  const userData = sampleData.find((p) => p._id === id)
  if (userData) {
    return userData.user
  }
  return null
}

export const getBalance = (id, cardNumber) => {
  const user = sampleData.find((x) => x._id === id)
  if (!user) {
    return null
  }
  //can simplify since they only have one account in sample data
  if (user.account.cardNumber !== cardNumber) {
    return null
  }

  return user.account.balance
}
