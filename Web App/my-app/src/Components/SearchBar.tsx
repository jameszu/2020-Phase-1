import React, {useState} from 'react';
import {Button, Grid, TextField } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import './SearchBar.css';

import { IUserInput } from 'D:/All_documents/Github/2020-Phase-1/Web App/my-app/src/Common/interfaces'

interface ISearchBarProps
{
    SetUserInput: (a: IUserInput) => void;
}


function SearchBar(props: ISearchBarProps)
{
    // Handle Search bar
    const [SearchQuery, setSearchQuery] = useState<string | null>("");
    const handleSearchQueryChange = (s: string | null) =>{
        setSearchQuery(s);          
    }
    const [HasFocus, setHasFocus] = useState<boolean>(false);
    // Handle Dates boxes
    const [StartDate, setStartDate] = useState<Date | null>(new Date('2014-08-18'),);
    const handleStartDateChange = (date: Date | null) => {
        setStartDate(date);
    };
    
    const [EndDate, setEndDate] = useState<Date | null>(
        new Date('2020-05-18'),
    );

    const handleEndDateChange = (date: Date | null) => {
        setEndDate(date)
    };

    // Handle Submit
    const handleSubmit = () => 
    {
        if (SearchQuery?.length !== 0 && SearchQuery !== null && SearchQuery !== "")
        {
            let UserInput: IUserInput = 
            {
                SearchQuery: SearchQuery,
                StartDate: StartDate,
                EndDate: EndDate
            }
            props.SetUserInput(UserInput);
        } else{
            setHasFocus(true);
        }
    }
    
    return <div 
    className="SearchBarContainer">
        <Grid container spacing={3}>
            <Grid item xs={6} sm={3}>
                <TextField 
                    required
                    id="outlined-required"
                    label="Search"
                    variant="outlined"
                    error={HasFocus && SearchQuery === ""}
                    onClick={() => setHasFocus(true)}
                    value={SearchQuery}
                    onChange={e => handleSearchQueryChange(e.target.value)}
                    />
            </Grid>

            <MuiPickersUtilsProvider utils= {DateFnsUtils}>
                <Grid item xs={6} sm={3}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="StartDate"
                        label="Start Date (Optional)"
                        value={StartDate}
                        onChange={handleStartDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date', 
                        }}
                        />
                </Grid>
                <Grid item xs={6} sm={3}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="EndData"
                        label="End Date (Optional)"
                        value={EndDate}
                        onChange={handleEndDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date', 
                        }}
                        />
                </Grid>
            </MuiPickersUtilsProvider>
           
            <Grid item xs={6} sm={3}>
                <Button 
                variant="contained" 
                color="primary" 
                onClick={handleSubmit}>
                    Submit
                </Button>
            </Grid>
        </Grid>

    </div>
}
export default SearchBar