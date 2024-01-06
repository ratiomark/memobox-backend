CREATE OR REPLACE FUNCTION remove_box_and_update_indexes(_userId UUID, _boxId UUID, _index INT)
RETURNS SETOF Box AS '
BEGIN
    UPDATE "Box"
    SET "isDeleted" = true, "deletedAt" = NOW()
    WHERE "Box".id = _boxId;

    -- Обновляем индексы для оставшихся коробок
    UPDATE "Box"
    SET "index" = "Box"."index" - 1
    WHERE "userId" = _userId AND "Box".index > _index;

    -- Возвращаем обновленный список коробок
    RETURN QUERY
    SELECT * FROM "Box"
    WHERE "userId" = _userId
    ORDER BY "index";
END;
' LANGUAGE plpgsql;