CREATE OR REPLACE FUNCTION get_box_details_by_index(_index INT, _prefix TEXT DEFAULT 'remove_box_and_update_indexes')
RETURNS TEXT AS $$
DECLARE
    result TEXT;
BEGIN
    SELECT INTO result 
        _prefix || '(''' || "userId"::TEXT || ''', ''' || id::TEXT || ''', ''' || "shelfId"::TEXT || ''', ' || "index"::TEXT || ');'
    FROM box
    WHERE "index" = _index
    LIMIT 1;

    RETURN result;
END;
$$ LANGUAGE plpgsql;