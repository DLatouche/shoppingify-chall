DROP PROCEDURE IF EXISTS deleteUser;
DELIMITER |
CREATE PROCEDURE deleteUser(IN userId INT)
BEGIN
	SET SQL_SAFE_UPDATES = 0;
    DELETE FROM list_item WHERE item_id IN (SELECT id FROM item WHERE user_id = userId);
    DELETE FROM item WHERE user_id = userId;
    DELETE FROM category WHERE user_id = userId;
	DELETE FROM list WHERE user_id = userId;
	DELETE FROM user WHERE id = userId;
END |
DELIMITER ; 

DROP PROCEDURE IF EXISTS clearUser;
DELIMITER |
CREATE PROCEDURE clearUser()
BEGIN
	DECLARE userId INT;
    DECLARE cursUser CURSOR
		FOR SELECT id FROM user 
        WHERE CHAR_LENGTH(token) > 9 AND DATEDIFF(current_date(), login_at) > 14 ;
	OPEN cursUser;
    
    FETCH cursUser INTO userId;
		CALL deleteUser(userId);
    CLOSE cursUser;
END |
DELIMITER ; 
CALL clearUser();

