DROP DATABASE IF EXISTS clearbridge;
DROP DATABASE IF EXISTS clearbridge_test;
DROP USER IF EXISTS clearbridge;
DROP USER IF EXISTS clearbridge_test;

CREATE DATABASE clearbridge;
CREATE DATABASE clearbridge_test;

-- CREATE USER accounts@'%' IDENTIFIED WITH mysql_native_password BY 'secret';
CREATE USER clearbridge@'%' IDENTIFIED BY 'secret';
CREATE USER clearbridge_test@'%' IDENTIFIED BY 'secret';

GRANT ALL ON clearbridge.* TO clearbridge@'%';
GRANT ALL ON clearbridge_test.* TO clearbridge_test@'%';
FLUSH PRIVILEGES;