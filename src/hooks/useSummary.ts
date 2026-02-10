import { TransactionsContext } from '../contexts/TransactionContext'
import { useContextSelector } from 'use-context-selector'

export function useSummary() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'inflow') {
        acc.inflow += transaction.price
        acc.total += transaction.price
      } else {
        acc.outflow += transaction.price
        acc.total -= transaction.price
      }
      return acc
    },
    {
      inflow: 0,
      outflow: 0,
      total: 0,
    }
  )

  return summary
}
