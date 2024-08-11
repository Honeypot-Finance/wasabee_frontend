import localforage from 'localforage';

localforage.config({
    driver      : localforage.INDEXEDDB, // Force WebSQL; same as using setDriver()
    name        : 'honeypot' + process.env.NEXT_PUBLIC_ENV, // DB name
    version     : 1.0,
    storeName   : 'dex', // Should be alphanumeric, with underscores.
    // description : ''
});
export {
    localforage
}