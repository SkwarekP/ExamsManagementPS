import classes from "./error.module.scss"
import {AxiosError} from "axios";
import {Button} from "../atoms/buttons/button";
import {Dispatch} from "../../redux/store";
import {useDispatch} from "react-redux";
import {fetchExamKeywords} from "../../redux/thunks";

interface IError {
    error: AxiosError
}


export const Error = ({error}: IError) => {

    const dispatch: Dispatch = useDispatch();

    return (
        <div className={classes.wrapper}>
            <div className={classes.error}>
                <h3>Something went wrong...</h3>
                <p>Message: <span>{error.message}</span></p>
                <p>status: <span>{error.request.status}</span></p>
                <Button onClick={() => dispatch(fetchExamKeywords())}>Back</Button>
            </div>
        </div>
    )
}