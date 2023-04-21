import React from 'react';
import './UserProfile.scss';
import {connect} from 'react-redux';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import {updateUserDetails} from './../../Store/Actions/LoginAction';
import 'react-toastify/dist/ReactToastify.css';
import {Countries, Genders, feet, inches} from './Utils.js';
import axios from "axios";
import MiniLoader from "../../components/Loader/MiniLoader";

const mapStateToProps = (state) => ({
    isUserUpdated: state.Login.isUserUpdated,
    currentUserDetails: state.Login.currentUserDetails
})

const mapDispatchToProps = (dispatch) => {
    
    return {
        updateUserDetails: (user) => dispatch(updateUserDetails(user, 'UserProfile'))
    }
}

class UserProfileComponent extends React.Component{
    
    
    constructor(props){
        super(props);
       
        if (!localStorage.getItem("isUserAuthenticated")){
            this.state = {
                userloggedIn: false,
                username: "",
                email: "",
                firstname: "",
                lastname: "",
                phonenumber: '',
                country: 'country',
                dob: "",
                gender: "",
                feat: "",
                inches: "",
                weight: "",
                bio: '',
                sendEmailVerification: false,
                selectedImage : '',
                profileImageUrl: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
            }
        }
        else{
            let loggedInUserDetails = JSON.parse(localStorage.getItem("user"));
            this.state = {
                userloggedIn: localStorage.getItem("isUserAuthenticated"),
                username: loggedInUserDetails["uuid"],
                email: loggedInUserDetails["email"],
                firstname: loggedInUserDetails["firstName"],
                lastname: loggedInUserDetails["lastName"],
                phonenumber: loggedInUserDetails["phone"],
                country: loggedInUserDetails["country"],
                dob: loggedInUserDetails["dateOfBirth"].split("T")[0],
                gender: loggedInUserDetails["gender"],
                feet: loggedInUserDetails["feet"] ,
                inches: loggedInUserDetails["inches"],
                weight: loggedInUserDetails["weight"],
                bio: loggedInUserDetails["bio"],
                sendEmailVerification: false,
                profileImageUrl: loggedInUserDetails["profilePicture"] 
            }
        }
        
    }

    handleChange(e){
        if (e !== null && e.target.name !== null && e.target.value !== null) {
            this.setState({
                [e.target.name]: e.target.value
            })
        }
        
    }

    fileSelectedHandler = (e) =>{
        
        this.setState({
            selectedImage: e.target.files[0]
        }, async ()=> {
            try {
                let imageUrl = "";
                if (this.state.selectedImage) {
                    const formData = new FormData();
                    formData.append("file", this.state.selectedImage);
                    formData.append("upload_preset", "Flexx-Appeal");
                    let config = {
                        onUploadProgress : ProgressEvent => {
                            let percentageCompleted = Math.floor((ProgressEvent.loaded * 100) / ProgressEvent.total);
                            this.setState({
                                imageUploadStatus: percentageCompleted
                            })

                            if(percentageCompleted === 100){
                                this.setState({
                                    imageUploadStatus: ""
                                }) 
                            }
                            
                        }
                    }
                    const response = await axios.post("https://api.cloudinary.com/v1_1/sid-web-designing-project/image/upload", formData, config);
                    imageUrl = response.data.url;
                }
                this.setState({
                    profileImageUrl: imageUrl
                });
            } catch (err) {
                console.log('error while uploading image to cloudinary');
            }
        })
        
    }

    fileUploadHandler = () => {

    }

    validatePhoneNumber(){
            if(this.state.phonenumber){
                var phoneno = /^\d{10}$/;
                if (this.state.phonenumber.match(phoneno)) {
                    this.setState({
                        phoneError: ""
                    })
                    return true;
                } else {
                    this.setState({
                        phoneError: "Invalid Phone Number"
                    })
                    return false;
                }
            }else{
                this.setState({
                    phoneError: ""
                })
                return true;
            }      
    }

    validateWeight() {
        if (this.state.weight) {
            var lbs = /^\d{2,3}$/;
            if (this.state.weight.match(lbs)) {
                this.setState({
                    weightError: ""
                })
                return true;
            } else {
                this.setState({
                    weightError: "Invalid weight"
                })
                return false;
            }
        } else {
            this.setState({
                weightError: ""
            })
            return true;
        }
    }
    
