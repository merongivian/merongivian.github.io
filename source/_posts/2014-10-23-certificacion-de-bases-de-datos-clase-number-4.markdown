---
layout: post
title: "Oracle Audit Vault"
date: 2014-10-23 05:56:02 -0500
comments: false
categories: [udla, aci040]
---

### Oracle Audit Vault

{% img right /images/posts/audit-vault-principal.png %}

- Recopila y consolida los datos de auditorías de manera transparente, brindando valiosos conocimientos respecto de quién hizo qué a cuáles datos y cuándo lo hizo
- Con los informes de Audit Vault, las notificaciones de alertas, y la administración depolíticas de auditoría centralizada, los
riesgos de amenazas internas y el costo de cumplimiento son altamente
reducidos.
- Aprovecha la seguridad de la base de datos líder del sector de Oracle y
la tecnología de data warehousing para administrar, analizar, almacenar, y archivar grandes
volúmenes de datos de auditoría.

<!--more-->

### Caracteristicas

- Recopilación y Consolidación de Datos de Auditoria de manera
  transparente
- Informe Simplificado de cumplimiento

  {% img /images/posts/audit-vault-informe.png %}

- Detección Anticipada de Amenazas con Alertas

  {% img /images/posts/audit-vault-alerta.png %}

- Seguridad y Escalabilidad
- Reducción los costos de IT con las políticas de Oracle Audit Vault

### Pasos para la implementación de Audit Volt

1.- Subir base de datos oracle vault
2.- Creat usuario en base remota

    create user avagusr01 identified by oracle_4U
{:.language-sql}

3.- Ejecutar permisos con scriptk

    @/home/oracle/oracle/product/10.3.0/av_agent_1/av/scripts/streams/source/zarsspriv.sql
{:.language-sql}

4.- Setear Oracle Home

    export ORACLE_HOME=/home/oracle/oracle/product/10.3.0/agent
{:.language-sql}

5.- Arrancar el agent en el directorio $ORACLE_HOME/bin

    ./avctl start_agent
{:.language-sql}

6.- Cambiamos el sourcename

    ./avorcldb setup -srcname aci040_db
{:.language-sql}

7.- Creamos el collector en la base de datos audit volt

    avorcldb add_collector -srcname aci040_db -agentname agaci040lab -colltype DBAUD -collname colaci040lab
{:.language-sql}

<iframe class="youtube-player" type="text/html" width="640" height="385"
src="https://www.youtube.com/embed/4ZE8-ds4-2w" allowfullscreen
frameborder="0">
</iframe>

### Conclución

- Brinda una avanzada solución de auditoría que a ayuda
a simplificar los informes de cumplimiento, detectar las amenazas con
alertas anticipadas, reducir el costo de cumplimiento y garantizar los
datos de Auditoría
- Automatiza el proceso de análisis y consolidación, convirtiendo los
  datos de auditoría en un recurso de seguridad clave para ayudar a
superar los desafios de cumplimiento y seguridad del mismo
- Aprovecha las capacidades comprobadas de particionamiento y
  depósito de datos para alcanzar escalibilidad y almacenamiento
masivo
