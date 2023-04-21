
import './Loader.scss'
import Loader from '../../Assets/Images/loader.gif'


//loader component to call the loader on page load
const Header = () => {
  return (
    <div className="loader-container"> 
        <img alt="loader" src={Loader} />
    </div> 
  )
  
}

export default Header;
