/**
 * Script for reset the Database to the original data.
 *
 * Created by desaroger on 22/11/16.
 */

let resolve = require('path').resolve;
let fs = require('fs');
let fsExtra = require('fs-extra');

// Paths
let root = resolve(__dirname, '..');
let dbPath = resolve(root, './var/db.json');
let dbCleanPath = resolve(root, './var/db-clean.json');
let dbBackup = resolve(root, './var/db-backup.json');


// Delete previous backup
try {
  fs.unlinkSync(dbBackup);
} catch (e) {}

// Create a new backup
fs.renameSync(dbPath, dbBackup);

// Restore the clean data
fsExtra.copySync(dbCleanPath, dbPath);
