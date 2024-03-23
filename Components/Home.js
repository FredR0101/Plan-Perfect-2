import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Itinerary } from './Itinerary'
import { AddActivity } from './AddActivity';
import { ShareItinerary } from './ShareItinerary'

export const Home = ({navigation}) => {
    const Tab = createBottomTabNavigator();
    return (
        <>
        <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName='Itinerary'>
            <Tab.Screen name="My Itinerary" component={Itinerary}/>
            <Tab.Screen name="Add Activity" component={AddActivity}/>
            <Tab.Screen name="Share Itinerary" component={ShareItinerary}/>
        </Tab.Navigator>
        </>
    )
}


