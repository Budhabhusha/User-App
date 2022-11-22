import React, { useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import ErrorModal from "../UI/ErrorModal";
import classes from "./AddUser.module.css";

const AddUser = (props) => {
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState("");
  const [error,setError] = useState()

  const addUserHandler = (event) => {
    event.preventDefault();
    if(userName.trim().length === 0 || age.trim().length === 0){
      setError({
        title: 'Invalid Input',
        message: 'Please enter a valid name and age (non-empty values)'
      })
     return;
    }
    if(+age < 1){
      setError({
        title: 'Invalid Age',
        message: 'Please enter a valid age (> 0)'
      })
      return;
    }
    props.onAddUser(userName,age)
    setUserName('')
    setAge('')
  };

  const userNameChangeHandler = (e) => {
    setUserName(e.target.value);
  };

  const ageChangeHandler = (e) => {
    setAge(e.target.value);
  };
  
  const errorHandler = () => {
    setError(null)
  }

  return (
    <div>
     { error && <ErrorModal  title={error.title} message={error.message} onConfirm={errorHandler}/>}
    <Card className={classes.input}>
      <form onSubmit={addUserHandler}>
        <label htmlFor="username">User Name</label>
        <input id="username" type="text" value={userName} onChange={userNameChangeHandler} />
        <label htmlFor="age">Age (Years)</label>
        <input id="age" type="number"  value={age} onChange={ageChangeHandler}/>
        <Button type="submit">Add User</Button>
      </form>
    </Card>
    </div>
  );
};

export default AddUser;
