import './style.css';
import { ExamReduxProcess } from './examReduxProcess';
import { Provider, useSelector} from 'react-redux';
import { getStore, RootState } from './redux/store';
import { Header } from './ui/header/header';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ManageExamsPage } from './components/manageExams/ManageExamsPage';
import { Snackbar } from './ui/snackbar/snackbar';
import { createPortal } from 'react-dom';
import { Exam } from './components/exam/exam';
import { useFetchExamQuery } from './redux/queries/ExamQueries';

function App() {
  const state = useSelector((state: RootState) => state)
  // const {data: exam} = useFetchExamQuery
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
    // {
    //   path: `/execution/${state.execution.executionId}`,
    //   element: (
    //     <Header>
    //       <Exam exam={[]}/>
    //     </Header>
    //   ),
    // },
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
