# Trace Me - Contact Tracing App

## Description:
This project is an app that collects location and timestamps from users to help contact tracing in the pandemic. The information collected can be used to find out who the user may have come in contact with and warn them if they may have been exposed to someone who reports they have been infected.

## Installation
            
To install necessary dependencies, run the following command: npm install

## User Story

AS a person living in a pandemic
I WANT to log where I've been and at what times
SO THAT I can know when I've been in contact with someone who's been infected

GIVEN a website to track activities
WHEN the page loads I have to login or signup
THEN I am shown my member page
WHEN I click to CHECK IN
THEN my location and time is captured and stored
WHEN click to CHECK OUT
THEN my time in that location is ended and stored and displayed on a map
WHEN I click I HAVE BEEN INFECTED
THEN my infection status is changed to "infected" = 2
WHEN I click I HAVE BEEN HEALED
THEN my infection status is changed to "not infected" = 0
WHEN I am warned
THEN my infection status is changed to "warning" = 1
WHEN I click logout
THEN I am taken to the main page
