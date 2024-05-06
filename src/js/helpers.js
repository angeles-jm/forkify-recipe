import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config.js';

// the goal of this file or of this module is to contain a couple of functions that we reuse over and over in our project.

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX = async function (url, uploadData = undefined) {
  try {
    const fetchPromise = uploadData
      ? fetch(url, {
          method: 'POST',
          // headers = some snippet of text which is like info about the request
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(uploadData),
        })
      : fetch(url);

    // Whoever gets executed first will be the winner
    const res = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);
    // JSON Method is a method that is available on all the response object

    // A response object is what a fetch function returns
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
/*
export const getJSON = async function (url) {
  try {
    const fetchPromise = fetch(url);
    // Whoever gets executed first will be the winner
    const res = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);
    // JSON Method is a method that is available on all the response object

    // A response object is what a fetch function returns
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};

export const sendJSON = async function (url, uploadData) {
  // POST request to send data, we need to pass in an object of some options
  try {
    const fetchPromise = fetch(url, {
      method: 'POST',
      // headers = some snippet of text which is like info about the request
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(uploadData),
    });
    // Whoever gets executed first will be the winner
    const res = await Promise.race([fetchPromise, timeout(TIMEOUT_SEC)]);
    // JSON Method is a method that is available on all the response object

    // A response object is what a fetch function returns
    const data = await res.json();
    if (!res.ok) throw new Error(`${data.message} (${res.status})`);
    return data;
  } catch (err) {
    throw err;
  }
};
 */
