import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router'
import router from './Router/Routes.jsx'
import AuthProvider from './Context/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import '@fortawesome/fontawesome-free/css/all.min.css';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import 'leaflet/dist/leaflet.css';
import EntryLoader from './Pages/Loading/EntryLoader.jsx'

// Create a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Suspense fallback={<EntryLoader></EntryLoader>}>
          <RouterProvider router={router}></RouterProvider>
        </Suspense>
          <Toaster/>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
