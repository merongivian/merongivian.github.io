---
layout: post
title: "Certificación de Bases de Datos, Clase #2"
date: 2014-10-22 21:01:42 -0500
comments: false
categories: [udla, aci040]
---

### Contexto de Aplicacion
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

#### Implementacion de una politica VPD
- Desarrollar estrategia
- Analizar datos a proteger
- Determinar politicas VPD para cubrir requerimientos anteriores
- Revisar y documentar las politicas y la solucion

### Video Laboratorio #1

<iframe class="youtube-player" type="text/html" width="640" height="385"
src="https://www.youtube.com/embed/CFNbfWktEKc" allowfullscreen
frameborder="0">
</iframe>
