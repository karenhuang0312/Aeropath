const Database = require('better-sqlite3');
const path = require('path');

// Simple SQLite database initialization
const db = new Database(path.join(__dirname, 'prisma', 'dev.db'));

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS User (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS Post (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT,
    published INTEGER DEFAULT 0,
    authorId INTEGER NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (authorId) REFERENCES User(id)
  );
`);

// User queries
const createUser = db.prepare(`
  INSERT INTO User (username, password) 
  VALUES (?, ?)
`);

const findUserById = db.prepare(`
  SELECT * FROM User WHERE id = ?
`);

const findUserByUsername = db.prepare(`
  SELECT * FROM User WHERE username = ?
`);

// Post queries
const createPost = db.prepare(`
  INSERT INTO Post (title, content, published, authorId) 
  VALUES (?, ?, ?, ?)
`);

const findAllPosts = db.prepare(`
  SELECT p.*, u.username 
  FROM Post p 
  JOIN User u ON p.authorId = u.id 
  ORDER BY p.createdAt DESC
`);

const findPostById = db.prepare(`
  SELECT p.*, u.username 
  FROM Post p 
  JOIN User u ON p.authorId = u.id 
  WHERE p.id = ?
`);

const updatePost = db.prepare(`
  UPDATE Post 
  SET title = ?, content = ?, published = ?, updatedAt = CURRENT_TIMESTAMP 
  WHERE id = ?
`);

const deletePost = db.prepare(`
  DELETE FROM Post WHERE id = ?
`);

module.exports = {
  user: {
    create: (data) => {
      const result = createUser.run(data.username, data.password);
      return { id: result.lastInsertRowid, username: data.username };
    },
    findUnique: ({ where }) => {
      if (where.id) return findUserById.get(where.id);
      if (where.username) return findUserByUsername.get(where.username);
      return null;
    },
    findFirst: ({ where }) => {
      // Only need to support OR with username for our use case
      if (where.OR) {
        for (const condition of where.OR) {
          if (condition.username) {
            const user = findUserByUsername.get(condition.username);
            if (user) return user;
          }
        }
      }
      return null;
    }
  },
  post: {
    create: ({ data, include }) => {
      const result = createPost.run(data.title, data.content, data.published ? 1 : 0, data.authorId);
      const post = findPostById.get(result.lastInsertRowid);
      return {
        id: result.lastInsertRowid,
        title: data.title,
        content: data.content,
        published: Boolean(data.published),
        authorId: data.authorId,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        author: {
          id: post.authorId,
          username: post.username,
        }
      };
    },
    findMany: ({ include, orderBy }) => {
      const posts = findAllPosts.all();
      return posts.map(post => ({
        id: post.id,
        title: post.title,
        content: post.content,
        published: Boolean(post.published),
        authorId: post.authorId,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        author: {
          id: post.authorId,
          username: post.username,
        }
      }));
    },
    findUnique: ({ where, include }) => {
      const post = findPostById.get(where.id);
      if (!post) return null;
      return {
        id: post.id,
        title: post.title,
        content: post.content,
        published: Boolean(post.published),
        authorId: post.authorId,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        author: {
          id: post.authorId,
          username: post.username,
        }
      };
    },
    update: ({ where, data, include }) => {
      const current = findPostById.get(where.id);
      if (!current) return null;
      
      const title = data.title ?? current.title;
      const content = data.content !== undefined ? data.content : current.content;
      const published = data.published !== undefined ? (data.published ? 1 : 0) : current.published;
      
      updatePost.run(title, content, published, where.id);
      
      return {
        id: current.id,
        title,
        content,
        published: Boolean(published),
        authorId: current.authorId,
        createdAt: current.createdAt,
        updatedAt: new Date().toISOString(),
        author: {
          id: current.authorId,
          username: current.username,
        }
      };
    },
    delete: ({ where }) => {
      deletePost.run(where.id);
      return {};
    }
  },
  $disconnect: () => {
    db.close();
  }
};
