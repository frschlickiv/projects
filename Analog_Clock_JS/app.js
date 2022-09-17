/*
1. the circle is divided into 360 degrees.
2. for minutes and hours, you need to take into account the faster hands of the clock, so that the the hands operate smoothly,
Calculations:
1. seconds
We have 60 seconds in a minute. 360 degrees in a circle / 60 = 6
That is, every one second, the hand must be turned 6 degrees.
0s = 0*6 = 0 degrees,
15s = 15*6 = 90 degrees
30s = 30*6 = 180 degrees 
2. minutes
There are 60 minutes in an hour. That is, timeInterval = 6 (360/60)
As we do not take into account the seconds, the minute hand will move in leaps
(every 6 degrees) every minute.
1 minute = 6 degrees
2 minutes = 12 degrees 
+ seconds / 10 give us from 0 to 5.9 degrees, which we add to the minute hand.


1 min and 0 sec = 6 degrees 
1 min and 30 sec = 6 degrees + 30 / 10 = 9 degrees.
That is, the hand is halfway between 1 min and 2 min.
1 min and 59 sec and 2 min 0 sec - the clock hand is practically in the same place
Which gives smoothness.
3. hours
- The analog clock displays 12 hours.
360/12 = 30 is our timeInterval
1 hour = 30 degrees
2 hour = 60 degrees
3 hour = 90 degrees
For the hands to run smoothly, you need to take into account the minutes (+ possibly seconds).
Without it, the hours hand would move 30 degrees every hour (by leaps)
Minutes are in the range 0-59 and one hour is 30 degrees so we have to
minutes divide / 2.
1:30 will give us 30 degrees + 30/2 = 30 + 15 = 45 degrees.
which is halfway between 1 and 2 hours
*/

const secondsHand = document.getElementById("seconds-hand");
const minutesHand = document.getElementById("minutes-hand");
const hoursHand = document.getElementById("hours-hand");

function getTime() {
  const now = new Date();
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();
  const timeInterval = 6;

  secondsHand.style.transform = "rotate(" + seconds * timeInterval + "deg)";
  minutesHand.style.transform =
    "rotate(" + (minutes * timeInterval + seconds / 10) + "deg)";
  hoursHand.style.transform = "rotate(" + (hours * 30 + minutes / 2) + "deg)";
}

setInterval(getTime, 100);
