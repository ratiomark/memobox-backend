CREATE OR REPLACE FUNCTION get_boxes_by_shelf_id(_shelfId UUID)
RETURNS SETOF box AS '
BEGIN
    RETURN QUERY
    SELECT * FROM box
    WHERE "shelfId" = _shelfId 
    ORDER BY "index";
END;
' LANGUAGE plpgsql;