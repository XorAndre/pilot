const mockFetchAccountsResponse = {
  accounts: [
    {
      account_name: 'First account',
      account_number: '0001',
      account_type: 'conta_corrente',
      agency: '7',
      bank: '340',
      id: '1',
    },
    {
      account_name: 'Second account',
      account_number: '0002',
      account_type: 'conta_corrente',
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
