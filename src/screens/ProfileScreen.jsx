import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

function ProfileScreen() {
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;
  
    const userUpdatedProfile = useSelector(state => state.userUpdateProfile);
    const { success: successUpdate, loading: loadingUpdate, error: errorUpdate } = userUpdatedProfile;

      
    const dispatch = useDispatch();
    useEffect(() => {
        if(!user) {
             
            dispatch({type:USER_UPDATE_PROFILE_RESET});
              
            dispatch(detailsUser(userInfo._id));
        } else {
            setName(user.name);
            setEmail(user.email);
        }
    }, [dispatch, userInfo._id, user]);

     
    const submitHandler = (e) => {
        e.preventDefault();
         
        if(password !== confirmPassword) {
            alert('Password and confirm password do not match');
        } else {
            
            dispatch(updateUserProfile({ userId: user._id, name, email, password }));
        }
    };


    return (
        <div>
            <form className='form'
                onSubmit={submitHandler}
            >
                <div>
                    <h1>User Profile</h1>
                </div>
                {
                    loading ? <LoadingBox />
                        : error ? <MessageBox> {error} </MessageBox>
                            : (
                                <>
                                    { loadingUpdate && < LoadingBox /> }
                                    { errorUpdate && < MessageBox variant='danger'> { errorUpdate } </MessageBox>}
                                    { successUpdate && < MessageBox variant='success'> Profile updated successfully </MessageBox>}
                                    <div>
                                        <label htmlFor="name">Name</label>
                                        <input type="text" id="name" value={name}
                                            onChange={(e)=> setName(e.target.value)}
                                        />
                                    </div>
                             <div>
                                        <label htmlFor="email">Email</label>
                                        <input type="email" id="email" value={email}
                                            onChange={ (e) => setEmail(e.target.value) }
                                        />
                                    </div>
                          <div>
                                        <label htmlFor="password">Password</label>
                                        <input type="password" id="password" placeholder='Change Password'
                                            onChange={ (e) => setPassword(e.target.value) }
                                        />
                       </div>
                                    <div>
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <input type="password" id="confirmPassword" placeholder='Confirm Password' 
                                            onChange={ (e) => setConfirmPassword(e.target.value) }
                                        />
                                    </div>
                                    <div>
                                        <label />
                                        <button className='primary' type='submit'
                                        >Update</button>
                                    </div>
                                </>
                            )
                }
            </form>
        </div>
    );
}

export default ProfileScreen;