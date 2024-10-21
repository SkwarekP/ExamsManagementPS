import classes from './header.module.scss';
import { IChildrenProps } from '../../types';
import linkedinIcon from '../atoms/icons/icons8-linkedin-48.png';
import githubIcon from '../atoms/icons/icons8-github-48.png';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { ModalWarning } from '../modal/modal';
import { Backdrop } from '../modal/backdrop';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const activeLinkColor = (isActive: boolean) => {
  return { color: isActive ? 'gray' : 'inherit' };
};

export const Header = ({ children }: IChildrenProps) => {
  const state = useSelector((state: RootState) => state.exam);

  const navigate = useNavigate();
  const location = useLocation();
  const [isModalShown, setIsModalShown] = useState(false);

  const handleModal = () => {
    setIsModalShown(false);
    navigate('manageExams');
  };

  const handleNavigate = (
    event: React.MouseEvent<HTMLElement>,
    path: string
  ) => {
    event.preventDefault();

    if (path === location.pathname) return;

    if (state.type === 'LOADING') return;

    if (
      state.type === 'QUESTION' ||
      state.type === 'SUMMARY' ||
      state.type === 'FINISH_EXAM'
    )
      setIsModalShown(true);
    else navigate(path);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.wrapper__header}>
        <div className={classes.menu__item}>
          <NavLink
            style={({ isActive, isPending }) => activeLinkColor(isActive)}
            onClick={(event) => handleNavigate(event, '/')}
            to="/"
          >
            Exams
          </NavLink>
        </div>
        <div className={classes.menu__item}>
          <NavLink
            style={({ isActive, isPending }) => activeLinkColor(isActive)}
            onClick={(event) => handleNavigate(event, '/manageExams')}
            to="manageExams"
          >
            Manage Exams
          </NavLink>
        </div>
        <div className={classes.menu__item}>
          <div className={classes.social__media}>
            <div className={classes.social__media__img__container}>
              <button
                onClick={() =>
                  window.open(
                    'https://www.linkedin.com/in/patryk-skwara-93277625b/',
                    '_blank'
                  )
                }
              >
                <img src={linkedinIcon} alt="linkedin" />
              </button>
            </div>
            <div className={classes.social__media__img__container}>
              <button
                onClick={() =>
                  window.open('https://github.com/SkwarekP', '_blank')
                }
              >
                <img src={githubIcon} alt="github" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {isModalShown &&
        createPortal(
          <ModalWarning
            onConfirm={handleModal}
            onClose={() => setIsModalShown(false)}
          />,
          document.getElementById('modal')!
        )}
      {isModalShown &&
        createPortal(
          <Backdrop onClose={() => setIsModalShown(false)} />,
          document.getElementById('backdrop')!
        )}
      {children}
    </div>
  );
};
