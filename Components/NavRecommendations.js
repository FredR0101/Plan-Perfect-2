import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Recommendations } from './Recommendations';
import { SingleEvent } from './SingleEvent';

export const NavRecommendations = () => {
    const Tab = createBottomTabNavigator();
    return (
        <Tab.Navigator screenOptions={{headerShown: false}} initialRouteName='Recommendations'>
            <Tab.Screen name="Recommendations" component={Recommendations}/>
        </Tab.Navigator>
    )
}