    validateEmail() {

        if (this.state.email.trim().length === 0) {
            this.setState({
                emailError: "email required"
            })
            return false;
        }
        else if (!/\S+@\S+\.\S+/.test(this.state.email)) {
            this.setState({
                emailError: 'Email address is invalid'
            })
            return false;
        } else {
            this.setState({
                emailError: ""
            })
            return true;
        }
    }


    updateUserProfile = () => {

        let validatePhoneNumber = this.validatePhoneNumber();
        let validateEmail = this.validateEmail();
        let validateWeight = this.validateWeight();

        if(validatePhoneNumber && validateEmail && validateWeight){

            this.props.updateUserDetails(
                { uuid: this.state.username, 
                firstName: this.state.firstname,
                lastName : this.state.lastname,
                email : this.state.email,
                phone : this.state.phonenumber,
                gender : this.state.gender,
                country : this.state.country,
                dateOfBirth : this.state.dob,
                feet : this.state.feet,
                inches : this.state.inches,
                weight : this.state.weight,
                bio : this.state.bio,
                profilePicture: this.state.profileImageUrl
                });
        }
    }

    cancelChanges = () => {
        let loggedInUserDetails = JSON.parse(localStorage.getItem("user"));
        this.state = {
            userloggedIn: localStorage.getItem("user"),
            username: loggedInUserDetails["uuid"],
            email: loggedInUserDetails["email"],
            firstname: loggedInUserDetails["firstName"],
            lastname: loggedInUserDetails["lastName"],
            phonenumber: loggedInUserDetails["phone"],
            country: loggedInUserDetails["country"],
            dob: loggedInUserDetails["dateOfBirth"].split("T")[0],
            gender: loggedInUserDetails["gender"],
            feet: loggedInUserDetails["feet"],
            inches: loggedInUserDetails["inches"],
            weight: loggedInUserDetails["weight"],
            bio: loggedInUserDetails["bio"],
            sendEmailVerification: false,
            profileImageUrl: loggedInUserDetails["profilePicture"]
        }
    }

