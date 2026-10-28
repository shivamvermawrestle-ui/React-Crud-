import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import{ UserContextProvider} from './Context/UserContext.jsx'
import { ProductContextProvider } from './Context/ProductContext.jsx'

createRoot(document.getElementById('root')).render(


<BrowserRouter>
<UserContextProvider>
  <ProductContextProvider>


  <StrictMode>
    <App />
  </StrictMode>
</ProductContextProvider>
</UserContextProvider>
</BrowserRouter>
)
