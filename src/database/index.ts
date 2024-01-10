import { Database } from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import logger from '@nozbe/watermelondb/utils/common/logger';

import Room from './models/Room';
import Message from './models/Message';

import Setting from './models/Setting';

import User from './models/User';
import serversSchema from './schema/servers';
import appSchema from './schema/app';
import type { TAppDatabase } from './interfaces';

const getDatabasePath = (name: string) => `local${name}'-experimental'}.db`;

export const getDatabase = (database = ''): Database => {
  const path = database.replace(/(^\w+:|^)\/\//, '').replace(/\//g, '.');
  const dbName = getDatabasePath(path);

  const adapter = new SQLiteAdapter({
    dbName,
    schema: appSchema,
    // migrations,
  });

  return new Database({
    adapter,
    modelClasses: [Room, Message, Setting, User],
  });
};

interface IDatabases {
  shareDB?: TAppDatabase | null;
  activeDB: TAppDatabase;
}

class DB {
  databases: IDatabases = {
    activeDB: new Database({
      adapter: new SQLiteAdapter({
        dbName: getDatabasePath('default'),
        schema: serversSchema,
        // migrations: serversMigrations,
      }),
      modelClasses: [Room, Message, Setting, User],
    }) as TAppDatabase,
  };

  // Expected at least one database
  get active(): TAppDatabase {
    return this.databases.activeDB || this.databases.shareDB;
  }

  get share() {
    return this.databases.shareDB;
  }

  set share(db) {
    this.databases.shareDB = db;
  }

  setShareDB(database = '') {
    const path = database.replace(/(^\w+:|^)\/\//, '').replace(/\//g, '.');
    const dbName = getDatabasePath(path);

    const adapter = new SQLiteAdapter({
      dbName,
      schema: appSchema,
      // migrations,
    });

    this.databases.shareDB = new Database({
      adapter,
      modelClasses: [Message, Setting, User],
    }) as TAppDatabase;
  }

  setActiveDB(database: string) {
    this.databases.activeDB = getDatabase(database) as TAppDatabase;
  }
}

const db = new DB();
export default db;

if (!__DEV__) {
  logger.silence();
}
