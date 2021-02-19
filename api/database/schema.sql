CREATE DATABASE IF NOT EXISTS blackblade;
USE blackblade;

DROP TABLE IF EXISTS card_rulings;
CREATE TABLE card_rulings (
    id bigint unsigned NOT NULL AUTO_INCREMENT,
    oracle_id char(36) DEFAULT NULL,
    comment_hash char(32) DEFAULT NULL,
    source varchar(16) DEFAULT NULL,
    published_at date DEFAULT NULL,
    comment text DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY U_oracle_id_comment_hash (oracle_id, comment_hash)
) CHARSET=utf8mb4;

DROP TABLE IF EXISTS card_rulings_list;
CREATE TABLE card_rulings_list (
    id bigint unsigned NOT NULL AUTO_INCREMENT,
    oracle_id char(36) DEFAULT NULL,
    rulings_json json DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY U_oracle_id (oracle_id)
) CHARSET=utf8mb4;

DROP TABLE IF EXISTS card_sets_list;
CREATE TABLE card_sets_list (
    id bigint unsigned NOT NULL AUTO_INCREMENT,
    oracle_id char(36) DEFAULT NULL,
    sets_json json DEFAULT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY U_oracle_id (oracle_id)
) CHARSET=utf8mb4;

DROP TABLE IF EXISTS cards;
CREATE TABLE cards (
    id bigint unsigned NOT NULL AUTO_INCREMENT,
    scryfall_id char(36) NOT NULL DEFAULT '',
    oracle_id char(36) NOT NULL DEFAULT '',
    tcgplayer_id bigint unsigned DEFAULT NULL,
    card_back_id char(36) NOT NULL DEFAULT '',
    card_sets_list_id bigint unsigned DEFAULT NULL,
    card_rulings_list_id bigint unsigned DEFAULT NULL,
    cmc decimal(10, 2) NOT NULL DEFAULT 0,
    set_code varchar(8) NOT NULL DEFAULT '',
    set_name varchar(64) NOT NULL DEFAULT '',
    faces_json json DEFAULT NULL,
    rarity enum('common', 'uncommon', 'rare', 'mythic'),
    layout enum('normal', 'split', 'flip', 'transform', 'meld', 'leveler', 'saga', 'adventure', 'token', 'double_faced_token', 'emblem', 'augment', 'host', 'aftermath', 'modal_dfc'),
    border_color enum('black', 'borderless', 'gold', 'silver', 'white'),
    frame enum('1993', '1997', '2003', '2015', 'future'),
    released_at date DEFAULT NULL,
    has_foil tinyint(1) NOT NULL DEFAULT 0,
    has_nonfoil tinyint(1) NOT NULL DEFAULT 0,
    is_oversized tinyint(1) NOT NULL DEFAULT 0,
    is_reserved tinyint(1) NOT NULL DEFAULT 0,
    is_booster tinyint(1) NOT NULL DEFAULT 0,
    is_digital_only tinyint(1) NOT NULL DEFAULT 0,
    is_full_art tinyint(1) NOT NULL DEFAULT 0,
    is_textless tinyint(1) NOT NULL DEFAULT 0,
    is_reprint tinyint(1) NOT NULL DEFAULT 0,
    has_highres_image tinyint(1) NOT NULL DEFAULT 0,
    rulings_uri text NOT NULL,
    scryfall_uri text NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY U_scryfall_id (scryfall_id),
    KEY K_oracle_id (oracle_id),
    KEY K_tcgplayer_id (tcgplayer_id),
    KEY K_card_back_id (card_back_id),
    KEY K_card_sets_list_id (card_sets_list_id),
    KEY K_card_rulings_list_id (card_rulings_list_id)
) CHARSET=utf8mb4;

DROP TABLE IF EXISTS card_multiverse_ids;
CREATE TABLE card_multiverse_ids (
    id bigint unsigned NOT NULL AUTO_INCREMENT,
    card_id bigint unsigned NOT NULL DEFAULT 0,
    multiverse_id bigint NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    UNIQUE KEY U_multiverse_id (multiverse_id),
    UNIQUE KEY U_card_id_multiverse_id (card_id, multiverse_id),
    FOREIGN KEY (card_id) REFERENCES cards(id)
) CHARSET=utf8mb4;

DROP TABLE IF EXISTS card_frame_effects;
CREATE TABLE card_frame_effects (
    id bigint unsigned NOT NULL AUTO_INCREMENT,
    card_id bigint unsigned NOT NULL DEFAULT 0,
    frame_effect varchar(32) NOT NULL DEFAULT '',
    PRIMARY KEY (id),
    UNIQUE KEY U_card_id_frame_effect (card_id, frame_effect),
    FOREIGN KEY (card_id) REFERENCES cards(id)
) CHARSET=utf8mb4;

DROP TABLE IF EXISTS card_prices;
CREATE TABLE card_prices (
    id bigint unsigned NOT NULL AUTO_INCREMENT,
    card_id bigint unsigned NOT NULL DEFAULT 0,
    usd varchar(16) NOT NULL DEFAULT '',
    usd_foil varchar(16) NOT NULL DEFAULT '',
    eur varchar(16) NOT NULL DEFAULT '',
    tix varchar(16) NOT NULL DEFAULT '',
    PRIMARY KEY (id),
    UNIQUE KEY U_card_id (card_id),
    FOREIGN KEY (card_id) REFERENCES cards(id)
) CHARSET=utf8mb4;

