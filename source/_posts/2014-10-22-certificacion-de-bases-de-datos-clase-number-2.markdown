---
layout: post
title: "Oracle VPD (Virtual Private Database)"
date: 2014-10-22 21:01:42 -0500
comments: false
categories: [udla, aci040]
---

### Contexto de Aplicación
- Contenedor en memoria con atributos de solo lectura, llamado namespace
- Namespace posee atributos nombrados
- Namespace son independientes
- Atributos son poblados a traves de un paquete pl/sql

### Tipos de contextos
- **Local:** Seteado en un paquete pl/sql , se guarda en PGA(se usa para
  cada sesion)
- **Global:** Seteado en SGA, se habilita para todas las sesiones
  * hrapp: namespace
  * hr_context: package
```sql
create context hrapp using hr_context
```
<!--more-->

### Control de acceso granular(FGAC)
- Limita acceso a filas y columnas en bd
- Tipos de privilegios: objetos y sistemas
- Limita filas con predicados, las columnas se bloquean totalmente
- Se asocia a tabla o vista
- La funcion se llama con fgca antes de mostrar una consulta (genera un
  predicado where a la consulta original)

#### Beneficios
- Seguridad
- Simple (solo anade un predicado a la sentencia sql)

### Bases de datos virtuales (VPD)

{% img /images/posts/vpd.png %}

- Application context + FGAC
- Una base de datos especifica mostrada para un usuario, pero en
  realidad es la misma base
- Recuperar context:
  * CUST_ID: campo
  * OEAPP: contexto
```sql
  CUSTOMER_ID=SYS_CONTEXT('OEAPP','CUST_ID')
```

#### Implementación de una politica VPD
- Desarrollar estrategia
- Analizar datos a proteger
- Determinar politicas VPD para cubrir requerimientos anteriores
- Revisar y documentar las politicas y la solucion

### Pasos para la implementación de VPD con triggers
1.- Declarar el procedure set_emp_info dentro del paquete current_emp
```sql
  CREATE OR REPLACE PACKAGE CURRENT_EMP IS
  PROCEDURE SET_EMP_INFO;
  END;
```
2.- Definir el procedure para la tabla employees
```sql
CREATE OR REPLACE PACKAGE BODY current_emp IS PROCEDURE set_emp_info IS
 v_employee_id hr.employees.employee_id%TYPE;
 v_first_name  hr.employees.first_name%TYPE;
 v_last_name hr.employees.last_name%TYPE;
 BEGIN
   SELECT employee_id,
          first_name,
          last_name
   INTO v_employee_id,
        v_first_name,
        v_last_name
   FROM hr.employees
   WHERE email=SYS_CONTEXT('USERENV','SESSION_USER');
         DBMS_SESSION.SET_CONTEXT('emp_user','id',v_employee_id);
         DBMS_SESSION.SET_CONTEXT('emp_user','name',v_first_name ||' '|| v_last_name);
         DBMS_SESSION.SET_CONTEXT('emp_user','email',SYS_CONTEXT('USERENV','SESSION_USER'));
   EXCEPTION
   WHEN no_data_found THEN NULL;
 END;
END;
```
3.- Crear el trigger con el procedure creado, este se ejecutara cada que
que se inicia sesion
```sql
CREATE OR REPLACE TRIGGER EMP_LOGON
AFTER LOGON ON DATABASE
BEGIN
  CURRENT_EMP.SET_EMP_INFO;
END;
/
```
#### Video

<iframe class="youtube-player" type="text/html" width="640" height="385"
src="https://www.youtube.com/embed/CFNbfWktEKc" allowfullscreen
frameborder="0">
</iframe>

### Pasos para la implementación de VPD con politicas

1.- Declarar la politica en el paquete hr_policy_package
```sql
create or replace package hr_policy_pkg is
function limit_emp_emp(
object_schema in varchar2,
object_name varchar2)
return varchar2;
end;
```
2.- Crear la politica con la funcion limit_emp_emp
```sql
create or replace package body hr_policy_pkg is
  function limit_emp_emp( object_schema in varchar2, object_name varchar2)
  return varchar2
  is
  v_emp_id number;
  BEGIN
   return 'employee_id=sys_context("emp_user","id")';
  end;
end;
```
3.- Anadir la politica a la tabla employees
```sql
exec dbms_rls.add_policy
('HR','EMPLOYEES','HR_EMP_POL','SEC','HR_POLICY_PKG.LIMIT_EMP_EMP','SELECT');
```

#### Video

<iframe class="youtube-player" type="text/html" width="640" height="385"
src="https://www.youtube.com/embed/mmws2ZdHkuA" allowfullscreen
frameborder="0">
</iframe>
