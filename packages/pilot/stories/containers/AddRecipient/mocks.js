const mockFetchAccountsResponse = {
  accounts: [
    {
      name: 'First account',
      number: '0001',
      type: 'conta_corrente',
      agency: '7',
      bank: '001',
      id: '1',
    },
    {
      name: 'Second account',
      number: '0002',
      type: 'conta_corrente',
      agency: '8',
      bank: '340',
      id: '2',
    },
  ],
}

const mockAddRecipientResponse = {
  id: 10,
}

const mockError = new Error('Server timeout')

export function fetchAccounts () {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockFetchAccountsResponse), 1000)
  })
}

export function fetchAccountsError () {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(mockError), 1000)
  })
}

export function fetchAccountsEmpty () {
  return new Promise((resolve) => {
    setTimeout(() => resolve([]), 1000)
  })
}

export function submitRecipient () {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockAddRecipientResponse), 1000)
  })
}

export function submitRecipientError () {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(mockError), 1000)
  })
}
