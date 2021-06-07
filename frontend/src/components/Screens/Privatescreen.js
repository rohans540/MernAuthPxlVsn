import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

const PrivateScreen = ({ history }) => {
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");

    const [currentDate, setCurrentDate] = useState(new Date());

    const classes = useStyles();

    useEffect(() => {
        if(!localStorage.getItem("accessToken")) {
            history.push("/login");
        }

        const fetchPrivateData = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`
                }
            }

            try {
                const { data } = await axios.get("api/private", config);
                setPrivateData(data.data);
            } catch (error) {
                localStorage.removeItem("accessToken");
                setError("You are not signed in! Please log in.")
            }
        }

        fetchPrivateData();
    }, [history]);

    const logoutHandler = () => {
        localStorage.removeItem("accessToken");
        history.push("/login");
    }

    return (
        error ? <span className="error-message">{error}</span> : 
        <> 
            <div style={{ background: 'green', color: 'white' }}>
                {privateData}
            </div>
            <form className={classes.container} noValidate>
                    <TextField
                        id="date"
                        label="Pick Date"
                        type="date"
                        value={currentDate}
                        onChange={(e) => setCurrentDate(e.target.value)}
                        defaultValue="2017-05-24"
                        className={classes.textField}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                </form>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {currentDate.toString()}
                </div>
            <button onClick={logoutHandler}>Logout</button>
        </>
    );
}

export default PrivateScreen;