CREATE OR REPLACE FUNCTION add_shelf_and_update_indexes(_userId UUID, _title TEXT)
RETURNS SETOF shelf AS '
DECLARE
    new_shelf RECORD;
BEGIN
    -- Обновить индексы
    UPDATE shelf
    SET "index"  = shelf.index + 1
    WHERE "userId" = _userId AND shelf.index >= 0;

    -- Добавить новую полку и вернуть ее данные
 	RETURN QUERY
    INSERT INTO shelf ("userId", title, index, "isCollapsed")
    VALUES (_userId, _title, 0, true)
    RETURNING *;

END;
' LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION remove_shelf_and_update_indexes(_userId UUID, _shelfId UUID, _index INT)
RETURNS SETOF shelf AS '
BEGIN
--    DELETE FROM shelf
--    WHERE shelf.id = _shelfId AND shelf."userId" = _userId;
	  UPDATE shelf
	  SET "isDeleted" = true
	  WHERE shelf.id = _shelfId;

    -- Обновляем индексы для оставшихся полок
    UPDATE shelf
    SET "index" = shelf."index" - 1
    WHERE "userId" = _userId AND shelf.index > _index;

    -- Возвращаем обновленный список полок
    RETURN QUERY
    SELECT * FROM shelf
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
        UPDATE shelf SET "index" = item.index WHERE id = item.id;
    END LOOP;
END;
' LANGUAGE plpgsql;