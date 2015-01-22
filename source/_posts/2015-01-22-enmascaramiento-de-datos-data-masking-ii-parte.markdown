---
layout: post
title: "Enmascaramiento de Datos (Data masking) II Parte"
date: 2015-01-22 07:32:29 -0500
comments: false
categories: [udla, aci040]
---
{% img center http://exatek.com/wp-content/uploads/2013/01/DataMasking.png 300 300 %}

### Ventajas y Beneficios de Oracle Data Masking

- A Diferencia de los procesos de enmascaramiento que son tradicionalmente lentos al realizar actualizaciones de tabla, Data Masking optimiza la base de datos para desactivar el ingreso a la base de datos y lograr una ejecución en paralelo.
- Amplia Formato Masking Biblioteca y plantillas de aplicación para  la versión de OracleE-Business Suite y Oracle Fusion Applications
- Data Masking Pack proporciona la opción de guardar el proceso de enmascaramiento como un script de manera que se pueda personalizar más adelante
- Transformaciones de enmascaramiento integrales
<!--more-->
- Realiza operaciones en bloque para reemplazar con rapidez la tabla que contiene datos sensibles por una tabla idéntica que contiene datos enmascarados
- Subdivisión de Multi-Factor
- Rápido, Seguro y heterogéneo

{% img center https://securosis.com/assets/library/main/Mask_ETL.png 450 450 %}

### Desventajas del uso de scripts en Data Masking

- **Reutilización**

  Un script que se ha usado específicamente para una base de datos no puede ser reutilizado en otra ya que no esta configurado para funcionar en otros ambientes, estos scripts tendrían que ser re-escrito desde cero si se aplica a otra base de datos. No hay capacidades comunes en una secuencia de comandos que pueden ser fácilmente aprovechados a través de otras bases de datos.

- **Transparencia**

  Ya que tienden a ser monolíticos, los procedimientos realizados en el mismo suelen no ser claros para otras personas. Los auditores encontrarían extremadamente difícil ofrecer cualquier recomendación sobre si el proceso de enmascaramiento construido en un script es seguro y ofrece la empresa el grado adecuado de protección

- **Capacidad de Mantenimiento**

  Cuando estas aplicaciones empresariales se actualizan, nuevas tablas y columnas que contienen datos sensibles pueden ser añadidos como una parte del proceso de actualización. Con un enfoque basado en el script, todo el script tiene que ser revisado y actualizado para dar cabida a nuevas tablas y columnas añadidas como parte de un parche de aplicación o una actualización

### Implementación de Data Masking

{% img center https://securosis.com/assets/library/main/Mask_Dynamic.png 400 400 %}

Este proceso consta de 4 pasos:

- **Find :**

  Esta fase consiste en la identificación y catalogación de datos confidenciales o regulados a través de toda la empresa. Por lo general realizada por los analistas de negocios o de seguridad, el objetivo de este es llegar a la lista completa de los elementos de datos sensibles específicos para la organización y descubrir los asociados como tablas, columnas y relaciones a través de las bases de dato

- **Assess :**

  En esta fase, los desarrolladores o administradores de bases de datos en conjunto con las empresas o analistas de seguridad identifican los algoritmos de enmascaramiento que representan las técnicas óptimas para reemplazar el datos originales sensibles. Los desarrolladores pueden aprovechar la biblioteca enmascaramiento existente o ampliarlo con sus propias rutinas de enmascaramiento.

- **Secure :**

  El administrador de seguridad ejecuta el proceso de enmascaramiento para asegurar los datos sensibles durante los ensayos de enmascaramiento

- **Test (FAST) :**

  Finalmente, los usuarios de producción ejecutan procesos de aplicación para poner a prueba si los datos enmascarados resultantes pueden ser entregados a los demás usuarios que no sean de producción. Si el enmascarar rutinas necesitan ser modificados de nuevo, el DBA restaura la base de datos al pre- estado enmascarado, corrige los algoritmos de enmascaramiento y volverá a ejecutar el proceso de enmascaramiento

{% img center http://1.bp.blogspot.com/-m0ygDaikl8A/VLan3VoXLCI/AAAAAAAAAfE/8JcbvS6HByc/s1600/data_masking_workflow.gif 600 600 %}

### Técnicas de Data Masking

**Enmascaramiento Compuesto**

La principal característica del enmascaramiento compuesto es que se asegura de que un conjunto de columnas relacionadas sean enmascaradas como un grupo, para asegurar que los datos ocultos a través de las columnas relacionadas conserven la misma relación

**Enmascaramiento Determinista**

La técnica de enmascaramiento Determinista garantiza valores enmascarados repetibles. Las Compañías u Organizaciones pueden utilizar esta técnica para garantizar que determinados valores

**Enmascaramiento Reversible**

Cuando las Compañías u Organizaciones tienen que enviar sus datos a una tercera parte para el análisis, informes o cualquier otro proceso de negocio, esta técnica transforma los datos originales en una representación enmascarada de sí mismo, utilizando una función de enmascaramiento reversible basado en claves seguras

### Como crear un formato de Data-Mask definido por el usuario

~~~~
CREATE OR REPLACE FUNCTION hr.email_mask
  (orig_value VARCHAR2) RETURN VARCHAR2
IS
  emailadd varchar2(100);
BEGIN
  SELECT first_name || '.' || employee_id || '.' ||
         last_name || '@not_realco.com' INTO emailadd
  FROM hr.employees
  WHERE email = orig_value;
  RETURN emailadd;
END;
~~~~
{:.language-sql}

### Video Práctica

<iframe class="youtube-player" type="text/html" width="640" height="385"
src="https://www.youtube.com/embed/dcldnaukpcI" allowfullscreen
frameborder="0">
</iframe>

