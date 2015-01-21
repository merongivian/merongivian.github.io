---
layout: post
title: "Oracle Advanced Security (ASO)"
date: 2015-01-21 07:52:44 -0500
comments: false
categories: [udla, aci040]
---

{% img center http://www.sysage.com.tw/Guest/FCKUploadFile/ADS.JPG %}

### Introducción
La encriptación es un componente clave del principio defensa-en-profundidad y es importante para proteger los datos en tránsito y en reposo. Oracle primero introdujo las API para la encriptación de base de datos en Oracle8i. Actualmente, las API para encriptación de base de datos Oracle son utilizadas por muchos clientes para encriptar los datos de aplicaciones sensibles. Lograr la transparencia y utilizar una API de encriptación requiere la incorporación de llamadas de función dentro de la propia aplicación o el uso de triggers de base de datos previamente insertados.

<!--more-->

También se pueden necesitar visualizaciones de las aplicaciones para decodificar los datos antes de que lleguen a la aplicación. Asimismo, la administración de claves debe manejarse de manera programática. Oracle Advanced Security Transparent Data Encryption (TDE), primero introducido en Oracle Database 10g versión 2, es la solución más avanzada del sector para la encriptación. TDE ofrece administración clave y transparencia completa de encriptación de datos de aplicaciones sensibles. El proceso de encriptación de base de datos es activado mediante el uso de comandos DDL, eliminando por completo la necesidad de cambios en las aplicaciones, la administración programática de claves, los triggers de base de datos y las visualizaciones.

### Características

- Proporciona cifrado de datos transparente y redacción dentro de la base de datos Oracle.
- Ayuda a los requisitos reglamentarios de dirección, incluyendo PCI DSS y HIPAA HiTech.
- Sobrecarga de rendimiento mínimo y no hay cambios en las aplicaciones.
- Se integra con las tecnologías de Oracle, incluyendo Oracle Exadata, Oracle Advanced Compression, Oracle GoldenGate, etc.

### Encriptación de la aplicación

Cada usuario tiene una palabra secreta para desencriptar la información que le pertenece, en la base, el rato que se registra lo hace de manera encriptada

Oracle ofrece dos paquetes para esto:

{% img center https://wilsonaraujoudla.files.wordpress.com/2014/12/diapositiva1.gif 520 520 %}

### Transparent Data Encryption (TDE)

{% img center http://www.oracle.com/ocom/groups/public/@otn/documents/webcontent/1964796.png 500 100 %}

TDE encripta los datos antes de que se escriban en el disco y los decodifica antes de que vuelvan a la aplicación. El proceso de codificación y decodificación es realizado en el nivel SQL, de manera completamente transparente para las aplicaciones y los usuarios. Los backups subsiguientes de los archivos de base de datos en disco o cinta tendrán los datos de aplicaciones sensibles encriptados. En forma opcional, TDE puede utilizarse junto con Oracle RMAN para encriptar toda la base de datos Oracle durante el backup a disco.

- **Protección de datos confidenciales mediante cifrado TDE Column**

  Se puede utilizar para cifrar los datos específicos de las tablas de aplicación tales como números de tarjetas de crédito.

  Es útil cuando las tablas de bases de datos son grandes, sólo un pequeño número de columnas debe estar encriptada, y las columnas son conocidas.

- **Protección de aplicaciones enteras con el uso de tablas de cifrado TDE**

  Protege tablas de aplicaciones enteras mediante la encriptación los espacios de tabla subyacentes. Cifra de tablas de aplicación independientemente de la sensibilidad de los datos y con independencia de su tipo de datos.

  Es útil cuando la base de datos contiene una gran cantidad datos de sensibles a ser cifrados y las columnas residen en muchos lugares diferentes.

  El cifrado de tablas se integra con Oracle Recovery Manager (copia de seguridad y restauración), Oracle Data Pump (movimiento de datos), Oracle Active Data Guard (redundancia y conmutación por error), y Oracle Golden Gate (replicación). TDE también se integra con las características internas de la base de datos como la de rehacer para evitar posibles fugas de datos en los registros.

### Generación llaves de encriptacion

- Generación de llave

  ~~~~
  raw_key := dbms_crypto.randombytes (
               number_bytes => 24 );
  ~~~~
  {:.language-sql}

- Encriptación de datos

  ~~~~
  encrypted_raw := dbms_crypto.encrypt (
               src => raw_input,
               typ => DBMS_CRYPTO.DES3_CBC_PKCS5,
               KEY => raw_key );
  ~~~~
  {:.language-sql}

- Uso de Decrypt

  ~~~~
  decrypted_raw := dbms_crypto.Decrypt (
               encrypted_raw,
               dbms_crypto.DES3_CBC_PKCS5,
               raw_key );
  ~~~~
  {:.language-sql}

### Encriptación por columna y por tablespace

  - Columna

    ~~~~
    /* Crear columna encriptada */

    CREATE TABLE cust_payment_info
       (first_name VARCHAR(11),
        last_name VARCHAR(10),
        order_number NUMBER(13),
        credit_card_number VARCHAR2(20)
                ENCRYPT NO SALT);

    /* Retiro de la encriptación */

    ALTER TABLE cust_payment_info
    MODIFY credit_card_number DECRYPT

    /* Cambio en el algoritmo y en SALT */

    ALTER TABLE cust_payment_info
    MODIFY credit_card_number ENCRYPT
    USING 'AES256' SALT
    ~~~~
    {:.language-sql}

  - Tablespace

    {% img center https://docs.oracle.com/cd/E15586_01/network.1111/e10746/img/transdata_1.gif 500 500 %}

    ~~~~
    /* Crear tablespace encriptado */

    CREATE TABLESPACE encrypt_ts
    DATAFILE '$ORACLE_HOME/dbs/encrypt.dat' SIZE 100M
    ENCRYPTION USING '3DES168'
    DEFAULT STORAGE (ENCRYPT);
    ~~~~
    {:.language-sql}

### Pasos para encriptación con wallet

  {% img center http://sunkupuli.files.wordpress.com/2014/04/image-5.png?w=640 %}

- (1) Crear una wallet con Oracle Wallet Manager

  ~~~~
  ENCRYPTION_WALLET_LOCATION=
   (SOURCE=(METHOD=FILE) (METHOD_DATA=
   (DIRECTORY=/opt/oracle/product/11.2.0/dbhome_1)))
  ~~~~
  {:.language-sql}

- (2) Abrir el wallet

  ~~~~
  ALTER SYSTEM SET ENCRYPTION WALLET OPEN IDENTIFIED BY "password";
  ~~~~
  {:.language-sql}

- (3) Setear la llave maestra

  ~~~~
  ALTER SYSTEM SET ENCRYPTION WALLET OPEN IDENTIFIED BY "password";
  ~~~~
  {:.language-sql}

### Creación de wallet com mkstore

- Para creación del wallet

  ~~~~
  mkstore -wrl $HOME/admin/orcl/wallets -create
  ~~~~
  {:.language-sql}

- Para añadir credenciales al wallet

  ~~~~
  mkstore -wrl $HOME/admin/orcl/wallets
  -createCredential dev hr [hr]
  ~~~~
  {:.language-sql}

### Video

<iframe class="youtube-player" type="text/html" width="640" height="385"
src="https://www.youtube.com/embed/I2HTtoQSOok" allowfullscreen
frameborder="0">
</iframe>
