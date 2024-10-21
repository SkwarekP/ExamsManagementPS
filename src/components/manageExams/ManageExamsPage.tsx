import { DataTable } from '../../ui/datatable/DataTable';
import classes from './ManageExamsPage.module.scss';
import { Button } from '../../ui/atoms/buttons/button';
import plusIcon from '../../ui/atoms/icons/icons8-plus-48.png';
import { createPortal } from 'react-dom';
import { AddExamModal } from '../../ui/modal/addExamModal';
import { Backdrop } from '../../ui/modal/backdrop';
import { useState } from 'react';
import { fetchExamKeywords } from '../../redux/thunks';
import { Dispatch } from '../../redux/store';
import { useDispatch } from 'react-redux';

export const ManageExamsPage = () => {
  const dispatch: Dispatch = useDispatch();
  const [isModalShown, setIsModalShown] = useState(false);

  const handleModal = () => {
    setIsModalShown(false);
    dispatch(fetchExamKeywords());
  };

  const closeModal = () => setIsModalShown(false);

  return (
    <div>
      <div className={classes.add__exam}>
        <Button onClick={() => setIsModalShown(true)}>
          <img src={plusIcon} alt="plus_Icon" />
          <span>Add</span>
        </Button>
      </div>
      {isModalShown &&
        createPortal(
          <AddExamModal onConfirm={handleModal} onClose={closeModal} />,
          document.getElementById('modal')!
        )}
      {isModalShown &&
        createPortal(
          <Backdrop onClose={() => {}} />,
          document.getElementById('backdrop')!
        )}
      <DataTable />
    </div>
  );
};
