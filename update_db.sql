ALTER TABLE `landexpdb`.`house`
ADD INDEX `action_tpe_index` (`action_type` ASC),
ADD INDEX `money_index` (`money` ASC),
ADD INDEX `acreage_index` (`acreage` ASC),
ADD INDEX `direction_index` (`direction` ASC),
ADD INDEX `bath_room_index` (`bath_room` ASC),
ADD INDEX `bed_room_index` (`bed_room` ASC),
ADD INDEX `land_type_index` (`land_type` ASC),
ADD INDEX `create_at_index` (`create_at` ASC),
ADD INDEX `status_type_index` (`status_type` ASC),
ADD INDEX `sale_type_index` (`sale_type` ASC),
ADD INDEX `parking_index` (`parking` ASC);

ALTER TABLE `landexpdb`.`house`
CHANGE COLUMN `summary` `summary` VARCHAR(2000) NULL DEFAULT NULL ;
