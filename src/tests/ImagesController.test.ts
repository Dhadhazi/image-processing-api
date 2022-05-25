import request from 'supertest';
import { app } from '../app';
import config from '../config';
import { fileExist } from '../utils/fileExist';
import sizeOf from 'image-size';
import { unlinkSync } from 'fs';

describe('GET /images route', () => {
  it('Should return status code 200', async (done) => {
    const result = await request(app).get('/images').send();

    expect(result.status).toBe(200);
    done();
  });
});

describe('GET /images/doesnotexist route', () => {
  it('Should return status code 404 and message', async (done) => {
    const result = await request(app).get('/images/doesnotexist').send();
    expect(result.status).toBe(404);
    expect(result.text).toBe('Image failed to process: base file does not exists');
    done();
  });
});

describe('These are the endpoint image generation tests', () => {
  // Generate random, to randomize the test image
  const RandomWidth = Math.floor(Math.random() * 300) + 50;
  const GeneratedFile = `${config.IMAGES_FOLDER}/test-w${RandomWidth}.jpg`;

  // Delete the file if it exists
  if (fileExist(GeneratedFile)) {
    unlinkSync(GeneratedFile);
    console.log('predelete');
  }

  describe('GET /images/test.jpg?w=[RANDOM] to GENERATE the image', () => {
    it('Should return 200', async (done) => {
      const result = await request(app).get(`/images/test.jpg?w=${RandomWidth}`).send();

      expect(result.status).toBe(200);
      done();
    });
  });

  describe('GET /images/test-w[RANDOM].jpg exists AFTER generating', () => {
    it('Should return true', async (done) => {
      const afterGenerating = fileExist(GeneratedFile);
      expect(afterGenerating).toBe(true);
      done();
    });
  });

  describe('GET /images/test-w[RANDOM].jpg - Compare SIZE for the requested width', () => {
    it('Should return true', async (done) => {
      try {
        const dimensions = await sizeOf(GeneratedFile);
        expect(dimensions.width).toBe(RandomWidth);
      } catch (err) {
        console.error(err);
      }

      // Delete the file
      if (fileExist(GeneratedFile)) {
        unlinkSync(GeneratedFile);
        console.log('delete');
      }
      done();
    });
  });
});
