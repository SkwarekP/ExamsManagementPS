import React, { ReactNode } from 'react'
import { activeLinkColor, Header } from '../header/header'
import classes from './container.module.scss'
import { NavLink, useNavigate } from 'react-router-dom';

interface Container {
    children: ReactNode;
}
export const Container: React.FC<Container> = ({ children }) => {
    const navigate = useNavigate();

    const handleNavigate = (event: any, path:string) => {
        navigate(path)
    }
    return (
        <Header>
            <div className={classes.container}>
                <div className={classes.sidebar__wrapper}>
                    <div className={classes.sidebar__item__wrapper}>
                        <div className={classes.sidebar__item}>
                            <NavLink
                                style={({ isActive, isPending }) => activeLinkColor(isActive)}
                                onClick={(event) => handleNavigate(event, '/')}
                                to="manageExams"
                            >
                                Attempts
                            </NavLink>
                        </div>
                    </div>
                </div>
                <div className={classes.content}>
                    {children}
                </div>
            </div>
        </Header>
    )
}