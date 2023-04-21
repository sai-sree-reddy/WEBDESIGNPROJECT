import { SportsBasketball, SportsTennis, DirectionsBike, Pool, LocalDining, Hiking, DirectionsRun, Hotel, FitnessCenter, DirectionsWalk, LocalDrink, SelfImprovement } from '@mui/icons-material';
import DancingLogo from '../Assets/LeaderboardIcons/dancing-icon.svg'

export const getLeaderboardIcons = (activityId) =>{
    switch (activityId) {
        case 1: return <SportsTennis fontSize='large' color='primary' className='leaderboard-logo'/>;
        case 2: return <SportsBasketball fontSize='large' color='primary' className='leaderboard-logo'/>;
        case 3: return <DirectionsBike fontSize='large' color='primary' className='leaderboard-logo'/>;
        case 4: return <img src={DancingLogo} alt='logo' className='leaderboard-logo'/>;
        case 5: return <LocalDining fontSize='large' color='primary' className='leaderboard-logo'/>;
        case 6: return <Hiking fontSize='large' color='primary' className='leaderboard-logo'/>;
        case 7: return <DirectionsRun fontSize='large' color='primary' className='leaderboard-logo'/>;
        case 8: return <Hotel fontSize='large' color='primary' className='leaderboard-logo'/>;
        case 9: return <FitnessCenter fontSize='large' color='primary' className='leaderboard-logo'/>;
        case 10: return <Pool fontSize='large' color='primary' className='leaderboard-logo'/>;
        case 11: return <DirectionsWalk fontSize='large' color='primary' className='leaderboard-logo'/>;
        case 12: return <LocalDrink fontSize='large' color='primary' className='leaderboard-logo'/>;
        case 13: return <SelfImprovement fontSize='large' color='primary' className='leaderboard-logo'/>;
        default: break;
    }
}