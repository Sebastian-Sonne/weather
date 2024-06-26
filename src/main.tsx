import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/css/styles.css';
import './assets/css/custom.css';
import { Provider } from 'react-redux'
import { store } from './state/store.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <App />
    </Provider>
)
