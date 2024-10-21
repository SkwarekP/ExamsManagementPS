import React from 'react';
import './style.css';
import { ExamReduxProcess } from './examReduxProcess';
import { Provider } from 'react-redux';
import { getStore } from './redux/store';
import { Header } from './ui/header/header';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ManageExamsPage } from './components/manageExams/ManageExamsPage';

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
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
