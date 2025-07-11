import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import './App.css'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')!).render(
  <>
    <Toaster/>
    <App />
  </>
)