DROP TABLE IF EXISTS card_faces;
CREATE TABLE card_faces (
    id bigint unsigned NOT NULL AUTO_INCREMENT,
    card_id bigint unsigned NOT NULL DEFAULT 0,
    face_index tinyint unsigned NOT NULL DEFAULT 0,
    is_white tinyint unsigned NOT NULL DEFAULT 0,
    is_blue tinyint unsigned NOT NULL DEFAULT 0,
    is_black tinyint unsigned NOT NULL DEFAULT 0,
    is_red tinyint unsigned NOT NULL DEFAULT 0,
    is_green tinyint unsigned NOT NULL DEFAULT 0,
    artist varchar(64) DEFAULT NULL,
    flavor_text varchar(512) DEFAULT NULL,
    illustration_id char(36) NOT NULL DEFAULT '',
    image_small varchar(256) DEFAULT NULL,
    image_normal varchar(256) DEFAULT NULL,
    image_large varchar(256) DEFAULT NULL,
    image_png varchar(256) DEFAULT NULL,
    image_art_crop varchar(256) DEFAULT NULL,
    image_border_crop varchar(256) DEFAULT NULL,
    mana_cost varchar(128) NOT NULL DEFAULT '',
    name varchar(256) NOT NULL DEFAULT '',
    oracle_text text,
    power varchar(8) DEFAULT NULL,
    toughness varchar(8) DEFAULT NULL,
    loyalty varchar(8) DEFAULT NULL,
    type_line varchar(128) NOT NULL DEFAULT '',
    derived_type enum('creature', 'instant', 'sorcery', 'artifact', 'enchantment', 'planeswalker', 'land') DEFAULT NULL,
    watermark varchar(32) NOT NULL DEFAULT '',
    PRIMARY KEY (id),
    UNIQUE KEY U_card_id_face_index (card_id, face_index),
    FOREIGN KEY (card_id) REFERENCES cards(id)
) CHARSET=utf8mb4;

DROP TABLE IF EXISTS decks;
CREATE TABLE decks (
    id bigint unsigned NOT NULL AUTO_INCREMENT,
    public_id char(16) NOT NULL DEFAULT '',
    account_id bigint unsigned NOT NULL DEFAULT 0,
    name varchar(64) NOT NULL DEFAULT '',
    PRIMARY KEY (id),
    UNIQUE KEY U_public_id (public_id)
) CHARSET=utf8mb4;

DROP TABLE IF EXISTS deck_cards;
CREATE TABLE deck_cards (
    id bigint unsigned NOT NULL AUTO_INCREMENT,
    deck_id bigint unsigned NOT NULL DEFAULT 0,
    card_id bigint unsigned NOT NULL DEFAULT 0,
    location enum('deck', 'maybeboard') NOT NULL DEFAULT 'deck',
    count int unsigned NOT NULL DEFAULT 0,
    selection_type enum('automatic', 'manual') NOT NULL DEFAULT 'automatic',
    PRIMARY KEY (id),
    UNIQUE KEY U_deck_id_card_id_location (deck_id, card_id, location),
    FOREIGN KEY (deck_id) REFERENCES decks(id),
    FOREIGN KEY (card_id) REFERENCES cards(id)
) CHARSET=utf8mb4;

DROP TABLE IF EXISTS sets;
CREATE TABLE sets (
    id bigint unsigned NOT NULL AUTO_INCREMENT,
    set_code varchar(8) NOT NULL DEFAULT '',
    set_name varchar(64) NOT NULL DEFAULT '',
    PRIMARY KEY (id),
    UNIQUE KEY U_set_code (set_code),
    UNIQUE KEY U_set_name (set_name)
) CHARSET=utf8mb4;

DROP TABLE IF EXISTS types;
CREATE TABLE types (
    id bigint unsigned NOT NULL AUTO_INCREMENT,
    type varchar(32) NOT NULL DEFAULT '',
    PRIMARY KEY (id),
    UNIQUE KEY U_type (type)
) CHARSET=utf8mb4;

DROP TABLE IF EXISTS accounts;
CREATE TABLE accounts (
  id int unsigned NOT NULL AUTO_INCREMENT,
  email_iv binary(16) NOT NULL DEFAULT '',
  email_auth_tag binary(16) NOT NULL DEFAULT '',
  email_enc varbinary(300) NOT NULL DEFAULT '',
  email_hash varbinary(256) NOT NULL DEFAULT '',
  password_hash varbinary(64) NOT NULL DEFAULT '',
  is_activated tinyint(1) NOT NULL DEFAULT 0,
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY U_email_hash (email_hash)
) CHARSET=utf8mb4;

DROP TABLE IF EXISTS account_activation_tokens;
CREATE TABLE account_activation_tokens (
  id int unsigned NOT NULL AUTO_INCREMENT,
  account_id int unsigned NOT NULL DEFAULT 0,
  activation_token char(64) NOT NULL DEFAULT '',
  is_used tinyint(1) NOT NULL DEFAULT 0,
  last_sent_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY U_activation_token (activation_token),
  FOREIGN KEY (account_id) REFERENCES accounts(id)
) CHARSET=utf8mb4;

DROP TABLE IF EXISTS account_password_reset_tokens;
CREATE TABLE account_password_reset_tokens (
  id int unsigned NOT NULL AUTO_INCREMENT,
  account_id int unsigned NOT NULL DEFAULT 0,
  reset_token char(64) NOT NULL DEFAULT '',
  status enum('pending', 'used', 'disabled') NOT NULL DEFAULT 'pending',
  expires_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY U_reset_token (reset_token),
  FOREIGN KEY (account_id) REFERENCES accounts(id)
) CHARSET=utf8mb4;