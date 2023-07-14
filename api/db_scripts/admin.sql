ALTER TABLE supplies
ADD FOREIGN KEY (userId) REFERENCES users(userId);