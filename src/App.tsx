import './style.css';
import { ExamReduxProcess } from './examReduxProcess';
import { Provider} from 'react-redux';
import { getStore } from './redux/store';
import { Header } from './ui/header/header';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ManageExamsPage } from './components/manageExams/ManageExamsPage';
import { Snackbar } from './ui/snackbar/snackbar';
import { createPortal } from 'react-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: (
        <Header>
          <ExamReduxProcess />
        </Header>
      ),
    },
    {
      path: 'manageExams',
      element: (
        <Header>
          <ManageExamsPage />
        </Header>
      ),
    },
  ]);

  return (
    <div className="App">
      <Provider store={getStore()}>
      {createPortal(<Snackbar />,document.getElementById('snackbar')!)}
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
