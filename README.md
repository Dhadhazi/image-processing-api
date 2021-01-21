# Image Processing API

## Scripts

npm test -> To run the tests
npm start -> To start the app
npm build -> To build the app

## Endpoints

- /images
  - adding file name gets the file (images/fjord.jpg)
  - can generate any size of the file by adding queries:
    - h=200 will resize the image to 200 height
    - w=200 will resize the image to 200 width
    - h=200&w=200 will resize the image the 200 width and 200 height
    - _example_: images/fjord.jpg?w=200&h=200
- /uploads
  - ability to upload images, no verification
