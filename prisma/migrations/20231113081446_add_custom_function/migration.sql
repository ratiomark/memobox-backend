CREATE OR REPLACE FUNCTION add_shelf_and_update_indexes(_userId UUID, _title TEXT)
RETURNS TABLE(id UUID, title TEXT, index INT, isCollapsed BOOLEAN, createdAt TIMESTAMP, updatedAt TIMESTAMP, userId UUID) AS '
DECLARE
    new_shelf RECORD;
BEGIN
    -- Обновить индексы
    UPDATE "Shelf"
    SET "index"  = "Shelf"."index" + 1
    WHERE "userId" = _userId AND "Shelf"."index" >= 0;

    -- Добавить новую полку и вернуть ее данные
 		RETURN QUERY
    INSERT INTO "Shelf" ("userId", "title", "index")
    VALUES (_userId, _title, 0)
RETURNING *;
-- 	RETURNING "Shelf".id, "Shelf"."title", "Shelf"."index", "Shelf"."isCollapsed", "Shelf"."createdAt", "Shelf"."updatedAt", "Shelf"."userId";
END;
' LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION remove_shelf_and_update_indexes(_userId UUID, _shelfId UUID, _index INT)
RETURNS TABLE(id UUID, title TEXT, index INT, isCollapsed BOOLEAN, createdAt TIMESTAMP, updatedAt TIMESTAMP, userId UUID) AS '
BEGIN
    DELETE FROM "Shelf"
    WHERE "Shelf"."id" = _shelfId AND "Shelf"."userId" = _userId;

    -- Обновляем индексы для оставшихся полок
    UPDATE "Shelf"
    SET "index" = "Shelf"."index" - 1
    WHERE "userId" = _userId AND "Shelf"."index" > _index;

    -- Возвращаем обновленный список полок
    RETURN QUERY
    SELECT * FROM "Shelf"
    WHERE "userId" = _userId
    ORDER BY "index";
END;
' LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_shelf_order(shelf_data jsonb)
RETURNS void AS '
DECLARE
    item record;
BEGIN
    FOR item IN SELECT * FROM jsonb_to_recordset(shelf_data) AS x(id uuid, index int)
    LOOP
        UPDATE "Shelf" SET "index" = item.index WHERE id = item.id;
    END LOOP;
END;
' LANGUAGE plpgsql;