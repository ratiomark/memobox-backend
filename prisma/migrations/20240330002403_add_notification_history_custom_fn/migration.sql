CREATE OR REPLACE FUNCTION update_or_insert_notification_history(notification_updates jsonb[])
RETURNS void AS $$
DECLARE
    notification_update jsonb;
BEGIN
    FOREACH notification_update IN ARRAY notification_updates
    LOOP
        INSERT INTO notification_history ("userId", "notificationTime")
        VALUES (
            (notification_update ->> 'userId')::uuid,
            (notification_update ->> 'notificationTime')::timestamp
        )
        ON CONFLICT ("userId") DO UPDATE
        SET "notificationTime" = (notification_update ->> 'notificationTime')::timestamp;
    END LOOP;
END;
$$ LANGUAGE plpgsql;