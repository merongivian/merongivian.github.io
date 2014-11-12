---
layout: post
title: "Oracle Label Security (OLS)"
date: 2014-10-22 23:41:30 -0500
comments: false
categories: [udla, aci040]
---

### Modelos de control de Acceso
- Control de acceso Discrecional(DAC): es una forma en la cual
  podemos restringir el acceso a objetos basados en la identidad o
grupos a los que pertenecen
- Seguridad a nivel de registro:
  * Se pueden aplicar sofisticadas reglas para el control de acceso
  * Complementa a DAC
  * Es provisto por VPD o por OLS

### Oracle Label Security (OLS)

  {% img center /images/posts/ols-principal.png %}

<!--more-->

  - Categoriza e intercede fácilmente en el acceso a datos según su
    clasificación.
  - Integrada con Oracle Identity Management, permitiendo la gestión
    centralizada de definiciones de políticas

### Componentes data label

  {% img center /images/posts/ols-componentes.png %}

### Pasos Para la implementación de OLS

1.- Crear la politica facility
```sql
  BEGIN
    SA_SYSDBA.CREATE_POLICY('FACILITY','FACLAB',
    'READ_CONTROL,CHECK_CONTROL,LABEL_DEFAULT,HIDE');
  END;
```
2.- Crear los niveles para la politica
```sql
  BEGIN
    SA_COMPONENTS.CREATE_LEVEL('FACILITY',1000,'P','PUBLIC');
    SA_COMPONENTS.CREATE_LEVEL('FACILITY',2000,'S','SENSITIVE');
    SA_COMPONENTS.CREATE_LEVEL('FACILITY',3000,'HS','HIGHLY_SENSITIVE');
  END;
```
3.- Crear los grupos para la politica
```sql
  BEGIN
    SA_COMPONENTS.CREATE_GROUP('FACILITY',1000,'Global','Global');
    SA_COMPONENTS.CREATE_GROUP('FACILITY',101,'US','United States','GLOBAL');
    SA_COMPONENTS.CREATE_GROUP('FACILITY',102,'EU','Europe','GLOBAL');
    SA_COMPONENTS.CREATE_GROUP('FACILITY',103,'Asia','Asia','GLOBAL');
  END;
```
4.- Crear las etiquetas, juntando los niveles y grupos
```sql
  BEGIN
    SA_LABEL_ADMIN.CREATE_LABEL('FACILITY',1000,'P');
    SA_LABEL_ADMIN.CREATE_LABEL('FACILITY',2101,'S::US');.
    SA_LABEL_ADMIN.CREATE_LABEL('FACILITY',3101,'HS::US');
    SA_LABEL_ADMIN.CREATE_LABEL('FACILITY',3103,'HS::ASIA');
  END;
```
5.- Crear etiquetas para usuarios
```sql
  BEGIN
    SA_USER_ADMIN.SET_USER_LABELS('PRIVACY','MYCO_MGR','C');
    SA_USER_ADMIN.SET_USER_LABELS('FACILITY','MYCO_EMP','P');
    SA_USER_ADMIN.SET_USER_LABELS('FACILITY','MYCO_MGR','S::US,EU,ASIA');
    SA_USER_ADMIN.SET_USER_LABELS('FACILITY','MYCO_PLANNING','HS::GLOBAL');.
  END;
```
6.- Actualizar la tabla locations con las nuevas etiquetas
```sql
  BEGIN
    UPDATE LOCATIONS
      SET FACLAB=CHAR_TO_LABEL('FACILITY','S::ASIA')
      WHERE UPPER(CITY) IN ('BEIJING','TOKYO','SINGAPORE');
    UPDATE LOCATIONS
      SET FACLAB=CHAR_TO_LABEL('FACILITY','HS::US').
      WHERE UPPER(CITY) IN ('SOUTH SAN FRANCISCO');
    UPDATE LOCATIONS
      SET FACLAB=CHAR_TO_LABEL('FACILITY','P')
      WHERE FACLAB IS NULL;
    COMMIT;
  END;
```

#### Video

<iframe class="youtube-player" type="text/html" width="640" height="385"
src="https://www.youtube.com/embed/bTAn45ejjL0" allowfullscreen
frameborder="0">