    render(){
        
        if (this.state.userloggedIn) {
            
            return(
                <div className='mainContainer'>
                    <div className='header'>
                        <h2>Profile Page</h2>
                    </div>
                    <div className='innerContainer'>   
                        <div className='detailsContainer'>
                            <div className='header'>
                                <h2>Profile Settings</h2>
                                <hr></hr>
                            </div>
                            <div className = "userName_email_Container">
                                    <div className = "userName_Container">
                                    <input type="text" name="username" className="form-input" placeholder="Username*" value={this.state.username} disabled/>
                                        {this.state.usernameError && <p>{this.state.usernameError}</p>}
                                    </div>
                                    <div className = "email_Container">
                                    <input type="email" name="email" className="form-input" placeholder="Email*" value={this.state.email} onChange={this.handleChange.bind(this)}/>
                                        {this.state.emailError && <p>{this.state.emailError}</p>}
                                    </div>
                                </div>
                                <div className = "frst_lst_names_container">
                                    <div className = "frst_name_container">
                                    <input type="text" name="firstname" className="form-input" placeholder="First Name*" value={this.state.firstname} onChange={this.handleChange.bind(this)}/>
                                        {this.state.firstnameError && <p>{this.state.firstnameError}</p>}
                                    </div>
                                    <div className = "lst_name_container">
                                    <input type="text" name="lastname" className="form-input" placeholder="Last Name*" value={this.state.lastname} onChange={this.handleChange.bind(this)}/>
                                        {this.state.lastnameError && <p>{this.state.lastnameError}</p>}
                                    </div>
                                </div>
                                <div className = "phone_country_Container">
                                    <div className = "phone_Container">
                                    <input type="text" name="phonenumber" className="form-input" placeholder="Phone Number*" value={this.state.phonenumber} onChange={this.handleChange.bind(this)}/>
                                        {this.state.phoneError && <p>{this.state.phoneError}</p>}
                                    </div>
                                    <div className = "country_Container">
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Country</InputLabel>
                                            <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            name="country"
                                            label="Country"
                                            value={this.state.country} 
                                            onChange={this.handleChange.bind(this)}>
                                            {Countries.map(function (country, index) {
                                                return <MenuItem key={index} value={country}>{country}</MenuItem>
                                            })}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className = "dob_gender_container">
                                    <div className = "dob_container">
                                    <input type="text" name="dob" className="form-input" placeholder="Date of Birth (MM/DD/YYYY)" value={this.state.dob} onChange={this.handleChange.bind(this)}/>
                                        {this.state.dobError && <p>{this.state.dobError}</p>}
                                    </div>
                                    <div className = "gender_container">
                                        <FormControl fullWidth>
                                            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                            <Select
                                            name="gender"
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            label="Gender"
                                            value={this.state.gender} 
                                            onChange={this.handleChange.bind(this)}
                                            >
                                            {Genders.map(function (country, index) {
                                                return <MenuItem key={index} value={country}>{country}</MenuItem>
                                            })}
                                            </Select>
                                        </FormControl>
                                    </div>
                                </div>
                                <div className = "height_weight_container">
                                    <div className = "height_container">
                                        <div className='ft-container'>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">ft.</InputLabel>
                                                <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select" 
                                                name="feet"                                             
                                                label="ft."
                                                value={this.state.feet} 
                                                onChange={this.handleChange.bind(this)}
                                                >
                                                {feet.map(function (foot, index) {
                                                    return <MenuItem key={index} value={foot}>{foot}</MenuItem>
                                                })}
                                                </Select>
                                            </FormControl>
                                        </div>
                                        <div className='in-container'>
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">in.</InputLabel>
                                                <Select
                                                labelId="demo-simple-select-label"
                                                name="inches"
                                                id="demo-simple-select"
                                                label="in."
                                                value={this.state.inches} 
                                                onChange={this.handleChange.bind(this)}
                                                >
                                                {inches.map(function (inch, index) {
                                                    return <MenuItem key={index} value={inch}>{inch}</MenuItem>
                                                })}
                                                </Select>
                                            </FormControl>
                                        </div>
                                        
                                    </div>
                                    <div className = "weight_container">
                                        <input type="text" name="weight" className="form-input" placeholder="lbs" value={this.state.weight} onChange={this.handleChange.bind(this)} />
                                        {this.state.weightError && <p>{this.state.weightError}</p>}
                                    </div>
                                </div>
                                <div className='bio-container'>
                                    <div className='textArea-Container'>
                                        <TextareaAutosize
                                            aria-label="minimum height"
                                            minRows={6}
                                            name="bio"
                                            value={this.state.bio} 
                                            onChange = {this.handleChange.bind(this)}
                                            placeholder="Bio (optional)" 
                                        />
                                    </div>
                                </div>
                                <div className="footer-container">
                                    <hr></hr>
                                    <div className='button-container'>
                                        <button onClick={this.updateUserProfile}>Update</button>
                                        <button onClick={this.cancelChanges}>Cancel</button>
                                    </div>
                                </div>
                        </div>
                        <div className="imageContainer">
                            <div className="header">
                                <h2>Profile Picture</h2>
                                <hr></hr>
                            </div>
                            <div className="image-container">
                                <div className="image-holder">
                                    {this.state.imageUploadStatus ? <div className="Mini-loader">
                                        <MiniLoader height={230} width={305} />
                                    </div> :  <img src={this.state.profileImageUrl}></img>}
                                </div>
                                <div className="input-holder">
                                    <input  type="file" accept="image/*" onChange={this.fileSelectedHandler.bind(this)} ref={fileInput => this.fileInput = fileInput}></input>
                                    <button onClick={() => this.fileInput.click()}>Select Image</button>
                                    
                                </div>
                            </div>
                            <div className="empty-space">

                            </div>
                            <div className="line">
                                <hr></hr>
                            </div>
                        </div>
                        
                    </div>
                </div>
            ) 
        } 
        else{
            return(
                <div>
                    <h1>You haven't logged in!</h1>
                </div>
            )
        }
    }
}

const UserProfile = connect(mapStateToProps, mapDispatchToProps)(UserProfileComponent);
export default UserProfile;