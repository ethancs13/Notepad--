import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Post added to database.');
  // Create connection
  const jateDb = await openDB('jate', 1);
  // Create transaction on jate object in database
  const tx = jateDb.transaction('jate', 'readwrite');
  // Gets reference and opens object store inside transaction
  const store = tx.objectStore('jate');
  // Request made using .put() method to put object into object store. Has an id of 1 and content is what was passed in as param.
  const request = store.put({ id: 1, content: content });
  // Waits for request promise to be completed.
  const result = await request;
  console.log('Data saved to database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => console.error('getDb not implemented');

initdb();


