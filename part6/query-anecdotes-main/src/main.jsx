import { createRoot } from 'react-dom/client'
import { NotificationProvider } from './NotificationContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App.jsx'


const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(

  <QueryClientProvider client={queryClient}>
    <NotificationProvider>
    <App />
    </NotificationProvider>
  </QueryClientProvider>
)