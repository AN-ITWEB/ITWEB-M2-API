
# Fitness – a Web App with Node, Express and Mongo

## How to access
https://itweb-m1-fitness.herokuapp.com/

## Assignment
#### Purpose:
To demonstrate fulfilment of the learning objectives:
- Explain the principles for using a MVC framework in a web server
- Design and implement a web site that include persistence of data in a database.
- Basic knowledge regarding hosting of web applications including cloud based hosting.
#### Technology requirements
The web app must use Node as web server, Express as MVC framework, Pug as HTML-template engine
and Mongo as database. It is recommended to use Heruko as Cloud provider.
#### Functional requirements
Develop a fitness web app. The user should be able to create workout programs similar to the one shown
beneath. A workout program is a collection of exercises (workouts) that each have a name, description,
number of sets and number of repetitions or time.

Basic functionality:
- [x] The user can create a new workout program
- [x] The user can add new exercises to a workout program
- [x] An exercise has a name, a description, number of sets and number of repetitions or the time it
should last.
- [x] Workout programs is persisted in a database (MongoDb)

Optional functionality:
- [ ] The user can log workout activity

Workout program example.

| Exercise        | Description           | Set  |Reps/time|
|-------------|:-------------:|-----:|-----:|
| Squat     | Stand with your feet spread shoulderwidth apart. Lower your body as far as you can by pushing your hips back and bending your knees. Pause, and then slowly push yourself back to the starting position. | 3 |    20    |
| Push ups      | Place your hands on the floor with legs straight out behind you resting on your toes. Bend your arms and slowly …      |   3 |    10     |
| Plank | Place your elbows on the floor shoulderwidth apart with legs stretched out behind you so only your elbows and toes are in contact with the ground. Use your abdominal muscles to keep …      |    1 |    30 sec       |
