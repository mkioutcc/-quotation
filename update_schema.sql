-- Add tags and is_deleted columns to user_notes table
ALTER TABLE user_notes 
ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS is_deleted BOOLEAN DEFAULT FALSE;

-- Update existing records to set is_deleted to false
UPDATE user_notes 
SET is_deleted = FALSE 
WHERE is_deleted IS NULL;

-- Create an index on is_deleted for better query performance
CREATE INDEX IF NOT EXISTS idx_user_notes_is_deleted ON user_notes(is_deleted);

-- Create an index on user_id and is_deleted for common queries
CREATE INDEX IF NOT EXISTS idx_user_notes_user_id_is_deleted ON user_notes(user_id, is_deleted);
