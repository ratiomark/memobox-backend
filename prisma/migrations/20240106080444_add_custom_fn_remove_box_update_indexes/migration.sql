CREATE OR REPLACE FUNCTION remove_box_and_update_indexes(_userId UUID, _boxId UUID, _shelfId UUID, _index INT)
RETURNS TABLE(
    id UUID,
    index INT,
    timing JSONB,
    "specialType" "BoxSpecialType",
    "missedTrainingValue" "MissedTrainingValue",
    "isDeleted" BOOLEAN,
    "deletedAt" TIMESTAMP,
    "userId" UUID,
    "shelfId" UUID
) AS $$
BEGIN
    UPDATE box
    SET "isDeleted" = true, "deletedAt" = NOW()
    WHERE 
      box.id = _boxId AND
      box."userId" = _userId AND
      box."shelfId" = _shelfId;
    
    UPDATE box
    SET "index" = box."index" - 1
    WHERE 
      box."userId" = _userId AND 
      box."shelfId" = _shelfId AND 
      box."index" > _index;
    -- WHERE box.id = _boxId AND box."userId" = _userId AND box."shelfId" = _shelfId;

    CREATE TEMP TABLE temp_box ON COMMIT DROP AS
    SELECT * FROM box 
    WHERE 
      box."userId" = _userId AND
      box."shelfId" = _shelfId AND
      box."isDeleted" != true;

    -- UPDATE temp_box
    -- SET "isDeleted" = true, "deletedAt" = NOW()
    -- WHERE temp_box.id = _boxId;

    -- UPDATE temp_box
    -- SET "index" = temp_box."index" - 1
    -- WHERE temp_box."userId" = _userId AND temp_box."shelfId" = _shelfId AND temp_box."index" > _index;

    RETURN QUERY 
    SELECT * FROM temp_box 
    ORDER BY temp_box."index";
END;
$$ LANGUAGE plpgsql;