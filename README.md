# Plan Perfect

## Overview

This is a mobile application built using React Native and Firebase. It offers a comprehensive set of features to enhance the user experience. 
Mobile-view


## Authentication: 

The user is first greeted with a login page if not signed in already. Users can securely login or sign up for the app using Firebase Authentication. 
If it is a new user, the itineraries will be empty until the user adds their own itinerary.
If the user wants to interact with app features with pre-existing information, it is encouraged to use the following login information:

Email: bear@gmail.com
password: bear123


## Itinerary Management: 

Users can view all the itineraries in "My Trips" Page and clicking on each itinerary opens up a single itinerary page. You can also delete an itinerary using the delete button on the itinerary card.

## Single Itinerary Page:

### My Itinerary Page
The single itinerary page leads the user to the 'My Itinerary page' where it lets the user  to view your own itinerary with activities displayed on the page, update or delete a single activity.

### Add Activity Page
The user could also add an activity to their existing itinerary in the Add Activity page. 



## Activity Recommendations: 
The app provides recommendations for activities. The user can click the "view more" button to view the event in more detail.
### Single Event Page:
The user can have more information about the event.
If the user wishes to add the event to their itinerary, they can do so by selecting the itinerary from a list of available itineraries and clicking 'Add to Itinerary' button.



# Profile section: 
## My Profile:
Users can view and update their profiles, including personal information on My Profile Page. 

## Sign Out and Delete Account: 

Users can securely sign out of their accounts or delete their accounts if desired.

## My Calendar:
The app automatically organizes and updates activities on a calendar based on the user's itinerary.

This app aims to provide users with a seamless and intuitive experience for planning and managing their travel itineraries, with the added convenience of activity recommendations and calendar integration.


## Technologies Used

React Native

Firebase Authentication

Firebase Firestore

## Installation


1.Clone this repository to your local machine.

git clone https://github.com/FredR0101/Plan-Perfect-2.git

2.Navigate to the project directory.

cd Plan-Perfect-2

3.Install dependencies.

npm install/yarn install.

4.Set up Firebase for your project by following the Firebase documentation.

5.Add your Firebase configuration to the appropriate files (e.g., firebase.js).

6.Run the app using.

npx expo start

