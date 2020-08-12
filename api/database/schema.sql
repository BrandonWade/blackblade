CREATE DATABASE IF NOT EXISTS blackblade;
USE blackblade;

DROP TABLE IF EXISTS cards;
CREATE TABLE cards (
    id bigint unsigned NOT NULL AUTO_INCREMENT,
    scryfall_id char(36) NOT NULL DEFAULT '',
    oracle_id char(36) NOT NULL DEFAULT '',
    name varchar(256) NOT NULL DEFAULT '',
    lang enum('en', 'es', 'fr', 'de', 'it', 'pt', 'ja', 'ko', 'ru', 'zhs', 'zht', 'he', 'la', 'grc', 'ar', 'sa', 'px') DEFAULT NULL,
    released_at date DEFAULT NULL,
    uri text NOT NULL,
    scryfall_uri text NOT NULL,
    layout enum('normal', 'split', 'flip', 'transform', 'meld', 'leveler', 'saga', 'adventure', 'planar', 'scheme', 'vanguard', 'token', 'double_faced_token', 'emblem', 'augment', 'host', 'art_series', 'double_sided') DEFAULT NULL,
    has_highres_image tinyint(1) NOT NULL DEFAULT 0,
    mana_cost varchar(128) NOT NULL DEFAULT '',
    cmc decimal(10, 1) NOT NULL DEFAULT 0.0,
    type_line varchar(128) NOT NULL DEFAULT '',
    oracle_text text,
    power varchar(8) DEFAULT NULL,
    toughness varchar(8) DEFAULT NULL,
    loyalty varchar(8) DEFAULT NULL,
    is_reserved tinyint(1) NOT NULL DEFAULT 0,
    has_foil tinyint(1) NOT NULL DEFAULT 0,
    has_nonfoil tinyint(1) NOT NULL DEFAULT 0,
    is_oversized tinyint(1) NOT NULL DEFAULT 0,
    is_promo tinyint(1) NOT NULL DEFAULT 0,
    is_reprint tinyint(1) NOT NULL DEFAULT 0,
    is_variation tinyint(1) NOT NULL DEFAULT 0,
    `set` varchar(8) NOT NULL DEFAULT '',
    set_name varchar(64) NOT NULL DEFAULT '',
    set_type varchar(32) NOT NULL DEFAULT '',
    set_uri text NOT NULL,
    set_search_uri text NOT NULL,
    scryfall_set_uri text NOT NULL,
    rulings_uri text NOT NULL,
    prints_search_uri text NOT NULL,
    collector_number varchar(16) NOT NULL DEFAULT '',
    is_digital tinyint(1) NOT NULL DEFAULT 0,
    rarity enum('common', 'uncommon', 'rare', 'mythic') DEFAULT NULL,
    card_back_id char(36) NOT NULL DEFAULT '',
    artist varchar(64) DEFAULT NULL,
    illustration_id char(36) DEFAULT NULL,
    border_color enum('black', 'borderless', 'gold', 'silver', 'white') DEFAULT NULL,
    frame enum('1993', '1997', '2003', '2015', 'future') DEFAULT NULL,
    is_full_art tinyint(1) NOT NULL DEFAULT 0,
    is_textless tinyint(1) NOT NULL DEFAULT 0,
    is_booster tinyint(1) NOT NULL DEFAULT 0,
    story_spotlight tinyint(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    UNIQUE KEY U_scryfall_id (scryfall_id)
) CHARSET=utf8mb4;

DROP TABLE IF EXISTS card_multiverse_ids;
CREATE TABLE card_multiverse_ids (
    id bigint unsigned NOT NULL AUTO_INCREMENT,
    card_id bigint unsigned NOT NULL DEFAULT 0,
    multiverse_id bigint NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    FOREIGN KEY (card_id) REFERENCES cards(id),
    UNIQUE KEY U_multiverse_id (multiverse_id)
) CHARSET=utf8mb4;

DROP TABLE IF EXISTS card_image_uris;
CREATE TABLE card_image_uris (
    id bigint unsigned NOT NULL AUTO_INCREMENT,
    card_id bigint unsigned NOT NULL DEFAULT 0,
    image_type enum('png', 'border_crop', 'art_crop', 'large', 'normal', 'small') DEFAULT NULL,
    uri text NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (card_id) REFERENCES cards(id)
) CHARSET=utf8mb4;

DROP TABLE IF EXISTS card_colors;
CREATE TABLE card_colors (
    id bigint unsigned NOT NULL AUTO_INCREMENT,
    card_id bigint unsigned NOT NULL DEFAULT 0,
    color enum('B', 'G', 'R', 'U', 'W') DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (card_id) REFERENCES cards(id)
) CHARSET=utf8mb4;

DROP TABLE IF EXISTS card_color_identities;
CREATE TABLE card_color_identities (
    id bigint unsigned NOT NULL AUTO_INCREMENT,
    card_id bigint unsigned NOT NULL DEFAULT 0,
    color enum('B', 'G', 'R', 'U', 'W') DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (card_id) REFERENCES cards(id)
) CHARSET=utf8mb4;

DROP TABLE IF EXISTS card_legalities;
CREATE TABLE card_legalities (
    id bigint unsigned NOT NULL AUTO_INCREMENT,
    card_id bigint unsigned NOT NULL DEFAULT 0,
    format enum('standard', 'future', 'historic', 'pioneer', 'modern', 'legacy', 'pauper', 'vintage', 'penny', 'commander', 'brawl', 'duel', 'oldschool') DEFAULT NULL,
    legality enum('legal', 'not_legal', 'restricted', 'banned') DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (card_id) REFERENCES cards(id)
) CHARSET=utf8mb4;

DROP TABLE IF EXISTS card_games;
CREATE TABLE card_games (
    id bigint unsigned NOT NULL AUTO_INCREMENT,
    card_id bigint unsigned NOT NULL DEFAULT 0,
    game enum('paper', 'arena', 'mtgo') DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (card_id) REFERENCES cards(id)
) CHARSET=utf8mb4;

DROP TABLE IF EXISTS card_artist_ids;
CREATE TABLE card_artist_ids (
    id bigint unsigned NOT NULL AUTO_INCREMENT,
    card_id bigint unsigned NOT NULL DEFAULT 0,
    artist_id char(36) NOT NULL DEFAULT '',
    PRIMARY KEY (id),
    FOREIGN KEY (card_id) REFERENCES cards(id)
) CHARSET=utf8mb4;

DROP TABLE IF EXISTS card_frame_effects;
CREATE TABLE card_frame_effects (
    id bigint unsigned NOT NULL AUTO_INCREMENT,
    card_id bigint unsigned NOT NULL DEFAULT 0,
    frame_effect varchar(32) NOT NULL DEFAULT '',
    PRIMARY KEY (id),
    FOREIGN KEY (card_id) REFERENCES cards(id)
) CHARSET=utf8mb4;

DROP TABLE IF EXISTS card_promo_types;
CREATE TABLE card_promo_types (
    id bigint unsigned NOT NULL AUTO_INCREMENT,
    card_id bigint unsigned NOT NULL DEFAULT 0,
    promo_type varchar(32) NOT NULL DEFAULT '',
    PRIMARY KEY (id),
    FOREIGN KEY (card_id) REFERENCES cards(id)
) CHARSET=utf8mb4;

DROP TABLE IF EXISTS card_previews;
CREATE TABLE card_previews (
    id bigint unsigned NOT NULL AUTO_INCREMENT,
    card_id bigint unsigned NOT NULL DEFAULT 0,
    source varchar(32) NOT NULL DEFAULT '',
    source_uri text NOT NULL,
    previewed_at date DEFAULT NULL,
    PRIMARY KEY (id),
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
    FOREIGN KEY (card_id) REFERENCES cards(id)
) CHARSET=utf8mb4;

DROP TABLE IF EXISTS card_related_uris;
CREATE TABLE card_related_uris (
    id bigint unsigned NOT NULL AUTO_INCREMENT,
    card_id bigint unsigned NOT NULL DEFAULT 0,
    tcgplayer_decks text NOT NULL,
    edhrec text NOT NULL,
    mtgtop8 text NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (card_id) REFERENCES cards(id)
) CHARSET=utf8mb4;

DROP TABLE IF EXISTS card_purchase_uris;
CREATE TABLE card_purchase_uris (
    id bigint unsigned NOT NULL AUTO_INCREMENT,
    card_id bigint unsigned NOT NULL DEFAULT 0,
    tcgplayer text NOT NULL,
    cardmarket text NOT NULL,
    cardhoarder text NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (card_id) REFERENCES cards(id)
) CHARSET=utf8mb4;
