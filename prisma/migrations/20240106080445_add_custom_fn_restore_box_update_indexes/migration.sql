CREATE OR REPLACE FUNCTION restore_box_and_update_indexes(_userId UUID, _boxId UUID, _shelfId UUID, _index INT)
RETURNS SETOF box AS $$
DECLARE
    restored_box box;
BEGIN
    -- Восстанавливаем коробку
    UPDATE box
    SET "isDeleted" = false, "deletedAt" = null, "shelfId" = _shelfId, "index" = _index
    WHERE id = _boxId AND "userId" = _userId
    RETURNING * INTO restored_box;

    -- Обновляем индексы коробок, которые находятся после восстанавливаемой коробки
    UPDATE box
    SET "index" = "index" + 1
    WHERE "userId" = _userId AND "shelfId" = _shelfId AND "index" >= _index AND id != _boxId;

    RETURN NEXT restored_box;
    RETURN;
END;
$$ LANGUAGE plpgsql;