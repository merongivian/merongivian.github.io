---
layout: post
title: "Certificación de Bases de Datos, Clase #1"
date: 2014-10-22 18:39:32 -0500
comments: false
categories: [udla, aci040]
---

### Triada CIA

  {% img /images/posts/triada.png %}

- **Confidentiality:** Permiso por cada usuario
- **Integrity:** Información verídica, consistente y que no sea alterada
- **Availability:** Capacidad, disponibilidad de la base

<!--more-->

### Preocupaciones sobre la Seguridad de los Datos
- **Industrial Espionage:** Generalmente causado por empresas en busca de
  información confidencial
- **Identity Theft:** Suplantación de identidad
- **Insider Threats:** Causado por malos elementos internos con acceso a la
  base

### Organismos
- SOX
- PCI: Mastercard, Visa, HIPAA
- HIPAA
- Basel II
- EU Directives
- FDA
- GLBA

### Estandares de Seguridad
- CERT
- ISO 17700/27002

### Riesgos de Seguridad

#### Externos
- Usuario no autorizado
- Ataque ddos
- Acceso no autorizado
- Sql Injection

#### Internos
- Robos de información
- Corrupción del servicio o información
- Complejidad
- Omisiones

### Desarrollo Política de seguridad
- Formar equipo de seguridad
- Definir requerimientos de seguridad
- Desarrollar políticas, procedimientos y sistemas para cubrir los
  requerimientos de seguridad
- Auditar el cumplimiento

### Técnicas para reforzar seguridad
- Autenticación: Quien
- Autorización: Que puede hacer el usuario (permiso de ejecución,
  depuración, etc)
- Control de acceso: Como lo puede hacer, Solo puede ejecutar ciertos métodos (mas granular,
  especifico)

### Amenazas comunes

  {% img /images/posts/ataques.png %}

- Phishing: Capturar información con un elemento intermedio
- Credenciales por defecto (no se hace cambio de la clave)
- Backdoors
- Código de depuración
- Cross-scripting
- Sql-Injection

### Opciones de Seguridad Oracle 11g

#### Proactiva
- Database Vault
- Oracle Advanced Security
- Enmascaramiento de Datos
- Seguridad a nivel de filos
- Encriptación de respaldos
- Encriptación de columnas

#### Reactiva
- Pistas de Auditoria

### Escenarios de Aplicación

#### Autenticación
- Gestión de identidad centralizada
- Strong authentication

#### Control de Acceso
- Discretionary access control
- Virtual private database
- Oracle label security
- Oracle database vault

#### Monitoreo
- Auditoria
- Oracle Audit Vault
