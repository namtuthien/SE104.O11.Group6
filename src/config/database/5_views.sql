USE DATABASE_SE104;

DROP VIEW IF EXISTS VIEW_AUTHUSER;

CREATE VIEW VIEW_AUTHUSER AS
SELECT
  au_user_first_name,
  au_user_last_name,
  au_user_email,
  au_user_avt_url,
  au_user_sex,
  au_user_birthday
FROM AUTHUSER;

SELECT * FROM VIEW_AUTHUSER;



DROP VIEW IF EXISTS VIEW_BANKCARD;

CREATE VIEW VIEW_BANKCARD AS
SELECT
  bank_name,
  bank_num,
  au_user_id,
  bank_id
FROM BANKCARD;

SELECT * FROM VIEW_BANKCARD;


DROP VIEW IF EXISTS VIEW_DEBITCARD;

CREATE VIEW VIEW_DEBITCARD AS
SELECT
  debit_name,
  debit_num,
  au_user_id,
  debit_id
FROM DEBITCARD;

SELECT * FROM VIEW_DEBITCARD;

DROP VIEW IF EXISTS VIEW_RATING;

CREATE VIEW VIEW_RATING AS
SELECT
  room_id,
  rating_datetime,
  rating_context,
  rating_point,
  au_user_id
FROM RATING;

SELECT * FROM VIEW_RATING
;

DROP VIEW IF EXISTS VIEW_NOTIFICATION;
CREATE VIEW VIEW_NOTIFICATION AS
SELECT
  noti_id,
  noti_type,
  noti_title,
  noti_subtitle,
  noti_datetime,
  noti_content,
  noti_dest_url
FROM NOTIFICATION
SELECT * FROM VIEW_NOTIFICATION
;