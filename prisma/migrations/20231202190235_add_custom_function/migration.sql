CREATE OR REPLACE FUNCTION update_cards_after_training(card_updates jsonb[])
RETURNS void AS $$
DECLARE
    card_update jsonb;
BEGIN
    FOREACH card_update IN ARRAY card_updates
    LOOP
        UPDATE "Card"
        SET
            "boxId" = (card_update ->> 'boxId')::uuid,
            "nextTraining" = (card_update ->> 'nextTraining')::timestamp
        WHERE "id" = (card_update ->> 'id')::uuid;
    END LOOP;
END;
$$ LANGUAGE plpgsql;