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


CREATE OR REPLACE FUNCTION remove_shelf_and_update_indexes(_userId UUID, _shelfId UUID, _index INT, _now TIMESTAMP DEFAULT NULL)
RETURNS SETOF shelf AS '
BEGIN
	  UPDATE shelf
	  SET "isDeleted" = true, "deletedAt" = COALESCE(_now, NOW()) 
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


CREATE OR REPLACE FUNCTION update_box_indexes(_userId UUID, _shelfId UUID, box_updates jsonb[], _now TIMESTAMP DEFAULT NULL)
RETURNS void AS $$
DECLARE
    box_update jsonb;
BEGIN
    FOREACH box_update IN ARRAY box_updates
    LOOP
        UPDATE box
        SET
            "index" = (box_update ->> 'index')::INT,
            "isDeleted" = true,
            -- Используем _now, если он не NULL; иначе NOW()
            "deletedAt" = COALESCE(_now, NOW())
        WHERE "userId" = _userId 
          AND "shelfId" = _shelfId 
          AND "id" = (box_update ->>'boxId')::UUID;
    END LOOP;
END;
$$ LANGUAGE plpgsql;
-- CREATE OR REPLACE FUNCTION update_box_indexes(
--     _userId UUID,
--     _shelfId UUID,
--     box_updates JSONB[],
--     _now TIMESTAMP DEFAULT NULL -- Задаем значение по умолчанию NULL для _now
-- )
-- RETURNS void AS $$
-- BEGIN
--     FOREACH box_update IN ARRAY box_updates
--     LOOP
--         UPDATE box
--         SET
--             "index" = (box_update ->> 'index')::INT,
--             "isDeleted" = true,
--             "deletedAt" = COALESCE(_now, NOW()) -- Используем _now, если он не NULL; иначе NOW()
--         WHERE "userId" = _userId 
--           AND "shelfId" = _shelfId 
--           AND "id" = (box_update->>'boxId')::UUID;
--     END LOOP;
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE OR REPLACE FUNCTION update_box_indexes(_userId UUID, _shelfId UUID, _boxes JSONB[])
-- RETURNS VOID AS $$
-- DECLARE
--     _box JSONB; -- Здесь изменено объявление на JSONB
-- BEGIN
--     -- Перебор массива JSON объектов, обновление индексов и флага isDeleted для каждой коробки
--     FOR _box IN SELECT jsonb_array_elements(_boxes) LOOP
--         -- Обновление индекса и установка флага isDeleted в true и deletedAt в NOW() для каждой коробки
--         UPDATE box
--         SET "index" = (_box->>'index')::INT,
--             "isDeleted" = true,
--             "deletedAt" = NOW()
--         WHERE "userId" = _userId 
--           AND "shelfId" = _shelfId 
--           AND "id" = (_box->>'boxId')::UUID;
--     END LOOP;
-- END;
-- $$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_shelf_order(_userId UUID, shelf_data jsonb)
RETURNS void AS '
DECLARE
    item record;
BEGIN
    FOR item IN SELECT * FROM jsonb_to_recordset(shelf_data) AS x(id uuid, index int)
    LOOP
        UPDATE shelf SET "index" = item.index WHERE id = item.id AND "userId" = _userId;
    END LOOP;
END;
' LANGUAGE plpgsql;
